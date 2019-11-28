import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors'
import WithSpinner from '../with-spinner/with-spinner.component'
import CollectionsOverview from './collections-overview.component'
import { compose } from 'redux'

const mapStateToProps = createStructuredSelector({
	isLoading: selectIsCollectionFetching
})

// Compose is basically currying all our functions together, evaluates from right to left
// passing in one argument at a time from right to left.
const CollectionsOverviewContainer = compose(
	connect(mapStateToProps),
	WithSpinner
)(CollectionsOverview)

export default CollectionsOverviewContainer
