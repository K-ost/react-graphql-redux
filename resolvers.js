
// Database
let products = require('./data/data.json')
let reviews = require('./data/reviews.json')

// Resolvers
const resolvers = {
  // Products
  getAllProducts: () => products,
  getProduct: ({id}) => {
    return products.find(item => item.id === id)
  },

  // reviews
  getAllReviews: () => reviews,
  getReviews: ({ productId }) => {
    const productComments = reviews.filter(review => review.productId === productId)
    return productComments
  },
  setReview: ({ input }) => {
    const newReview = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      ...input
    }
    reviews.push(newReview)
    return newReview
  },
  removeReview: ({ input }) => {
    reviews = reviews.filter(item => item.id !== input)
  },

  // Rate
  setAllRate: ({ input }) => {
    const findedProduct = products.find(item => item.id === input.id)
    findedProduct.rate = input.rate
    return findedProduct
  }


}

module.exports = resolvers