import CartActionTypes from "./cart.types";
import {addItemToCart, decreaseQuantityByOne, removeSingleItemFromCart} from "./cart.utils";

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            };
        case  CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            };
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: removeSingleItemFromCart(state.cartItems, action.payload)
            };
        case CartActionTypes.DECREASE_ITEM_QUANTITY_BY_ONE:
            return {
                ...state,
                cartItems: decreaseQuantityByOne(state.cartItems, action.payload)
            };
        default:
            return state
    }
};

export default cartReducer;