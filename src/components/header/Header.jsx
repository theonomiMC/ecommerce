import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import CartModal from '../cart-modal/CartModal';
import { connect } from 'react-redux';
import classes from './header.module.scss';
import CartBadge from '../cart-badge/CartBadge';
import CurrencyBadge from '../currency/CurrencyBadge';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from "@apollo/client";

class Header extends Component {
    render() {
        const categories = this.props.data.categories;
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

                    <div className={classes.right}>
                        <CurrencyBadge />
                        <CartBadge />
                    </div>
                </nav>

                {hidden && <CartModal />}
            </header>
        )
    }
}
const mapStateToProps = ({ cart: { hidden } }) => ({
    hidden,
})

export default graphql(
    gql`
    query{
        categories{
            name
        }
    }
    `
)(connect(mapStateToProps)(Header));