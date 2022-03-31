import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../context/user.context';
import { CartContext } from '../../context/card.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/card-dropdown/cart-dropdown.component';
import './navigation.styles.scss';

const Navigation = () => {

  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  const singOutHandler = async () => {
   await signOutUser();
  }
 
  return (
    <Fragment>
      <div className='navigation'>
        <Link to='/' className='logo-container'><CrwnLogo /></Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'> SHOP </Link>
          { currentUser ? 
            (<span className='nav-link' onClick={singOutHandler}>SIGN OUT</span>) : 
            (<Link className='nav-link' to='/sign-in'> SIGN IN </Link>) 
          }
          <CartIcon />
        </div>
        {isCartOpen &&  <CartDropDown />}
      </div>
      <Outlet />
    </Fragment>
  )
}
export default Navigation; 