import React from 'react'

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles'

// WithSpinner function which takes in a component and returns a new functional component
// The component passed in, we will destructure it's properties such as isLoading and other props
// so that we can do a boolean check on isLoading to determine what component to render, the Spinner Overlay
// with the Spinner Container or just the wrapped component with the rest of it's properties.

// const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
// 	return isLoading ? (
// 		<SpinnerOverlay>
// 			<SpinnerContainer />
// 		</SpinnerOverlay>
// 	) : (
// 		<WrappedComponent {...otherProps} />
// 	)
// }

// Another way of writing the above
const WithSpinner = WrappedComponent => {
	const Spinner = ({ isLoading, ...otherProps }) => {
		return isLoading ? (
			<SpinnerOverlay>
				<SpinnerContainer />
			</SpinnerOverlay>
		) : (
			<WrappedComponent {...otherProps} />
		)
	}
	return Spinner
}

export default WithSpinner
