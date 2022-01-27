const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Product {
    id: String!
    title: String!
    art: String
    price: String
    instock: Int
    instock_customer: Int
    imgs: [String]
    hit: Boolean
    new: Boolean
    action: Boolean
    country: String
    brand: String
    cat: String
    subcat: String
    video: String
    doc: [String]
    text: String
    rate: String
  }

  type Review {
    id: String!
    productId: String!
    author: String
    text: String
    date: String
    approved: Boolean
    rate: String
  }

  type User {
    id: String!
    name: String!
    email: String!
    password: String
  }

  type Message {
    text: String!
  }

  type LoginStatus {
    userId: ID!
    token: String!
    status: String!
  }
  
  type Query {
    getAuth: Boolean!
    getAllProducts: [Product]!
    getProduct(id: String!): Product!
    getAllReviews: [Review]!
    getReviews(productId: String): [Review]!
    getUsers: [User]!
    login(email: String!, password: String!): LoginStatus!
  }

  input ReviewInput {
    productId: String!
    author: String!
    text: String!
    rate: String!
  }

  input setAllRateInput {
    id: String
    rate: String
  }

  input UserInput {
    name: String!
    email: String!
    password: String
  }
  
  type Mutation {
    setReview(input: ReviewInput): Review
    removeReview(input: String): [Review]
    setAllRate(input: setAllRateInput): Product
    setUser(input: UserInput): Message
  }
`)

module.exports = schema
