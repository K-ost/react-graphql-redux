import { gql } from "@apollo/client"

export const GET_COMMENTS = gql`
  query getAllComments {
    getAllComments {
      id, name, email, body
    }
  }
`

export const GET_PRODUCTS = gql`
  query GetProducts {
    getAllProducts {
      id, title, imgs, price, action, new, hit, art, rate
    }
  }
`
