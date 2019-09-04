// Represents overall reducer
// Full state in redux is just one big JSON object
// The key that represents the indivdual slices of state i.e. the
// actual reducer is the actual individual reducers that we wrote.
import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

export default combineReducers({
  user: userReducer,
  cart: cartReducer
});
