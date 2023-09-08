import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector.js';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.action.js';

import {CheckoutItemContainer, ImageContainer, Name, Quantity, Arrow, Price, RemoveButton, Value} from './checkout-item.styles.jsx'

const CheckoutItem = ({cartItem}) => {
    const {imageUrl, name, price, quantity, id} = cartItem;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems)

    const addProduct = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeProduct = () => dispatch(removeItemFromCart(cartItems, cartItem));
    const clearProduct = () => dispatch(clearItemFromCart(cartItems, cartItem));

    return(
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name}/>
            </ImageContainer>

            <Name>{name}</Name>
            <Quantity>
                <Arrow onClick={removeProduct}>
                    &#10094;
                </Arrow>
                <Value>
                     {quantity}
                </Value>
                <Arrow className='arrow' onClick={addProduct}>
                    &#10095;
                </Arrow>
            </Quantity>
            <Price>{price}</Price>

            <RemoveButton onClick={clearProduct}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;