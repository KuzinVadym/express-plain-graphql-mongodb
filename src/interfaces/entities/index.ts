import { Document, Types } from 'mongoose'

export type IProducer = {
    name: String
    country: String
    region: String
}

export interface IProducerDocument extends IProducer, Document {}

export type IProduct = {
    vintage: String
    name: String
    producerId: Types.ObjectId
    producer: IProducer
}

export interface IProductDocument extends IProduct, Document {}