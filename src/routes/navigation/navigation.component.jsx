import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';
import { UserContext } from '../../context/user.context';

const Navigation = () => {

  const { currentUser} = useContext(UserContext)
 
  return (
    <Fragment>
      <div className='navigation'>
        <Link to='/' className='logo-container'><CrwnLogo /></Link>
        <div className='nav-links-container'>
            <Link className='nav-link' to='/shop'> SHOP </Link>
            { currentUser ? 
              (<Link className='nav-link' to='/sign-in'> SIGN OUT </Link>) : 
              (<Link className='nav-link' to='/sign-in'> SIGN IN </Link>) 
            }
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}
export default Navigation; 