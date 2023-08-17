import { useContext } from 'react';

import  { CartContext } from '../../context/cart.context'

import {CardIconContainer, ShoppingIcon, ItemCount} from './cart-icon.styles.jsx'

const CartIcon = () => {

    const {isCartOpen, setIsCartOpen, cartTotalQuantity } = useContext(CartContext);

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    return(
        <CardIconContainer onClick={toggleCart}>
            <ShoppingIcon />
            <ItemCount>{cartTotalQuantity}</ItemCount>
        </CardIconContainer>
    )
}

export default CartIcon;