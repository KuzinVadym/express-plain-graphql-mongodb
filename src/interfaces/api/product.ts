import { TProducer } from './producer'

export type TProduct = {
    _id: String
    name: String
    vintage: String
    producerId: String
}

export type TCreateProductsInput = {
  name: String
  vintage: String
  producerId: String
}


  export type TUpdateProductInput = {
    _id: String
    name: String
    vintage: String
    producerId: String
}


