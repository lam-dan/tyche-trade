// A reducer is just a function that gets 2 properties
// Gets state object which represents the last state or an initial state which is just an object
// that represents what we're trying to store.
// Then it receives an action. That action is just a type which is a string type that tells you
// What specific value it is.
import { UserActionTypes} from './user.types'


const INITIAL_STATE = {
  currentUser: null
};

// userReducer is aa function that gets some state and action and returns the new state
// State arugment is going to be something that the redux store is going to pass to the userReducer
// whenver an action fires.  The state will be whatever the state is currently when the action gets fired.
// So when we fire the state for the first time, it's going to be null as indicated above.
// After the intial state, any subsequent actions will trigger a new state change, so this function
// returns a new state object that will allow React to render the DOM.

// Switch statement is such that based on the action.type value, if the case is such that the 
// the action.type is equal to UserActionTypes.SET_CURRENT_USER, then we'll return an new state object,
// otherwise, by default we will go ahead and return the original state

// Caveat is that every single reducer gets every single action that ever gets fired.  Even if those actions, 
// are not related to this reducer, so that's the reason we want to default return the state, in case none of 
// the action types match, then we just want to return the original state
const userReducer = (state = INITIAL_STATE, action) => {
  // console.log(state,action)
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        // Spread everything else already on the state
        ...state,
        // New state values from the action.payload
        currentUser: action.payload
      };

    default:
      return state;
  }
};

// console.log(userReducer);

export default userReducer;

