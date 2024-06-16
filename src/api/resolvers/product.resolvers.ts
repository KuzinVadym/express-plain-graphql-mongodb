import { ObjectId, Types } from 'mongoose';
import { IProduct, IProductDocument } from '../../interfaces';
import { randomUUID } from "crypto";

type TProducer = {
    _id: String
    name: String
    country: String
    region: String
}

type TProduct = {
    _id: String
    name: String
    vintage: String
    producerId: String
    producer: TProducer
}

const getProducts = (): TProduct[] | undefined => {

    const productId = new Types.ObjectId()
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

export const productResolvers = {
    getProducts
  };