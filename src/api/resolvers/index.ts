import { ProducerResolvers } from './producerResolver';
import { ProductResolvers } from './productResolver';

export function initResolvers(entities) {
  const { ProductModel, ProducerModel } = entities;
  const productsResolver = new ProductResolvers(ProductModel);
  const producersResolver = new ProducerResolvers(ProducerModel);

  return {
    productsResolver,
    producersResolver
  }
}  