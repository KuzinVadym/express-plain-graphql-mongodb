import { ProducerResolvers } from './Producer.resolver';
import { ProductResolvers } from './Product.resolver';

export function initResolvers(entities) {
  const { ProductModel, ProducerModel } = entities;
  const productsResolver = new ProductResolvers(ProductModel);
  const producersResolver = new ProducerResolvers(ProducerModel);

  return {
    productsResolver,
    producersResolver
  }
}  