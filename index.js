const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')

// Auth
const schema = require('./schema')
const config = require('config')
const mongoose = require('mongoose')
const PORT = config.get('port') || 4000

// Database
let products = require('./data/data.json')
let reviews = require('./data/reviews.json')
const resolvers = require('./resolvers')


// Express settings
const app = express()
app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true,
}))

// Auth routes
app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))


// Start function
async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`Now browse to localhost:${PORT}/graphql`))
  } catch(err) {
    console.log('Server error', err.message)
    process.exit(1)
  }
}
start()
