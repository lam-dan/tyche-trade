import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {

  // We do not need this anymore since we are using Redux to manage state
  // constructor() {
  //   super();
  //   this.state = {
  //     currentUser: null
  //   };
  // }
  unsubscribeFromAuth = null;

  componentDidMount() {

    // Destructure object field off props.
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //Check to see if there is a user authorization when they log in
      if (userAuth) {
        //We store the user data in our database here and await
        // for the returned user reference object getting sent back and store that in userRef
        const userRef = await createUserProfileDocument(userAuth);
        //We store this data in the state of our application so it can
        // be used in our app
        // We are going  to subscribe to that user reference and get back the first state of the data
        userRef.onSnapshot(snapShot => {
          console.log(snapShot);
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
          });
        });
      } else {
        // If user ever logs out, we set the current state of the user to null, user autheticantion will be null
        // in this case.
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  // dispatch allows redux to know that the object passed through is going
  // to be an action object that will be passed to every reducer.
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
