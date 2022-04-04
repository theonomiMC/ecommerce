import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from './cart-page.module.scss'
import { filterPrice } from '../../utils';
import CartPageItem from '../../components/cart-page-item/CartPageItem';


class CartPage extends Component {
  render() {
    const cartItems = this.props.cartItems
    const sum = this.props.sum.toFixed(2)
    const currency = this.props.currency

    return (
      <div className={classes.cart}>
        <h1 className={classes['cart-title']}>Cart</h1>
        {/* show products added to cart */}
        {cartItems && cartItems.map(item => <CartPageItem key={item.uid} item={item} />)}
        <div className={classes.total} >
          <p>Total:</p>
          <p>{currency}{sum}</p>
        </div>
        <Link to='/checkout'>
          <button className={classes['checkout-btn']}>
            check out
          </button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = ({ cart: { cartItems, currency } }) => ({
  cartItems,
  currency,
  sum: cartItems.reduce((total, item) => total + filterPrice(item, currency) * item.quantity, 0),
})

export default connect(mapStateToProps)(CartPage)