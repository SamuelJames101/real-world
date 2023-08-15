import { createContext, useState, useEffect } from "react"; 

const increaseCartItemQuantity = (cartItems, id) => {
    // Increase quantity of product by one.
    return cartItems.map((cartItem) => cartItem.id === id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
}

const decreaseCartItemQuantity = (cartItems, id) => {
    //Filters any items that quantity is less than one and if it has more than one then reduce quantity by one.
    return cartItems.filter(item => item.quantity - 1 > 0 || item.id !== id )
        .map((cartItem) => cartItem.id === id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem);
}

const removeCartItem = (cartItems, id) => {
    //Remove cart item.
    return cartItems.filter(item => item.id !== id)
}

const addCartItem = (cartItems, productToAdd) => {
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
    decreaseItemQuantity: () => {},
    increaseItemQuantity: () => {}
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    useEffect(() => {
        const newCartTotalPrice = cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);
        const newCartTotalQuantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartTotalQuantity(newCartTotalQuantity);
        setCartTotalPrice(newCartTotalPrice);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (id) => {
        setCartItems(removeCartItem(cartItems, id));
    }

    const decreaseItemQuantity = (id) => {
        setCartItems(decreaseCartItemQuantity(cartItems, id));
    }

    const increaseItemQuantity = (id) => {
        setCartItems(increaseCartItemQuantity(cartItems, id));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartTotalPrice, cartTotalQuantity, removeItemFromCart, decreaseItemQuantity, increaseItemQuantity};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}