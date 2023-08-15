import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

import './checkout.styles.scss';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const Checkout = () => {
    const { cartItems, cartTotalPrice } = useContext(CartContext);

    return(
        <div className='checkout-container'>
            <div className='checkout-header'>
                <span className='header-block'>Product</span>
                <span className='header-block'>Description</span>
                <span className='header-block'>Quantity</span>
                <span className='header-block'>Price</span>
                <span className='header-block'>Remove</span>
            </div>

            <div>
                {cartItems.map( (cartItem) => (       
                    <CheckoutItem key={cartItem.id} product={cartItem} />
                ))}
                <h1 className='total'>Total: £{cartTotalPrice}</h1>
            </div>

        </div>
    )
}

export default Checkout;