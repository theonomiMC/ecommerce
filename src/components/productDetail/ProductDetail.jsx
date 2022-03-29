import React, { Component } from 'react';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import Attributes from './Attributes';
import classes from './details.module.scss'
// import { filterPrice } from '../../utils';

class ProductDetail extends Component {
    state = {
        mainImage: this.props.item.gallery[0] || '/assets/no-image.webp'
    }
    render() {
        const item = this.props.item
        const currency = this.props.currency
        // const price = filterPrice(item, currency)
        const price = item?.prices.filter(el => el?.currency?.symbol === currency)[0]['amount']
        return (
            <article className={classes.details}>
                <div className={classes.gallery}>
                    {item.gallery.length > 0 && item.gallery.map((image) =>
                        <img
                            src={image}
                            key={image}
                            alt={item.name}
                            onClick={(e) => { this.setState({ ...this.state, mainImage: e.target.src }) }}
                            loading="lazy" />
                    )}
                </div>
                <div className={classes['main-image']}>
                    <img src={this.state.mainImage} alt={item?.name} />
                </div>
                <div className={classes.content}>
                    <h2>{item?.name}</h2>
                    <h3>{item?.brand}</h3>
                    <p className={classes['attr-name']}>price</p>
                    <p className={classes.price}>{currency}{price}</p>
                    <Attributes item={item} />
                    <div className={classes.desc}>{parse(item?.description)}</div>
                </div>
            </article>
        )
    }
}
const mapStateToProps = ({ cart: { currency } }) => ({
    currency,
})
export default connect(mapStateToProps)(ProductDetail)