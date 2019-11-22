import React from 'react'
import { Route } from 'react-router-dom'

// Make this component connected to the reducers using react-redux library
import { connect } from 'react-redux'

// Import in the actions to this component.
// Update collections is a function that takes a collectionMap arguemnt
// and returns the type and payload which contains the collcetionMap object
import { updateCollections } from '../../redux/shop/shop.actions'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'
import {
	firestore,
	convertCollectionSnapshotToMap
} from '../../firebase/firebase.utils'

class ShopPage extends React.Component {
	unsubscribeFromSnapshot = null

	componentDidMount() {
		const { updateCollections } = this.props
		const collectionRef = firestore.collection('collections')
		// Whenever the collection updates or when it runs for the first time, run an asychronous function that
		// return a snapshot of each of the collection references
		collectionRef.onSnapshot(async snapshot => {
			const collectionsMap = convertCollectionSnapshotToMap(snapshot)
			console.log(collectionsMap)
			updateCollections(collectionsMap)
			// console.log(snapshot)
		})
	}

	render() {
		const { match } = this.props
		return (
			<div className='shop-page'>
				<Route
					exact
					path={`${match.path}`}
					component={CollectionsOverview}
				/>
				<Route
					path={`${match.path}/:collectionId`}
					component={CollectionPage}
				/>
			</div>
		)
	}
}

// Create  mapDispatchToProps function which takes in a dispatch argument
// and returns a object that contains a key updateCollections
const mapDispatchToProps = dispatch => ({
	// updateCollections key and it's value is a function that takes in a collectionsMap object
	updateCollections: collectionsMap =>
		// and runs the dispatch method on the updateCollections function
		// updateCollections is a function that takes in a collectionsMap
		// and returns an object with the type, and payload of the collectionsMap passed in
		dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage)
