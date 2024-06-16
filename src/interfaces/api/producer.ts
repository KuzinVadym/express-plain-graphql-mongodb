export type TProducer = {
    _id: String
    name: String
    country: String
    region: String
}

export type TCreateProducerInput = {
    name: String
    vintage: String
    producerId: String
  }
  
  
    export type TUpdateProducerInput = {
      _id: String
      name: String
      vintage: String
      producerId: String
      producer: TProducer
  }
  