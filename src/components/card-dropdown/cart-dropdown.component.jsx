import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './card-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../context/card.context';

const CartDropDown = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  }

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map(item => <CartItem cartItem={item} key={item.id}/>)}
      </div>
      <Button buttonType='inverted' onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </div>
  )
}

export default CartDropDown; 