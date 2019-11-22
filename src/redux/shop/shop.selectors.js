import { createSelector } from 'reselect'

const selectShop = state => state.shop

export const selectCollections = createSelector(
	[selectShop],
	shop => shop.collections
)

// We then map over the collections by selecting it and passing it into our new selectCollection function
// the new URL parameters which is a string and returns createSelector
// Curried function - a function that returns another function
// createSelector returns pretty much returns the the new state we run a function on it

export const selectCollectionsForPreview = createSelector(
	[selectCollections],
	collections => Object.keys(collections).map(key => collections[key])
)

export const selectCollection = collectionUrlParam =>
	createSelector(
		[selectCollections],
		collections => collections[collectionUrlParam]
	)
