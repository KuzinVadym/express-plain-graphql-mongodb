import pino from 'pino';
import https from 'https';

import entities from '../enyities';

type TUpsertRecordsResult = {
  insertedCount: number,
  matchedCount: number,
  modifiedCount: number,
  deletedCount: number,
  upsertedCount: number
}

const logger = pino();

async function getCsvData(url): Promise<string[]> {
  let results = [];

  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
        
      response.on('data', (chunk) => {
        const temp = chunk.toString();
        results = results.concat(...temp.split(/\r?\n/))
      });
      response.on('end', () => resolve(results));
      response.on('error', (error) => reject(error));
    });
  });
}

function collectResult(results) {
  return results.reduce((result, item) => {
    for (const key in result) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        result[key] = result[key] + item[key];
      }
    }

    return result
  }, {
    insertedCount: 0,
    matchedCount: 0,
    modifiedCount: 0,
    deletedCount: 0,
    upsertedCount: 0
  })
}

async function upsertProducers(producersChunks, ProducerModel): Promise<TUpsertRecordsResult> {
  const results = []

  for (const chunk of producersChunks) {

    const upsertResult = await ProducerModel.bulkWrite(
      chunk.map(item => ({name: item.producer, country: item.country, region: item.region})).map((item) => ({
        updateOne: {
          filter: {name: item.name, country: item.country, region: item.region},
          update: item,
          upsert: true
        },
      })),
      { ordered: false, new: true } // Allow some failures without stopping entire process
    );

    results.push(upsertResult)
  }

  return collectResult(results);
}

async function upsertProducts(producersChunks, ProductModel, ProducerModel): Promise<TUpsertRecordsResult> {
  console.log('upsertProducts');
  const results = []

  for (const chunk of producersChunks) {

    // find producers ids for each product
    for (const product of chunk) {
      const producer = await ProducerModel.findOne({name: product.producer})
      product.producerId = producer._id
    }

    const upsertResult = await ProductModel.bulkWrite(
      chunk.map(item => ({name: item['product name'], vintage: item.vintage, producerId: item.producerId}))
      .filter(item => item.name && item.vintage && item.producerId)
      .map((item) => ({
        updateOne: {
          filter: {name: item.name, vintage: item.vintage, producerId: item.producerId},
          update: item,
          upsert: true
        },
      })),
      { ordered: false, new: true } // Allow some failures without stopping entire process
    );

    results.push(upsertResult)
  }

  return collectResult(results);
}

function filterUniqueVintageProductNameProducer(data) {
  const seen = new Set();
  const filtered = [];

  for (const obj of data) {
    const key = `${obj.vintage}-${obj['product name']}-${obj.producer}`;

    if (!seen.has(key)) {
      seen.add(key);
      filtered.push(obj);
    }
  }

  return filtered;
}

function filterUniqueProducerCountryRegion(data) {
  const seen = new Set();
  const filtered = [];

  for (const obj of data) {
    const key = `${obj.producer}-${obj.country}-${obj.region}`;

    if (!seen.has(key)) {
      seen.add(key);
      filtered.push(obj);
    }
  }

  return filtered;
}

function splitArrayInChunks(arr, chunkSize = 100) {
  const chunks = [];
  let i = 0;
  while (i < arr.length) {
    chunks.push(arr.slice(i, i + chunkSize));
    i += chunkSize;
  }
  return chunks;
}


export async function upsertCsvProductsFromUrl(url: string): Promise<void> {
  try {
    const { ProductModel, ProducerModel } = entities;

    const csvRecords = await getCsvData('https://api.frw.co.uk/feeds/all_listings.csv');

    const headerKeys = csvRecords.splice(0,1)[0].toLowerCase().split(',');

    const objects = [];

    for (const record of csvRecords) {
      const object = {};
    
      const temp = record.split(',');
      for (let i = 0; i < temp.length; i++) {
        object[headerKeys[i]] = temp[i];
      }
          
      objects.push(object);
    }

    const groupedProducts = filterUniqueVintageProductNameProducer(objects);
    const groupedProducers = filterUniqueProducerCountryRegion(objects);

    const productsChunks = splitArrayInChunks(groupedProducts, 100);
    const producersChunks = splitArrayInChunks(groupedProducers, 100);

    const upsertProducersResult = await upsertProducers(producersChunks, ProducerModel);

    logger.info('UpsertProducersResult')
    logger.info(upsertProducersResult)

    const upsertProductResult = await upsertProducts(productsChunks, ProductModel, ProducerModel);

    logger.info('UpsertProductResult')
    logger.info(upsertProductResult)

  } catch (error) {
    throw new Error(error);
  }
}