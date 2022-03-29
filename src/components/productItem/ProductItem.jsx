import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addProduct } from '../../redux/cart/cart.actions';
import { filterPrice } from '../../utils';
import classes from './productItem.module.scss';

class ProductItem extends Component {
    render() {
        const product = this.props.product;
        const price = filterPrice(product, this.props.currency)
        const attrName = this.props.product?.attributes.map(el => el.id)
        const attrValue = this.props.product?.attributes.map(el1 => el1.items[0].id)
        // highlight selected attributes in product attributes
        const selected = attrName.map((n, i) => ({ [n]: attrValue[i] }), {}).reduce((obj, item) => ({ ...obj, ...item }), {})
        const uid = product.id + '-' + product.attributes.map(el => el.items[0]['id']).join('-')
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
                    onClick={() => this.props.addProduct({ ...product, selected, uid })} >
                    <img src='/assets/cart.svg' alt='add to cart' />
                </button>
                }

            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    addProduct: product => dispatch(addProduct(product))
})
const mapStateToProps = ({ cart: { currency, cartItems } }) => ({
    currency,
    cartItems
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductItem)