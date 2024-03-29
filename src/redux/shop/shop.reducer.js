import ShopActionTypes from './shop.types'

const INITIAL_STATE = {
	collections: null,
	isFetching: false,
	errorMessage: undefined
}

const shopReducer = (state = INITIAL_STATE, action) => {
	// Action is coming from the shop actions
	// action.type brings in ShopAtionTypes.UPDATE_COLLECTIONS
	// which is 'UPDATE_COLLECTIONS'
	switch (action.type) {
		case ShopActionTypes.FETCH_COLLECTIONS_START:
			return {
				...state,
				isFetching: true
			}
		case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
			return {
				...state,
				isFetching: false,
				collections: action.payload
			}
		case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload
			}
		default:
			return state
	}
}

export default shopReducer
