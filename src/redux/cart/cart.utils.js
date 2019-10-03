export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    );
    //If I can find that the Cart Item exists then for each of the cartItems, 
    // If the cartItem's id matches the cartItemToAdd's id, then I'm going to return an array of objects with the cartitem properties,
    // and the quantity property increased by 1, else I'm going to return just the cartItem with no change
    if (existingCartItem) {
        return cartItems.map(cartItem => cartItem.id === cartItemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
    }
    //If the cartItem does not exist then on the first click, i'm going to return an array of the cartItem properties and 
    // an object that contains the cartItemToAdd properties and a quantity of 1
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
} 

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    )

    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    return cartItems.map(
        cartItem =>
        cartItem.id === cartItemToRemove.id ?
        {...cartItem, quantity:cartItem.quantity -1} :
        cartItem
    )

}