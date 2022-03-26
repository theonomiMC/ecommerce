import React, { Component } from 'react';
import ProductItem from '../productItem/ProductItem';
import classes from './products.module.scss';

class Products extends Component {
  render() {
    const products = this.props.products
    return (
      <div className={classes.products}>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            category={product.category}
          />
        ))}
      </div>
    );
  }
}

export default Products;
