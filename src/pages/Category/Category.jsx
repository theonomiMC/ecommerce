import React, { Component } from 'react';
import Products from '../../components/products/Products';
import Loader from '../../components/loader/Loader';
import classes from './category.module.scss';

class Category extends Component {
  render() {
    const products = this.props.products;
    const name = this.props.name;
    const loading = this.props.loading;

    return (
      <section className={classes.category}>
        <h1>{name}</h1>
        {products && <Products products={products} category={name} />}
        {loading && <Loader />}
      </section>
    );
  }
}

export default Category;
