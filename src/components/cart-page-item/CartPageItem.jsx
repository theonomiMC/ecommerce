import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct, removeProduct } from '../../redux/cart/cart.actions';
import classes from './cart-page-item.module.scss'

class CartPageItem extends Component {
    constructor() {
        super()
        this.state = {
            idx: 0
        }
        this.goToNext = this.goToNext.bind(this)
        this.goToPrev = this.goToPrev.bind(this)
    }

    goToNext(length) {
        if (this.state.idx >= 0 && this.state.idx < length) {
            this.setState(prev => ({ idx: prev.idx + 1 }))
        }
        return;
    }
    goToPrev(length) {
        if (this.state.idx > 0 && this.state.idx <= length) {
            this.setState(prev => ({ idx: prev.idx - 1 }))
        }
        return;
    }
    render() {

        const currency = this.props.currency
        const { name, brand, gallery, quantity, attributes, selected } = this.props.item // destructure item values
        const len = gallery.length - 1
        const price = this.props.item.prices.filter(el => el.currency.symbol === currency)[0]['amount']

        return (
            <div className={classes.cartItem}>
                <div className={classes.info}>
                    <p>{name}</p>
                    <p>{brand}</p>
                    <span>{currency}{price}</span>
                    <div className={classes.attributes}>
                        {attributes.map(attr => attr.items.length > 0 && (
                            <div key={attr.id} className={classes['btns-container']}>
                                {attr?.items.map(singleItem => (
                                    <button
                                        onClick={e => console.log(e.target.value)}
                                        value={singleItem.id}
                                        key={singleItem.id}
                                        className={
                                            selected[attr.id]===singleItem.id || selected[attr.id]===singleItem.value?
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
                <div className={classes['img-container']}>
                    <img src='./assets/left-arrow.svg' onClick={() => this.goToPrev(len)} alt='left' className={`${classes.arrow} ${classes.prev}`} />
                    <img src={gallery[this.state.idx]} alt={name} className={classes['item-img']} />
                    <img src='./assets/right-arrow.svg' onClick={() => this.goToNext(len)} alt='right' className={`${classes.arrow} ${classes.next}`} />
                </div>
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(CartPageItem)