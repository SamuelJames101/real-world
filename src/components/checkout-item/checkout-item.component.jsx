import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import {CheckoutItemContainer, ImageContainer, Name, Quantity, Arrow, Price, RemoveButton, Value} from './checkout-item.styles.jsx'

const CheckoutItem = ({cartItem}) => {
    const {addItemToCart, removeItemFromCart, clearItemFromCart} = useContext(CartContext);
    const {imageUrl, name, price, quantity, id} = cartItem;

    const addProduct = () => addItemToCart(cartItem);
    const removeProduct = () => removeItemFromCart(cartItem);
    const clearProduct = () => clearItemFromCart(cartItem);

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