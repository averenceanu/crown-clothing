import { useContext } from 'react';
import { CartContext } from '../../context/card.context';
import {ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles.js';

const CartIcon = () => {
  const {isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

  return (
    <CartIconContainer>
      <ShoppingIcon onClick={toggleIsCartOpen}/>
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;