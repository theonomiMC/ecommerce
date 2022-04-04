import React, { Component } from 'react';
import ProductItem from '../productItem/ProductItem';
import classes from './products.module.scss';

class Products extends Component {
  state = {
    selected: {}
  }
  render() {
    const products = this.props.products

    return (
      <div className={classes.products}>
        {
          products && products.map((product) => {
            // create unique id
            let id = product.id + '-' + product.attributes.map(el => el.items[0]['value']).join('-')
            return (
              <ProductItem
                key={id}
                product={product}
                category={product.category}
              />
            )
          })
        }
      </div>
    );
  }
}

export default Products;
