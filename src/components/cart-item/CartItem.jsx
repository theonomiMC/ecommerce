import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addProduct, removeProduct } from '../../redux/cart/cart.actions'
// import { filterPrice } from '../../utils'
import classes from './cartItem.module.scss'

class CartItem extends Component {

    render() {
        const currency = this.props.currency
        const { name, brand, gallery, quantity, attributes, selected } = this.props.item
        // const price = filterPrice(this.props.item, currency) // Not sure if this way is accceptable for this challange
        const price = this.props.item.prices.filter(el => el.currency.symbol === currency)[0]['amount']
        console.log('attributes', this.props.item)

        return (
            <div className={classes.cartItem} style={{ marginBottom: '1em' }}>
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
                <div className={classes.actions}>
                    <button
                        type="button"
                        onClick={() => this.props.addProduct(this.props.item)}
                    > + </button>
                    <span>
                        {quantity}
                    </span>
                    <button
                        type="button"
                        onClick={() => this.props.removeProduct(this.props.item)}
                    > - </button>
                </div>
                <img src={gallery[0]} alt={name} />
            </div >

        )
    }
}
const mapStateToProps = ({ cart: { currency } }) => ({
    currency
})
const mapDispatchToProps = dispatch => ({
    addProduct: product => dispatch(addProduct(product)),
    removeProduct: product => dispatch(removeProduct(product))
})
export default connect(mapStateToProps, mapDispatchToProps)(CartItem)