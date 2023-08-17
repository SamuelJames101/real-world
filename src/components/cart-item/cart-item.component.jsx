import {CartItemContainer, Name, ItemDetails, Price} from './cart-item.styles.jsx'

const CartItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity } = cartItem;
    return(
        <CartItemContainer>
            <img src={imageUrl} alt={name} />
            <ItemDetails>
                <Name>{name}</Name>
                <Price>{quantity} x ${price}</Price>
            </ItemDetails>
        </CartItemContainer>
    )
}

export default CartItem;