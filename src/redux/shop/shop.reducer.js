import SHOP_DATA from './shop.data'
import ShopActionTypes from './shop.types'

const INITIAL_STATE = {
	collections: SHOP_DATA
}

const shopReducer = (state = INITIAL_STATE, action) => {
	// Action is coming from the shop actions
	// action.type brings in ShopAtionTypes.UPDATE_COLLECTIONS
	// which is 'UPDATE_COLLECTIONS'
	switch (action.type) {
		// Imported the ShopAtionTypes to match the strings from the action
		case ShopActionTypes.UPDATE_COLLECTIONS:
			// Return object with original key values from original state, and
			// collections key with values from the action's payload
			// action.payload contains the collectionsMap object that
			// that was passed into the function
			return {
				...state,
				collections: action.payload
			}
		default:
			return state
	}
}

export default shopReducer
