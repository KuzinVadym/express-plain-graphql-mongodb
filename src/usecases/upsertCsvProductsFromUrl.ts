import pino from 'pino';
import https from 'https';
import { pipeline, Transform, Duplex } from 'stream';
import { HeaderKeysRegistry } from './HeaderKeysRegistry';

type TUpsertRecordsResult = {
  insertedCount: number,
  matchedCount: number,
  modifiedCount: number,
  deletedCount: number,
  upsertedCount: number
}

const logger = pino();

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

async function upsertProducers(producers, ProducerModel): Promise<TUpsertRecordsResult> {
  const results = []

  const upsertResult = await ProducerModel.bulkWrite(
    producers.map(item => ({name: item.producer, country: item.country, region: item.region})).map((item) => ({
      updateOne: {
        filter: {name: item.name, country: item.country, region: item.region},
        update: item,
        upsert: true
      },
    })),
    { ordered: false, new: true } // Allow some failures without stopping entire process
  );

  results.push(upsertResult);
  logger.info('');
  logger.info('');
  logger.info(upsertResult);

  return collectResult(results);
}

async function upsertProducts(products, ProductModel, ProducerModel): Promise<TUpsertRecordsResult> {
  const results = []

  for (const product of products) {
    const producer = await ProducerModel.findOne({name: product.producer})
    product.producerId = producer._id
  }

  const upsertResult = await ProductModel.bulkWrite(
    products.map(item => ({name: item['product name'], vintage: item.vintage, producerId: item.producerId}))
    .map((item) => ({
      updateOne: {
        filter: {name: item.name, vintage: item.vintage, producerId: item.producerId},
        update: item,
        upsert: true
      },
    })),
    { ordered: false, new: true } // Allow some failures without stopping entire process
  );

  results.push(upsertResult);
  logger.info('');
  logger.info('');
  logger.info(upsertResult);

  return collectResult(results);
}

function filterUniqueVintageProductNameProducer(data) {
  const seen = new Set();
  const filtered = [];

  for (const obj of data) {
    if (obj.vintage && obj['product name'] && obj.producer) {
      const key = `${obj.vintage}-${obj['product name']}-${obj.producer}`;

      if (!seen.has(key)) {
        seen.add(key);
        filtered.push(obj);
      }
    }
  }

  return filtered;
}

function filterUniqueProducerCountryRegion(data: Record<string, string>[]) {
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

function upsertRecordsHandler(ProductModel, ProducerModel) {
  return async function(objects: Record<string, string>[]){

    const objectsChunks = splitArrayInChunks(objects, 100);

    for (const chunk of objectsChunks) {

      const groupedProducts = filterUniqueVintageProductNameProducer(chunk);
      const groupedProducers = filterUniqueProducerCountryRegion(chunk);

      await upsertProducers(groupedProducers, ProducerModel).then(upsertProducersResult => {
        logger.info('upsertProducersResult')
        logger.info(upsertProducersResult)
      }).catch(error => {
        logger.error(error)
      });
  
     await upsertProducts(groupedProducts, ProductModel, ProducerModel).then(upsertProductResult => {
        logger.info('UpsertProductResult')
        logger.info(upsertProductResult)
      }).catch(error => {
        logger.error(error)
      });
    }
  }
}

function csvRecordToObject(headerKeysRegistry, transformCallback) {
  return new Transform({
    transform(chunk, encoding, callback) {
      const temp = chunk.toString();
      const csvRecords = temp.split(/\r?\n/)

      if (!headerKeysRegistry.getKeys().length) {
        const headerKeys = csvRecords.splice(0,1)[0].toLowerCase().split(',');
        headerKeysRegistry.setKeys(headerKeys);
      }

      const objects = [];

      for (const record of csvRecords) {
        const object = {};
      
        const temp = record.split(',');
        for (let i = 0; i < temp.length; i++) {
          object[headerKeysRegistry.getKeys()[i]] = temp[i];
        }
            
        objects.push(object);
      }

      transformCallback(objects).catch(error => {
        logger.error('Error during transformCallback')
        logger.error(error)
      });
      
      callback(null);
    },
  });
}

export function upsertCsvProductsFromUrlUseCase(entities): Function {
  return async function(url: string): Promise<void> {
    try {
      const { ProductModel, ProducerModel } = entities;
  
      const transformCallback = upsertRecordsHandler(ProductModel, ProducerModel);
      const transformData = csvRecordToObject(HeaderKeysRegistry.instance, transformCallback);
      
      https.get(url, (response) => {
        
        response.pipe(transformData).on('error', (error) => {
          logger.error('Error during UpsertCsvProductsFromUrlUseCase ')
          logger.error(error)
        });
        response.on('end', () => {
          logger.info('CSV File was readed sucessfully')
        });
      });

    } catch (error) {
      throw new Error(error);
    }
  }
}