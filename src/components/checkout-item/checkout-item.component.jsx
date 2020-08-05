import React from "react";
import {connect} from "react-redux";
import {addItem, clearItemFromCart, decreaseItemQuantityByOne} from "../../redux/cart/cart.actions";

import "./checkout-item.styles.scss"

const CheckoutItem = ({checkoutItem, removeItem, addItem, decreaseQuantityByOne}) => {
    const {name, imageUrl, price, quantity} = checkoutItem;
    return (
        <div className="checkout-item">
            <div className="image-container">
                <img src={imageUrl} alt="item"/>
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={() => decreaseQuantityByOne(checkoutItem)}>&#10094;</div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={() => addItem(checkoutItem)}>&#10095;</div>
            </span>
            <span className="price">{price}</span>
            <div className="remove-button" onClick={() => removeItem(checkoutItem)}>&#10005;</div>

        </div>
    )
};

const mapDispatchToPros = dispatch => ({
    removeItem: item => dispatch(clearItemFromCart(item)),
    addItem: item => dispatch(addItem(item)),
    decreaseQuantityByOne: item => dispatch(decreaseItemQuantityByOne(item))
});

export default connect(null, mapDispatchToPros)(CheckoutItem);