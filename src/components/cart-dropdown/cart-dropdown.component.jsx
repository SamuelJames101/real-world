import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Button from '../button/button.component'

import CartItem from '../cart-item/cart-item.component'

import { setIsCartOpen } from '../../store/cart/cart.action'
import { selectCartItems } from '../../store/cart/cart.selector'

import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles.jsx'

const CartDropdown = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems);
    
    const navigateToCheckout = () => {
        navigate('/checkout');
        dispatch(setIsCartOpen(false));
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