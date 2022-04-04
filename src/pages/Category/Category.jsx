import React, { Component } from 'react';
import Products from '../../components/products/Products';
import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';
import { withApollo } from '@apollo/client/react/hoc';
import { GET_CATEGORY } from '../../queries';
import classes from './category.module.scss';

class Category extends Component {
  state = {}
  
  componentDidMount = () => {
    this.fetchCategory(this.props.title)
  }
  async fetchCategory(value) {
    const { client } = this.props;
    const res = await client.query({
      query: GET_CATEGORY, variables: {
        title: value,
      },
    });
    this.setState(res)
  }
  componentDidUpdate(prevProps) {
    if (this.props.title !== prevProps.title) {
      this.fetchCategory(this.props.title);
    }
  }
  render() {
    const { loading, error, data } = this.state
    const products = data?.category?.products;
    const categoryName = data?.category?.name;

    return (
      <section className={classes.category}>
        <h1>{categoryName}</h1>
        {data && <Products products={products} category={data?.category?.name} />}
        {loading && <Loader />}
        {error && <Error />}
      </section>
    );
  }
}

export default withApollo(Category)
