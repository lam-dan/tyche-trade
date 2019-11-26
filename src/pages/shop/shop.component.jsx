import React from 'react'
import { Route } from 'react-router-dom'

// Make this component connected to the reducers using react-redux library
import { connect } from 'react-redux'

import WithSpinner from '../../components/with-spinner/with-spinner.component'

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

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
	state = {
		loading: true
	}
	unsubscribeFromSnapshot = null

	componentDidMount() {
		// We destructure the object returned as props to this component
		// with mapDispatchToProps to be used.
		const { updateCollections } = this.props
		const collectionRef = firestore.collection('collections')
		// Whenever the collection updates or when it runs for the first time, run an asychronous function that
		// return a snapshot of each of the collection references
		collectionRef.onSnapshot(async snapshot => {
			const collectionsMap = convertCollectionSnapshotToMap(snapshot)
			// console.log(collectionsMap)
			// console.log(updateCollections)
			updateCollections(collectionsMap)
			this.setState({ loading: false })
			// console.log(snapshot)
		})
	}

	render() {
		const { match } = this.props
		const { loading } = this.state
		return (
			<div className='shop-page'>
				<Route
					exact
					path={`${match.path}`}
					render={props => (
						<CollectionsOverviewWithSpinner
							isLoading={loading}
							{...props}
						/>
					)}
				/>
				<Route
					path={`${match.path}/:collectionId`}
					render={props => (
						<CollectionPageWithSpinner
							isLoading={loading}
							{...props}
						/>
					)}
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
		// dispatch allows payload to be sent over to the store
		// The updateCollections function was imported from the as a shop action
		// It is a function that takes in a collectionsMap
		// and returns an object with the type, and payload of the collectionsMap passed in
		dispatch(updateCollections(collectionsMap))
})

// Using connect we are able to mapDispatchToProps function over to the component as props
// in the form of an object with the updateCollections method where we destructure above to use.
export default connect(null, mapDispatchToProps)(ShopPage)
