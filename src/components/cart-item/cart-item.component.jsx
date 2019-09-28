import React from 'react';
import './cart-item.styles.scss';

// Functional component where we destructure cart items off our state
const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <div className='cart-item'>
    <img src={imageUrl} alt='item'></img>
    <div className='cart-item'>
      <span className='name'>{name}</span>
      <span className='price'>{quantity} x ${price}</span>
    </div>
  </div>
);

export default CartItem;
