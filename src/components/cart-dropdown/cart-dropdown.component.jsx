import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { CartContext } from '../../context/cart.context'

import Button from '../button/button.component'

import CartItem from '../cart-item/cart-item.component'

import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles.jsx'

const CartDropdown = () => {
    const navigate = useNavigate();
    const {cartItems, setIsCartOpen } = useContext(CartContext);

    const navigateToCheckout = () => {
        navigate('/checkout');
        setIsCartOpen(false);
    };

    return(
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (cartItems.map(item => (
                        <CartItem key={item.id} cartItem={item}/> 
                        ))) : <EmptyMessage>Your cart is empty</EmptyMessage>
                }
            </CartItems>

            <Button onClick={navigateToCheckout}>GO TO CART</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;