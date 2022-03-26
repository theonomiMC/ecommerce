import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addProduct, clearProduct } from '../../redux/cart/cart.actions';
import classes from './details.module.scss'

class Attributes extends Component {
    constructor() {
        super();
        this.state = {}
        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleClick(name, e) {
        // console.log({ ...this.state, [name]: value })
        // this.setState({ ...this.state, [name]: value })
        this.setState({ ...this.state, [name]: e.target.value })
    }
    handleSubmit() {
        this.props.addProduct({ ...this.props.item, selected: { ...this.state } })
    }
    render() {
        const item = this.props.item
        const addedProduct = this.props.cartItems.some(el => el.name === item.name)
        const attrName = this.props.item?.attributes.map(el => el.id)
        const attrValue = this.props.item?.attributes.map(el1 => el1.items[0].id)
        const selected = attrName.map((n, i) => ({ [n]: attrValue[i] }), {}).reduce((obj, item) => ({ ...obj, ...item }), {})
        let selectedOptions = Object.keys(this.state) > 0
        console.log(this.props.item.attributes.length)
        return (
            <div>
                {item.attributes.length > 0 && item?.attributes.map(attr => (
                    <React.Fragment key={attr.name}>
                        <p className={classes['attr-name']}>{attr.name}</p>
                        <ul className={classes['attribute-btns']}>
                            {attr.items.map((singleItem) => (
                                <li key={singleItem.id}>
                                    <input
                                        type='radio'
                                        value={singleItem.id}
                                        name={attr.name}
                                        id={singleItem.id + attr.name}
                                        onChange={() => this.handleClick(attr.name, singleItem.id)}
                                        style={{ backgroundColor: `${singleItem.id}` }}
                                        checked={singleItem.id === selected[attr.name]}

                                    />
                                    <label htmlFor={singleItem.id + attr.name}
                                        style={{ backgroundColor: `${singleItem.value}` }}
                                    >{attr.type !== 'swatch' ? singleItem.value : ''}</label>
                                </li>
                            ))}
                        </ul>
                    </React.Fragment>
                ))}
                {/* according to product status, add/remove functionality changes */}
                {
                    addedProduct ? <button className={classes['cart-btn']}
                        type='button'
                        onClick={() => this.props.clearProduct(this.props.item)}
                    > remove from cart</button>
                        : <button className={classes['cart-btn']}
                            type='button'
                            onClick={this.handleSubmit}
                            disabled={!this.props.item.inStock}>
                            {item.inStock ? 'add to cart' : 'Out of stock'}
                        </button>

                }
            </div>
        )
    }
}
const mapStateToProps = ({ cart: { cartItems } }) => ({
    cartItems
})
const mapDispatchToProps = dispatch => ({
    addProduct: item => dispatch(addProduct(item)),
    clearProduct: product => dispatch(clearProduct(product))
})
export default connect(mapStateToProps, mapDispatchToProps)(Attributes)