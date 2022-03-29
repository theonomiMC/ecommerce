import React, { Component } from 'react'
import { connect } from 'react-redux';
import { changeCurrency, isHiddenCurr } from '../../redux/cart/cart.actions';
import classes from './currency.module.scss'

class CurrencyForm extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.ref && !this.ref.current.contains(event.target)) {
            this.props.isHiddenCurr()
        }
    }
    render() {
        return (
            <div className={classes.wrapper} ref={this.ref}>
                {this.props.data.length > 0 && this.props.data.map(cur => (
                    <button value={cur.symbol}
                        onClick={(e) => (
                            this.props.changeCurrency(e.target.value)
                        )}
                        key={cur.label} >
                        {cur.symbol}{' '}{cur.label}
                    </button>

                ))}
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    changeCurrency: value => dispatch(changeCurrency(value)),
    isHiddenCurr: () => dispatch(isHiddenCurr())
})
export default connect(null, mapDispatchToProps)(CurrencyForm)