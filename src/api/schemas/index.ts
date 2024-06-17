import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLList, GraphQLInputObjectType, GraphQLBoolean } from 'graphql';

function filterUndefinedKeys(obj) {
  return Object.keys(obj)
  .filter((key) => obj[key] !== undefined)
  .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});
}

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

const DeleteProductResultType = new GraphQLObjectType({
  name: 'DeleteProductResult',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    status: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
});

const CreateProductsInput = new GraphQLInputObjectType({
  name: 'CreateProductsInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    vintage: { type: new GraphQLNonNull(GraphQLString) },
    producerId: { type: new GraphQLNonNull(GraphQLID) },
  },
});

const UpdateProductInput = new GraphQLInputObjectType({
  name: 'UpdateProductInput',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    vintage: { type: GraphQLString },
    producerId: { type: GraphQLID },
  },
});

const CreateProducerInput = new GraphQLInputObjectType({
  name: 'CreateProducerInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: GraphQLString },
    region: { type: GraphQLString },
  },
});

const UpdateProducerInput = new GraphQLInputObjectType({
  name: 'UpdateProducerInput',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    region: { type: GraphQLString },
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
        return resolvers.productsResolver.getProduct(filterUndefinedKeys({_id, producerId}))
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

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createProducts: {
      type: new GraphQLNonNull(new GraphQLList(ProductType)),
      args: {
        input: { type: new GraphQLNonNull(new GraphQLList(CreateProductsInput)) },
      },
      resolve: async (_, { input }, { resolvers }) => {
        return resolvers.productsResolver.createProducts(input);
      },
    },
    updateProduct: {
      type: new GraphQLNonNull(ProductType),
      args: {
        input: { type: new GraphQLNonNull(UpdateProductInput) },
      },
      resolve: async (_, { input }, { resolvers }) => {
        return resolvers.productsResolver.updateProduct(input);
      },
    },
    deleteProducts: {
      type: new GraphQLNonNull(new GraphQLList(DeleteProductResultType)),
      args: {
        _ids: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
      },
      resolve: async (_, { _ids }, { resolvers }) => {
        // Implement logic to delete products in data source
        return resolvers.productsResolver.deleteProducts(_ids);
      },
    },
    createProducer: {
      type: new GraphQLNonNull(ProducerType),
      args: {
        input: { type: new GraphQLNonNull(CreateProducerInput) },
      },
      resolve: async (_, { input }, { resolvers }) => {
        return resolvers.producersResolver.createProducer(input);
      },
    },
    updateProducer: {
      type: new GraphQLNonNull(ProducerType),
      args: {
        input: { type: new GraphQLNonNull(UpdateProducerInput) },
      },
      resolve: async (_, { input }, { resolvers }) => {
        return resolvers.producersResolver.updateProducer(input);
      },
    },
    deleteProducer: {
      type: new GraphQLNonNull(GraphQLBoolean),
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, { _id }, { resolvers }) => {
        // Implement logic to delete a producer by ID in data source
        return resolvers.producersResolver.deleteProducer(_id);
      },
    },
  },
});

const plainSchema = new GraphQLSchema({ query: QueryType, mutation: MutationType });

export default plainSchema;