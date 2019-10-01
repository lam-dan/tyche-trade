// Allows us to write our selectors in a way such that it 
// knows that the properties we’re pulling from state and 
// using in the sense that their value hasn’t changed and 
// the output of the selector is not different, that it will 
// not pass them in the component, so react will not re-render 
// the component.  It also allows us to separate our selectors 
// to make them resuable.

import { createSelector } from 'reselect';

// state is passed in here and state.cart is returned which becomes
// the selectCart
const selectCart = state => state.cart;

// createSelector takes in 2 arguments, the object in an array
// and the function how each object item should be returned

// receives cart object which gets into this function
export const selectCartItems = createSelector(
  [selectCart],
  // passes out each of the object's cartItems
  cart => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
)

// the above selectCartItems gets passed into this 
// selectCartItemsCount function as a first argument
// it passes the cartItems into this function as an argument
// where for each of the cartItems reduce method is ran
// to returns us the running count of the cart items
// this gets returned to the original function that called the import and it's methods


export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity * cartItem.price,
      0
    )
)