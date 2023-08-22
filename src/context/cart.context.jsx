import { clear } from "@testing-library/user-event/dist/clear";
import { createContext, useReducer, useEffect } from "react"; 

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
    'TOGGLE_CART': 'TOGGLE_CART',
    'ADD_CART_ITEM': 'ADD_CART_ITEM',
    'REMOVE_CART_ITEM': 'REMOVE_CART_ITEM',
    'CLEAR_CART_ITEM': 'CLEAR_CART_ITEM'
}

const cartReducer = (state, action) =>{
    const {type, payload} = action;

    switch(type){
        case CART_ACTION_TYPES.TOGGLE_CART:
            return{
                ...state,
                isCartOpen: !state.isCartOpen
            }
        case CART_ACTION_TYPES.ADD_CART_ITEM:
            return{
                ...state,
                cartItems: addCartItem(),
                cartTotalQuantity: state.cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0),
                cartTotalPrice: state.cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0),
            }
        case CART_ACTION_TYPES.REMOVE_CART_ITEM:
            return{
                ...state,
                cartItems: removeCartItem(),
                cartTotalQuantity: state.cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0),
                cartTotalPrice: state.cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0),
            }
        case CART_ACTION_TYPES.CLEAR_CART_ITEM:
            return{
                ...state,
                cartItems: clearCartItem(),
                cartTotalQuantity: state.cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0),
                cartTotalPrice: state.cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0),
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
    setIsCartOpen: () => {},
    cartTotalQuantity: 0,
    cartTotalPrice: 0,
    setCartTotalQuantity: () => {},
    setCartTotalPrice: () => {},
    cartItems: [],
    setCartItems: () => {},
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
});

export const CartProvider = ({children}) => {
    const [ state, dispatch ] = useReducer(cartReducer, INITIAL_STATE);

    const { isCartOpen, cartTotalPrice, cartTotalQuantity, cartItems } = state;

    const setCartTotalPrice = (newCartTotalPrice) => {
        dispatch({type: CART_ACTION_TYPES.SET_CURRENT_USER, payload: newCartTotalPrice})
    }

    const setCartTotalQuantity = (newCartTotalPrice) => {
        dispatch({type: CART_ACTION_TYPES.SET_CURRENT_USER, payload: newCartTotalPrice})
    }

    const addItemToCart = (newCartTotalPrice) => {
        dispatch({type: CART_ACTION_TYPES.SET_CURRENT_USER, payload: newCartTotalPrice})
    }

    useEffect(() => {
        const newCartTotalPrice = cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);
        setCartTotalPrice(newCartTotalPrice);
    }, [cartItems])

    useEffect(() => {
        const newCartTotalQuantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartTotalQuantity(newCartTotalQuantity);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const clearItemFromCart = (productToRemove) => {
        setCartItems(clearCartItem(cartItems, productToRemove));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartTotalPrice, cartTotalQuantity, removeItemFromCart, clearItemFromCart};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}