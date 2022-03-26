import React, { Component } from 'react'
import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';
import CurrencyForm from './CurrencyForm';
import { connect } from 'react-redux'
import { isHiddenCurr } from '../../redux/cart/cart.actions';
import classes from './currency.module.scss';

class CurrencyBadge extends Component {
    render() {
        const currencies = this.props.data.currencies
        const isHiddenCurr = this.props.isHiddenCurr
        const hidden_curr = this.props.hidden_curr

        return (
            <div className={classes.currency} onClick={isHiddenCurr}>
                <div className={classes.currencyIcon}>
                    <span >{this.props.currency}</span>
                    <img src={hidden_curr ? `/assets/arrow-up.svg` : `/assets/arrow-down.svg`} alt='currency' />
                </div>
                {hidden_curr && <CurrencyForm data={currencies} />}
            </div>

        )
    }
}
const mapStateToProps = ({ cart: { currency, hidden_curr } }) => ({
    currency,
    hidden_curr
})
const mapDispatchToProps = dispatch => ({
    isHiddenCurr: () => dispatch(isHiddenCurr())
});
export default graphql(
    gql`
    query{
        currencies{
            symbol
            label
          }
    }
    `
)(connect(mapStateToProps, mapDispatchToProps)(CurrencyBadge))