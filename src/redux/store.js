import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

// add middlware to our store, so that whenever actions get fired from our component
// we can catch them and display them. They are pretty much functions that receive actions in
// order to do something with them and pass them out to the root reducer.
// Redux logger library just catches the action, console logs it, and moves along
import rootReducer from './root-reducer'
const middlewares = [thunk]

if (process.env.NODE_ENV === 'development') {
	middlewares.push(logger)
}

// we use the spread operator here to pass in multiple values from the array as arguments.
// Allows code to be more scalable when we want to pass multiple arguments into applyMiddleware
export const store = createStore(rootReducer, applyMiddleware(...middlewares))
export const persistor = persistStore(store)

export default { store, persistor }
