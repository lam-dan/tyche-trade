import React from 'react';
// We use connect to import redux bindings that give us access

import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
// Import addItem action into our component

import { addItem } from '../../redux/cart/cart.actions';
import './collection-item.styles.scss';

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;

  return (
    <div className='collection-item'>
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <CustomButton onClick={() => addItem(item)} inverted>
        Add to cart
      </CustomButton>
    </div>
  );
};

// Redux way to dispatch an action to trigger a state change for a component
// mapDispatchToProps will be this function that gets a dispatch and returns an object
// that has a addItem key value that represents the prop that gets passed into our component

// The object's addItem key value or the prop stores a function that takes in an item as an argument
// and returns a dispatch to our addItem 'action creator' passing in the item argument.
// This in turn returns a object where the type is equal to ADD_ITEM and the payload is
// equal to the item that gets passed in.
// Then we will dispatch that object into our store and it will go to through our redux flow

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default connect(
  null,
  mapDispatchToProps
)(CollectionItem);
