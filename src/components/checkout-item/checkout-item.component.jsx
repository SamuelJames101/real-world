import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import './checkout-item.styles.scss'

const CheckoutItem = ({product}) => {
    const {decreaseItemQuantity, increaseItemQuantity, removeItemFromCart} = useContext(CartContext);
    const {imageUrl, name, price, quantity, id} = product;

    const decreaseQuantity = () => decreaseItemQuantity(id);

    const increaseQuantity = () => increaseItemQuantity(id);

    const removeProduct = () => removeItemFromCart(id);

    return(
        <div>
            <img className='image-container' src={imageUrl} alt={name}/>
            <h5 className='name'>{name}</h5>
            <div>
                <span className='arrow' onClick={decreaseQuantity}>{"<"}</span>
                <span className='quantity'>{quantity}</span>
                <span className='arrow' onClick={increaseQuantity}>{">"}</span>
            </div>
            <span className='price'>{price}</span>
            <span className='remove-button' onClick={removeProduct}>X</span>
        </div>
    )
}

export default CheckoutItem;