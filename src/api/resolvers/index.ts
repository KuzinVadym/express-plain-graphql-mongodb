import { ProducerResolvers } from './producer.resolver';
import { ProductResolvers } from './product.resolver';

export function initResolvers(entities) {
  const { ProductModel, ProducerModel } = entities;
  const productsResolver = new ProductResolvers(ProductModel);
  const producersResolver = new ProducerResolvers(ProducerModel);

  return {
    productsResolver,
    producersResolver
  }
}  