import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
	apiKey: 'AIzaSyDsH14CQBSCngw1WRHVXdchyEHCFVGQBgI',
	authDomain: 'tyche-trade-db.firebaseapp.com',
	databaseURL: 'https://tyche-trade-db.firebaseio.com',
	projectId: 'tyche-trade-db',
	storageBucket: '',
	messagingSenderId: '116728161161',
	appId: '1:116728161161:web:7bc4c7aee5000c37'
}

firebase.initializeApp(config)

export const createUserProfileDocument = async (userAuth, additionalData) => {
	// console.log(userAuth)
	if (!userAuth) return
	const userRef = firestore.doc(`users/${userAuth.uid}`)
	// const collectionRef = firestore.collection('users')
	// console.log(userRef)

	const snapShot = await userRef.get()
	// const collectionSnapshot = await collectionRef.get()
	// console.log(collectionSnapshot)
	// console.log({ collection: collectionSnapshot.docs.map(doc => doc.data()) })
	// console.log(snapShot)

	//snapShot of the user authentication object does not exist
	if (!snapShot.exists) {
		// we will create a new user with today's date
		const { displayName, email } = userAuth
		const createdAt = new Date()

		//We will set it on the document using the set method
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			})
		} catch (error) {
			console.log('error creating user', error.message)
		}
	}
	// We return user reference once the document object has been created
	return userRef
}

// Firebase will make this collection ref object for us whether it exists or not.
export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = firestore.collection(collectionKey)
	// Creating a batch so that we can predictably fail a whole banch if one of them fail.
	// Makes creating object much more predictable opposed to passing each object one by one and having a connection
	// fail in the middle of the processing.
	const batch = firestore.batch()
	objectsToAdd.forEach(obj => {
		const newDocRef = collectionRef.doc()
		batch.set(newDocRef, obj)
	})
	// Returns a promise, on success, it returns a void or null value.
	return await batch.commit()
}

// Convert each collection ref snapshot to an object with title and items, and returns
// a new obect with the title, title, items, and doc id back to the original component that
// called it.  In this case, it would be the shop component.
export const convertCollectionSnapshotToMap = collections => {
	const transformedCollection = collections.docs.map(doc => {
		const { title, items } = doc.data()
		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items
		}
	})
	// console.log(transformedCollection)
	// console.log(transformedCollection[0])
	// For each element in the transformedCollection array, we create a new collection object with keys
	// using the object's titles and we return these objects to be added to the initial value of an object {}
	return transformedCollection.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection
		console.log(accumulator)
		console.log(collection)
		return accumulator
	}, {})
	// console.log(x)
	// console.log(x['mens'])
	// console.log(transformedCollection)
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
