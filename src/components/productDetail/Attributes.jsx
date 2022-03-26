import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addProduct, clearProduct } from '../../redux/cart/cart.actions';
import classes from './details.module.scss'

class Attributes extends Component {
    constructor() {
        super();
        this.state = {}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
    }
    handleChange(name, value) {
        this.setState({ ...this.state, [name]: value })
    }
    handleSubmit() {
        let allSelected = Object.keys(this.state).length
        let allAtributes = this.props.item.attributes.length
        if (allSelected === allAtributes) {
            this.props.addProduct({ ...this.props.item, selected: { ...this.state } })
        } else {
            alert('Please select all attributes.  ')
        }

    }
    handleRemove() {
        this.props.clearProduct(this.props.item)
    }
    render() {
        const item = this.props.item
        const addedProduct = this.props.cartItems.some(el => el.name === item.name)
        return (
            <div>
                {item.attributes.length > 0 && item?.attributes.map(attr => (
                    <React.Fragment key={attr.name}>
                        <p className={classes['attr-name']}>{attr.name}</p>
                        <ul className={classes['attribute-btns']}>
                            {attr.items.map((singleItem, i) => (
                                <li key={singleItem.id}>
                                    <input
                                        type='radio'
                                        value={singleItem.id}
                                        name={attr.name}
                                        id={singleItem.id + attr.name}
                                        onChange={() => this.handleChange(attr.name, singleItem.id)}
                                        style={{ backgroundColor: `${singleItem.id}` }}
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
                        onClick={this.handleRemove}
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