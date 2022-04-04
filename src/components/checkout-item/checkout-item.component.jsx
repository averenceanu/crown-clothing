import { useContext  } from 'react';
import { CartContext } from '../../context/card.context'; 
import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton
} from './checkout-item.styles';

const CheckoutItem = ({cartItem}) => {

  const {clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext)

  const {name, price, imageUrl, quantity} = cartItem;

  const clearItemHandle= () => clearItemFromCart(cartItem);
  const addItemHandle= () => addItemToCart(cartItem);
  const removeItemHandle= () => removeItemFromCart(cartItem);
  
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandle}>&#10094;</Arrow>
        <Value className='value'>{quantity}</Value>
        <Arrow className='arrow' onClick={addItemHandle}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={clearItemHandle}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem;