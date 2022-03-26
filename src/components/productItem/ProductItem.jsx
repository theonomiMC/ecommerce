import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addProduct, clearProduct } from '../../redux/cart/cart.actions';
// import { filterPrice } from '../../utils';
import classes from './productItem.module.scss';

class ProductItem extends Component {
    render() {
        const product = this.props.product;
        // const price = filterPrice(product, this.props.currency) // if it's not allowed this way
        const price = product.prices.filter(el => el?.currency?.symbol === this.props.currency)[0]['amount']
        const attrName = this.props.product?.attributes.map(el => el.id)
        const attrValue = this.props.product?.attributes.map(el1 => el1.items[0].id)
        // highlight selected attributes in product attributes
        const selected = attrName.map((n, i) => ({ [n]: attrValue[i] }), {}).reduce((obj, item) => ({ ...obj, ...item }), {})
        const addedProduct = this.props.cartItems.some(el => el.name === product.name)
        return (
            <div className={classes['product-item']}>
                <Link to={`/${product.category}/${product.id}`}>
                    <div className={!product.inStock ? `${classes.out}` : undefined}>
                        <div className={classes['img-wrapper']}>
                            <img
                                src={product.gallery[0]}
                                title={product.name}
                                alt={product.name}
                                loading="lazy"
                            />
                        </div>

                        <div className={classes.content}>
                            <h2>{product.name}</h2>
                            <p>{this.props.currency}{price}</p>
                        </div>
                    </div>
                </Link>
                {/* if product not in stock disable add-to-cart function */}
                {product.inStock && <button className={classes['cart-btn']}
                    onClick={() => this.props.addProduct({ ...product, selected })} >
                    <img src='/assets/cart.svg' alt='add to cart' />
                </button>
                }
                {/* if product is already added, change function from add to remove product from cart */}
                {
                    addedProduct && <button className={classes['cart-btn']}
                        onClick={() => this.props.clearProduct(product)} >
                        <img src='/assets/remove.svg' alt='remove' />
                    </button>
                }
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    addProduct: product => dispatch(addProduct(product)),
    clearProduct: product => dispatch(clearProduct(product))
})
const mapStateToProps = ({ cart: { currency, cartItems } }) => ({
    currency,
    cartItems
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductItem)