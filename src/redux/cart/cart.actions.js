import CartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

// Actions always have a type value and a payload value
// payload value can be anything we want it to be
// In our case, it will be the item we are trying to add into our cart items array in cart.reducer
export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
});

export const clearItemFromCart = item => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item
});

export const removeItem = item => ({
  type:CartActionTypes.REMOVE_ITEM,
  payload:item
})
