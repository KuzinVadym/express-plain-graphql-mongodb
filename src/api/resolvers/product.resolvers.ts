import { TCreateProductsInput, TProduct, TUpdateProductInput } from '../../interfaces';
import { randomUUID } from "crypto";

const getProducts = (): TProduct[] | undefined => {

    return [{
        _id: randomUUID().toString(),
        vintage: 'vintage',
        name: 'name',
        producerId: randomUUID().toString() ,
        producer: {
            _id: randomUUID().toString(),
            name: 'producer',
            country: 'country',
            region: 'region'
        }
    }];
  };

const getProduct = (args: { id: string }): TProduct | undefined => {

    return {
        _id: randomUUID().toString(),
        vintage: 'vintage',
        name: 'name',
        producerId: randomUUID().toString() ,
        producer: {
            _id: randomUUID().toString(),
            name: 'producer',
            country: 'country',
            region: 'region'
        }
    };
  };

  const createProducts = ({ input }: { input: TCreateProductsInput }): TProduct[] => {
    // create pet object and save
    return [{
        _id: randomUUID().toString(),
        vintage: 'vintage',
        name: 'name',
        producerId: randomUUID().toString() ,
        producer: {
            _id: randomUUID().toString(),
            name: 'producer',
            country: 'country',
            region: 'region'
        }
    }];
  };

  const updateProduct = (args: { input: TUpdateProductInput }): TProduct => {
    // create pet object and save
    return {
        _id: randomUUID().toString(),
        vintage: 'vintage',
        name: 'name',
        producerId: randomUUID().toString() ,
        producer: {
            _id: randomUUID().toString(),
            name: 'producer',
            country: 'country',
            region: 'region'
        }
    };
  };

  const deleteProducts = (args: [input: string[]]): Boolean => {
    // create pet object and save
    return true;
  };

  

export const productResolvers = {
    getProducts,
    getProduct,
    createProducts,
    updateProduct,
    deleteProducts
  };