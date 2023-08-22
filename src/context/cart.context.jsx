import { createContext, useReducer } from "react"; 

import { createAction } from "../utils/firebase/reducer/reducer.utils";

const clearCartItem = (cartItems, productToClear) => {
    return cartItems.filter(item => item.id !== productToClear.id)
}

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id)

    if (!existingCartItem){
        return cartItems;
    }

    // remove item completley
    if (existingCartItem.quantity == 1){
        return cartItems.filter(item => item.id !== productToRemove.id)
    }

    // Decrement cart item quantity 
    return cartItems.map((cartItem) => cartItem.id === productToRemove.id ?
    {...cartItem, quantity: cartItem.quantity - 1} 
    : cartItem)
}

const addCartItem = (cartItems, productToAdd) => {

    console.log(cartItems);
    console.log(productToAdd);

    const doesCartItemExist = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    // Increment cart item quantity 
    if (doesCartItemExist){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
        {...cartItem, quantity: cartItem.quantity + 1} 
        : cartItem)
    }

    //New cart item
    return [...cartItems, {...productToAdd, quantity: 1}]
}

export const CART_ACTION_TYPES = {
    'SET_IS_CART_OPEN': 'SET_IS_CART_OPEN',
    'SET_CART_ITEM': 'SET_CART_ITEM',
}

const cartReducer = (state, action) =>{
    const {type, payload} = action;

    switch(type){
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen: payload 
            }
        case CART_ACTION_TYPES.SET_CART_ITEM:
            return{
                ...state,
                ...payload,
            }
        default:
            throw new Error(`Unhandled type ${type} in the cartReducer`)
    }
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartTotalPrice: 0,
    cartTotalQuantity: 0,
    cartItems: [],
}

// actual value you want to access
export const CartContext = createContext({
    isCartOpen: false,
    cartTotalQuantity: 0,
    cartTotalPrice: 0,
    cartItems: [],
});

export const CartProvider = ({children}) => {
    const [ state, dispatch ] = useReducer(cartReducer, INITIAL_STATE);

    const { isCartOpen, cartTotalPrice, cartTotalQuantity, cartItems } = state;

    const updateCartItemsReducer = (newCartItems) => {
        const newCartTotalPrice = newCartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);
        const newCartTotalQuantity = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

        dispatch(         
            createAction(
                CART_ACTION_TYPES.SET_CART_ITEM, 
                {
                    cartItems: newCartItems, 
                    cartTotalPrice: newCartTotalPrice, 
                    cartTotalQuantity: newCartTotalQuantity
                })
        )
    }

    const addItemToCart = (productToAdd) => {
        updateCartItemsReducer(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        updateCartItemsReducer(removeCartItem(cartItems, productToRemove));
    }

    const clearItemFromCart = (productToRemove) => {
        updateCartItemsReducer(clearCartItem(cartItems, productToRemove));
    }

    const setIsCartOpen = (bool) => {
        dispatch( createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }

    const value = {
        isCartOpen, 
        cartItems, 
        cartTotalPrice, 
        cartTotalQuantity, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemFromCart, 
        clearItemFromCart};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}