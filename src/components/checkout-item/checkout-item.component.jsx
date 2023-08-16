import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import './checkout-item.styles.scss'

const CheckoutItem = ({cartItem}) => {
    const {addItemToCart, removeItemFromCart, clearItemFromCart} = useContext(CartContext);
    const {imageUrl, name, price, quantity, id} = cartItem;

    const addProduct = () => addItemToCart(cartItem);
    const removeProduct = () => removeItemFromCart(cartItem);
    const clearProduct = () => clearItemFromCart(cartItem);

    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name}/>
            </div>

            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeProduct}>
                    &#10094;
                </div>
                <span className='value'>
                     {quantity}
                </span>
                <div className='arrow' onClick={addProduct}>
                    &#10095;
                </div>
            </span>
            <span className='price'>{price}</span>

            <div className='remove-button' onClick={clearProduct}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;