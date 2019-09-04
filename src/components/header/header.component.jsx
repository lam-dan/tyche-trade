import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({ currentUser }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
    </div>
  </div>
);

// We will write this pattern extensively if we need anything from our
// reducers in our future components.
// Name of the property is the property we want to pass into our headers.
// State is the root reducer, user is the field on the root-reducer
// The user is then the user.reducer that contains the currentUser initial
// state as 'null'
const mapStateToProps = state => ({
  currentUser: state.user.currentUser

})

// Connect is a higher order component that takes in another component and return 
// a powered up component.
// Passing mapStateToProps we are getting that current user null value as
// being passed into the Header Component above as 'null' value
export default connect(mapStateToProps)(Header);
