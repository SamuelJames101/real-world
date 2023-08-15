import { createContext, useState, useEffect } from "react"; 

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
    setCartTotalQuantity: () => {},
    cartItems: [],
    setCartItems: () => {},
    addItemToCart: () => {}
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotalQuantity, setCartTotalQuantity] = useState(0);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartTotalQuantity(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartTotalQuantity};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}