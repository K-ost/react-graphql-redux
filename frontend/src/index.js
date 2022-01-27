import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// Redux imports
import { Provider } from 'react-redux'
import { store } from './store'

// Css
import './assets/index.scss'

// Apollo graphql
import ApolloClient from 'apollo-boost'
import { ApolloProvider, InMemoryCache } from '@apollo/react-hooks'

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
