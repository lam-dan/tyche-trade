import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
// add middlware to our store, so that whenever actions get fired from our component
// we can catch them and display them. They are pretty much functions that receive actions in
// order to do something with them and pass them out to the root reducer.
// Redux logger library just catches the action, console logs it, and moves along
import rootReducer from './root-reducer';
const middlewares = [logger];
// we use the spread operator here to pass in multiple values from the array as arguments.
// Allows code to be more scalable when we want to pass multiple arguments into applyMiddleware
const store = createStore(rootReducer, applyMiddleware(...middlewares))
export default store;