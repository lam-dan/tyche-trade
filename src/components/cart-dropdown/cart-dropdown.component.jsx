import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';

// Pull off cart items using connect off our Redux store
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';

import './cart-dropdown.styles.scss';

const CartDropDown = ({ cartItems, history }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {cartItems.length ? (
        cartItems.map(cartItem => (
        <CartItem key={cartItem.id} item={cartItem} />
      ))
      ) : (
        <span className='empty-message'>Your cart is empty</span>
      )}
    </div>
    <CustomButton onClick = { () => history.push('/checkout')}>GO TO CHECKOUT</CustomButton>
  </div>
);

// we pass the whole reducer state into the selector
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

// All our higher order components return components, but also take components as a 
// an argument.
// withRouter takes in a component that got returned from our connect call as a component
// argument.  
// When you wrap components, it evaluates it from inside out.
// So basically, we want whatever component is being returned by connect which
// we'll then pass into our withRouter component.  That in turns returns a new component
// that now has access to withRouter properties such as history.
export default withRouter(connect(mapStateToProps)(CartDropDown));
