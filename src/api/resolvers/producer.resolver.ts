import { TCreateProducerInput, TProducer, TUpdateProducerInput } from '../../interfaces';
import { randomUUID } from "crypto";

  const createProducer = ({ input }: { input: TCreateProducerInput }): TProducer => {
    // create pet object and save
    return {
      _id: randomUUID().toString(),
      name: 'producer',
      country: 'country',
      region: 'region'
    };
  };

  const updateProducer = (args: { input: TUpdateProducerInput }): TProducer => {
    // create pet object and save
    return {
      _id: randomUUID().toString(),
      name: 'producer',
      country: 'country',
      region: 'region'
  };
  };

  const deleteProducer = (args: [input: string[]]): Boolean => {
    // create pet object and save
    return true;
  };

export const productResolvers = {
    createProducer,
    updateProducer,
    deleteProducer
  };