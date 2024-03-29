import CartActionTypes from './cart.types';
import { addItemToCart, removeItemFromCart } from '../cart/cart.utils';

const INITIAL_STATE = {
  hidden: true,
  cartItems: []
};

// This is essentially a reducer listener that listens to the different action types
// and then returns a new object with a new state


const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        // We are using a spread operator to take in give all the values of the state's cartItems array
        // and spreading them into this new array and also adding any additional values that might come in
        // action.payload
        cartItems: addItemToCart(state.cartItems, action.payload)
      };
      case CartActionTypes.REMOVE_ITEM:
        return {
          ...state,
          cartItems:removeItemFromCart(state.cartItems,action.payload)
        }    


    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem => cartItem.id !== action.payload.id
        )
      };
    default:
      return state;
  }
};

export default cartReducer;
