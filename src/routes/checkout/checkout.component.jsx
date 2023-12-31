import { useSelector } from 'react-redux';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import PaymentForm from '../../components/payment-form/payment-form.component';
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles.jsx';

import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector'

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotalPrice = useSelector(selectCartTotal);

    return(
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span >Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>    
            </CheckoutHeader>

            {cartItems.map( (cartItem) => (       
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            ))}
            <PaymentForm />
            <Total>Total: £{cartTotalPrice}</Total>

        </CheckoutContainer>
    )
}

export default Checkout;