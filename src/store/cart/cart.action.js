import { createAction } from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES } from './cart.types';

const addCartItem = (cartItems, cartItemToAdd) => {
    const doesCartItemExist = cartItems.find((cartItem) => cartItem.id === cartItemToAdd.id)

    // Increment cart item quantity 
    if (doesCartItemExist){
        return cartItems.map((cartItem) => cartItem.id === cartItemToAdd.id ?
        {...cartItem, quantity: cartItem.quantity + 1} 
        : cartItem)
    }

    //New cart item
    return [...cartItems, {...cartItemToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

    if (!existingCartItem){
        return cartItems;
    }

    // remove item completley
    if (existingCartItem.quantity === 1){
        return cartItems.filter(item => item.id !== cartItemToRemove.id)
    }

    // Decrement cart item quantity 
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ?
    {...cartItem, quantity: cartItem.quantity - 1} 
    : cartItem)
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(item => item.id !== cartItemToClear.id)
}

export const addItemToCart = (cartItems, cartItemToAdd) => {
    const newCartItems = addCartItem(cartItems, cartItemToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const setIsCartOpen = (boolean) => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
}