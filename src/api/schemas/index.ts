import { buildSchema } from "graphql";

const schema = buildSchema(`
  type Producer {
    _id: ID!
    name: String!
    country: String
    region: String
  }

  type Product {
    _id: ID!
    name: String!
    vintage: String!
    producerId: ID!
    producer: Producer!
  }

  type Query {
    getProducts: [Product]
    getProduct(id: ID!): Product
  }

  input CreateProductsInput {
    name: String!
    vintage: String!
    producerId: ID!
  }

  input UpdateProductInput {
    _id: ID!
    name: String!
    vintage: String!
    producerId: ID!
  }

  input CreateProducerInput {
    name: String!
    vintage: String!
    producerId: ID!
  }

  input UpdateProducerInput {
    name: String!
    vintage: String!
    producerId: ID!
  }


  type Mutation {
    createProducts(input: [CreateProductsInput!]): [Product!]
    updateProduct(input: UpdateProductInput!): Product!
    deleteProducts(input: [ID!]): Boolean!

    createProducer(input: CreateProducerInput!): Producer!
    updateProducer(input: UpdateProducerInput!): Producer!
    deleteProducer(id: ID!): Boolean!
  }

`);

export default schema;