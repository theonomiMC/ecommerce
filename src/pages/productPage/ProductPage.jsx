import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';
import ProductDetail from '../../components/productDetail/ProductDetail'
import Loader from '../../components/loader/Loader';

class ProductPage extends Component {
  render() {
    const { data } = this.props;
    const { loading } = data;
    return (
      <>
        {data.product && <ProductDetail item={data.product} />}
        {loading && <Loader />}
      </>
    )
  }
}

export default graphql(
  gql`
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
`,
)(ProductPage);