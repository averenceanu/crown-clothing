import { useContext } from 'react';
import './card-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../context/card.context';

const CartDropDown = () => {

  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map(item => <CartItem cartItem={item} key={item.id}/>)}
      </div>
      <Button buttonType='inverted'>GO TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropDown; 