// A reducer is just a function that gets 2 properties
// Gets state object which represents the last state or an initial state which is just an object
// that represents what we're trying to store.
// Then it receives an action. That action is just a type which is a string type that tells you
// What specific value it is.
const INITIAL_STATE = {
  currentUser: null
};

// If state is not found, it will leverage this intial state here, where currentUser is null.
// Null is considered a value.
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload
      };

    default:
      return state;
  }
};

export default userReducer;

