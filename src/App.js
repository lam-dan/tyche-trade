import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './App.css'

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout/checkout.component'

import Header from './components/header/header.component'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'

import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selectors'

class App extends React.Component {
	unsubscribeFromAuth = null
	// We do not need this anymore since we are using Redux to manage state
	// constructor() {
	//   super();
	//   this.state = {
	//     currentUser: null
	//   };
	// }
	componentDidMount() {
		// Destructure object field off this.props so we can go ahead and the key value pair
		// setCurrentUser and pass in the new state user object as oppsoed to this.props.setCurrentUser()
		const { setCurrentUser } = this.props

		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			//Check to see if there is a user authorization when they log in
			if (userAuth) {
				//We store the user data in our database here and await
				// for the returned user reference object getting sent back and store that in userRef
				const userRef = await createUserProfileDocument(userAuth)
				//We store this data in the state of our application so it can
				// be used in our app
				// We are going  to subscribe to that user reference and get back the first state of the data
				userRef.onSnapshot(snapShot => {
					// We are going to set state on that snapshot data
					// setState is asynchronous so console log has to be in the callback
					// this.setState({
					//   currentUser: {
					//     id: snapShot.id,
					//     ...snapShot.data()
					//   }
					// });
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data()
					})
				})
			}
			setCurrentUser(userAuth)
		})
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth()
	}

	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route path='/shop' component={ShopPage} />
					<Route exact path='/checkout' component={CheckoutPage} />
					<Route
						exact
						path='/signin'
						render={() =>
							this.props.currentUser ? (
								<Redirect to='/' />
							) : (
								<SignInAndSignUpPage />
							)
						}
					/>
				</Switch>
			</div>
		)
	}
}

// We are taking state from the root-reducer nad passing in the user key
// which contains the userReducer, and in the userReducer we have the currentUser
// as the INITIAL_STATE being null
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
})

// dispatch allows redux to know that the object passed through is going
// to be an action object that will be passed to every reduce

// Dispatch is a function that gets a dispatch property and returns an object where
// the prop name will be a prop we want to pass in that dispatches the new action
// we're trying to pass which is 'SET_CURRENT_USER'
const mapDispatchToProps = dispatch => ({
	// On the left hand side are props we want to pass into the app component
	// The right is a function that gets the user object and then calls dispatchs
	// on each of those user objects and sends them over to all reducers.
	setCurrentUser: user => dispatch(setCurrentUser(user))
})

// Connect is a higher order component that takes in another component and return
// a powered up component.
// Passing mapStateToProps we are getting that current user null value as
// being passed App component.
export default connect(
	// we pass mapStateToProps to connect so that App.js has access to this.props.current.user
	mapStateToProps,
	mapDispatchToProps
)(App)
