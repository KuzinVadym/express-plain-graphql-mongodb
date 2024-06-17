import { randomUUID } from 'crypto';
import { Model } from 'mongoose';

import { IProducerDocument, IProductDocument, TCreateProducerInput, TCreateProductsInput, TProducer, TProduct, TUpdateProducerInput, TUpdateProductInput } from '../../interfaces';


export class ProducerResolvers {
    constructor(private readonly producerModel: Model<IProducerDocument>){
    }

    public getProducers = async (): Promise<TProducer[]> => {
        return [{
          _id: randomUUID().toString(),
          name: 'producer',
          country: 'country',
          region: 'region'
        }];
      };
  
    public getProducer = async (args: { _id: string }): Promise<TProducer | null> => {
        return {
          _id: randomUUID().toString(),
          name: 'producer',
          country: 'country',
          region: 'region'
        };
      };
  
    public createProducer = async ({ input }: { input: TCreateProducerInput }): Promise<TProducer> => {
        return {
          _id: randomUUID().toString(),
          name: 'producer',
          country: 'country',
          region: 'region'
        };
      };
  
    public updateProducer = async (args: { input: TUpdateProducerInput }): Promise<TProducer> => {
        return {
          _id: randomUUID().toString(),
          name: 'producer',
          country: 'country',
          region: 'region'
        };
      };
  
    public deleteProducer = async (args: [input: string[]]): Promise<Boolean> => {
        return true;
      };
  }