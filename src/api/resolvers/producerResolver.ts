import { Model } from 'mongoose';

import { IProducerDocument, TCreateProducerInput, TProducer, TUpdateProducerInput } from '../../interfaces';

export class ProducerResolvers {
    constructor(private readonly producerModel: Model<IProducerDocument>){
    }

    public getProducer = async (queryParams: Partial<TProducer>): Promise<TProducer | null> => {
      try {
        
        const result = await this.producerModel.findOne(queryParams);
    
        if(!result) {
          return null;
        }
    
        return {
          _id: result._id.toString(),
          name: result.name,
          country: result.country,
          region: result.region
        };
      
      } catch (error) {
        throw new Error(error);
      }
    };
  
    public createProducer = async (input: TCreateProducerInput): Promise<TProducer> => {
      try {
        const result = await this.producerModel.create(input);
    
        return {
          _id: result._id.toString(),
          name: result.name,
          country: result.country,
          region: result.region
        };
      } catch (error) {
        throw new Error(error);
      }
    };
  
    public updateProducer = async (input: TUpdateProducerInput): Promise<TProducer> => {
      try {
        const {_id, ...rest} = input

        const result = await this.producerModel.findOneAndUpdate({ _id }, rest, { new: true });
        
        if(!result) {
          throw new Error(`Producer with id ${_id} not found`);
        }
        
        return {
          _id: result._id.toString(),
          name: result.name,
          country: result.country,
          region: result.region
        };
      } catch (error) {
        throw new Error(error);
      }
    };
  
    public deleteProducer = async (_id: string): Promise<Boolean> => {
      try {
        const result = await this.producerModel.findByIdAndDelete(_id);
      
        if(!result) {
          throw new Error(`Produces with id ${_id} not found`);
        }
        
        return true
      } catch (error) {
        throw new Error(error);
      }
    };
}