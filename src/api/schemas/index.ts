import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLList } from 'graphql';

const ProducerType = new GraphQLObjectType({
  name: 'Producer',
  fields: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    region: { type: GraphQLString },
  },
});

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    vintage: { type: new GraphQLNonNull(GraphQLString) },
    producerId: { type: new GraphQLNonNull(GraphQLID) },
    producer: {
      type: ProducerType,
      resolve: async (product, _, { resolvers }) => {
        return resolvers.producersResolver.getProducer({_id: product.producerId})
      },
    },
  },
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    product: {
      type: ProductType,
      args: {
        _id: { type: GraphQLID },
        producerId: { type: GraphQLID },
      },
      resolve: async (_, { _id, producerId }, { resolvers }) => {
        return resolvers.productsResolver.getProduct({_id})
      },
    },
    products: {
      type: new GraphQLNonNull(new GraphQLList(ProductType)), // Non-null list of Products
      resolve: async (_, __, { resolvers }) => {
        // Implement resolver logic here
        return resolvers.productsResolver.getProducts()
      },
    },
  },
});

const plainSchema = new GraphQLSchema({ query: QueryType });

export default plainSchema;