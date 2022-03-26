import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import CartModal from '../cart-modal/CartModal';
import { connect } from 'react-redux';
import classes from './header.module.scss';
import CartBadge from '../cart-badge/CartBadge';
import CurrencyBadge from '../currency/CurrencyBadge';

class Header extends Component {

    render() {
        const categories = this.props.categories;
        const hidden = this.props.hidden
        return (
            <header className={classes.header}>
                <nav>
                    {/* Categories */}
                    <ul>
                        {categories &&
                            categories.map(category => {
                                return (
                                    <li key={category.name}>
                                        <NavLink
                                            exact
                                            to={`/${category.name}`}
                                            activeClassName={classes.active}
                                        >
                                            {category.name}
                                        </NavLink>
                                    </li>
                                );
                            })}
                    </ul>
                    {/* Logo */}
                    <img src="/assets/logo.svg" alt='logo' />
                    <CurrencyBadge />
                </nav>
                <div className={classes.right}>
                    <CartBadge />
                </div>
                {hidden && <CartModal />}
            </header >
        )
    }
}
const mapStateToProps = ({ cart: { hidden } }) => ({
    hidden,
})
// const mapDispatchToProps = dispatch => ({
//     isHidden: () => dispatch(isHidden())
// });
export default connect(mapStateToProps)(Header);