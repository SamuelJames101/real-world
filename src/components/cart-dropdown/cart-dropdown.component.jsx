import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { CartContext } from '../../context/cart.context'

import Button from '../button/button.component'

import CartItem from '../cart-item/cart-item.component'

import './cart-dropdown.styles.scss'

const CartDropdown = () => {
    const navigate = useNavigate();
    const {cartItems, setIsCartOpen } = useContext(CartContext);

    const navigateToCheckout = () => {
        navigate('/checkout');
        setIsCartOpen(false);
    };

    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
               {cartItems.map(item => (
                <CartItem key={item.id} cartItem={item}/> 
                ))}
            </div>

            <Button onClick={navigateToCheckout}>GO TO CART</Button>
        </div>
    )
}

export default CartDropdown;