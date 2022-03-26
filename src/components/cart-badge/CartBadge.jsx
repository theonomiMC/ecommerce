import React, { Component } from 'react'
import { connect } from 'react-redux';
import { isHidden } from '../../redux/cart/cart.actions';
import classes from './cart-icon.module.scss'

class CartBadge extends Component {
    render() {
        const isHidden = this.props.isHidden
        let totalItems = this.props.totalItems
        return (
            <div className={classes['cart-icon']}
                onClick={isHidden}
            >
                <img src="/assets/cart-black.svg" alt='logo' />
                {totalItems > 0 && <div className={classes.count}>
                    <span>{totalItems}</span>
                </div>}

            </div>

        )
    }
}

const mapDispatchToProps = dispatch => ({
    isHidden: () => dispatch(isHidden())
});
const mapStateToProps = ({ cart: { cartItems } }) => ({
    totalItems: cartItems.reduce((total, item) => total + item.quantity, 0),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartBadge)