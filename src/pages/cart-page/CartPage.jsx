import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct, removeProduct } from '../../redux/cart/cart.actions';
import { Link } from 'react-router-dom';
import classes from './cart-page.module.scss'
import { filterPrice } from '../../utils';

class CartPage extends Component {
  render() {
    const cartItems = this.props.cartItems
    const sum = this.props.sum.toFixed(2)
    const currency = this.props.currency

    return (
      <div className={classes.cart}>
        <h1 className={classes['cart-title']}>Cart</h1>
        {/* show products added to cart */}
        {cartItems && cartItems.map(item => {
          const { name, brand, gallery, quantity, attributes, selected } = item // destructure item values
          // const price = filterPrice(item, currency) get relevant currency (if it's not allowed this way)
          const price = item.prices.filter(el => el.currency.symbol === currency)[0]['amount']
          return (
            <div className={classes.cartItem} style={{ marginBottom: '1em' }} key={item.id}>
              <div className={classes.info}>
                <p>{name}</p>
                <p>{brand}</p>
                <span>{currency}{price}</span>
                <div className={classes.attributes}>
                  {attributes.map(attr => attr.items.length > 0 && (
                    <div key={attr.id} style={{ display: 'block', marginTop: '1.1em' }}>
                      {attr?.items.map(singleItem => (
                        <button
                          onClick={e => console.log(e.target.value)}
                          value={singleItem.id}
                          key={singleItem.id}
                          className={
                            Object.values(selected).includes(singleItem.id) ?
                              `${classes.active}` : `${classes.inactive}`
                          }
                          style={{ backgroundColor: `${singleItem.value}` }}>
                          {attr.type !== 'swatch' ? singleItem.value : ''}</button>
                      ))}

                    </div>)
                  )}
                </div>
              </div>
              {/* increase / decrease added product quantity*/}
              <div className={classes.actions}>
                <button
                  type="button"
                  onClick={() => this.props.addProduct(item)}
                > + </button>
                <span>
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => this.props.removeProduct(item)}
                > - </button>
              </div>
              <img src={gallery[0]} alt={name} />
            </div>
          )
        })}
        
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
const mapDispatchToProps = dispatch => ({
  addProduct: product => dispatch(addProduct(product)),
  removeProduct: product => dispatch(removeProduct(product))
})
export default connect(mapStateToProps, mapDispatchToProps)(CartPage)