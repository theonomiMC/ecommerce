import { gql } from "@apollo/client";

export const GET_CATEGORY = gql`
  query FETCH_CATEGORY($title:String!){
    category(input: {title:$title}){
      name
      products {
        id
        name
        inStock
        gallery
        category
        attributes {
          id
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
  `

export const GET_PRODUCT = gql`
  query FETCH_PRODUCT($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency{
          label
          symbol
        }
        amount
      }
      brand
    }
  }
  `