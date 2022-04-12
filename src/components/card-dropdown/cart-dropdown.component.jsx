import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CartDropDownContainer,
  EmptyMessage,
  CartItems,
} from "./card-dropdown.styles";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../store/cart/cart.selector";

const CartDropDown = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <CartDropDownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem cartItem={item} key={item.id} />)
        ) : (
          <EmptyMessage>Your card is empty</EmptyMessage>
        )}
      </CartItems>
      <Button buttonType="inverted" onClick={goToCheckoutHandler}>
        CHECKOUT
      </Button>
    </CartDropDownContainer>
  );
};

export default CartDropDown;
