import React, { Component } from 'react';
import ProductDetail from '../../components/productDetail/ProductDetail'
import Loader from '../../components/loader/Loader';
import { withApollo } from '@apollo/client/react/hoc';
import { GET_PRODUCT } from '../../queries';

class ProductPage extends Component {
  state = {}

  componentDidMount = async () => {
    const { client } = this.props;
    const res = await client.query({
      query: GET_PRODUCT, variables: {
        id: this.props.id,
      },
    });
    this.setState(res)
  }
  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.fetchCategory(this.props.id);
    }
  }
  render() {
    const { loading, data } = this.state;
    return (
      <>
        {data && <ProductDetail item={data?.product} />}
        {loading && <Loader />}
      </>
    )
  }
}

export default withApollo(ProductPage);