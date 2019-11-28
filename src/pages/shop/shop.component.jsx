import React from 'react'
import { Route } from 'react-router-dom'

// Make this component connected to the reducers using react-redux library
import { connect } from 'react-redux'

// Import in the actions to this component.
// Update collections is a function that takes a collectionMap arguemnt
// and returns the type and payload which contains the collcetionMap object
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions'

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container'
import CollectionPageContainer from '../collection/collection.container'

class ShopPage extends React.Component {
	componentDidMount() {
		const { fetchCollectionsStartAsync } = this.props
		fetchCollectionsStartAsync()
	}

	render() {
		const { match } = this.props
		return (
			<div className='shop-page'>
				<Route
					exact
					path={`${match.path}`}
					component={CollectionsOverviewContainer}
				/>
				<Route
					path={`${match.path}/:collectionId`}
					component={CollectionPageContainer}
				/>
			</div>
		)
	}
}

// Create  mapDispatchToProps function which takes in a dispatch argument
// and returns a object that contains a key updateCollections
const mapDispatchToProps = dispatch => ({
	fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

// Using connect we are able to mapDispatchToProps function over to the component as props
// in the form of an object with the updateCollections method where we destructure above to use.
export default connect(null, mapDispatchToProps)(ShopPage)
