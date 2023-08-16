import { createContext, useState, useEffect } from "react"; 

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
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

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