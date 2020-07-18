import React from "react";
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {createStructuredSelector} from "reselect";
import {selectCartItems} from "../../redux/cart/cart.selectors";

import CartItem from "../cart-item/cart-item.component";
import CustomButton from "../custom-button/custom-button.component";

import "./cart-dropdown.styles.scss"

const CartDropdown = ({cartItems, history}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ?
                    cartItems.map(item => (<CartItem key={item.id} item={item}/>))
                    :
                    <span className="empty-message">Your Cart Is Empty</span>
            }
        </div>
        <CustomButton onClick={() => history.push('/checkout')}>Go To CheckOut</CustomButton>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));