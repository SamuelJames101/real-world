import { useSelector, useDispatch } from 'react-redux';

import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action'; 

import {CardIconContainer, ShoppingIcon, ItemCount} from './cart-icon.styles.jsx'

const CartIcon = () => {
    const dispatch = useDispatch();

    const isCartOpen = useSelector(selectIsCartOpen);
    const cartTotalQuantity = useSelector(selectCartCount); 

    const toggleCart = () => dispatch(setIsCartOpen(!isCartOpen));

    return(
        <CardIconContainer onClick={toggleCart}>
            <ShoppingIcon />
            <ItemCount>{cartTotalQuantity}</ItemCount>
        </CardIconContainer>
    )
}

export default CartIcon;