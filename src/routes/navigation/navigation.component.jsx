import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../context/user.context';
import { CartContext } from '../../context/card.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/card-dropdown/cart-dropdown.component';
import {NavigationContainer, LogoContainer, NavLinksContainer, NavLink} from './navigation.styles';

const Navigation = () => {

  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  const singOutHandler = async () => {
   await signOutUser();
  }
 
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'><CrwnLogo /></LogoContainer>
        <NavLinksContainer>
          <NavLink to='/shop'> SHOP </NavLink>
          { currentUser ? 
            (<NavLink as='span' onClick={singOutHandler}>SIGN OUT</NavLink>) : 
            (<NavLink  to='/sign-in'> SIGN IN </NavLink>) 
          }
          <CartIcon />
        </NavLinksContainer>
        {isCartOpen &&  <CartDropDown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}
export default Navigation; 