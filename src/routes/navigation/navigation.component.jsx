import { Outlet, Link } from 'react-router-dom';
import { Fragment } from 'react';


const Navigation = () => {
  return (
    <Fragment>
      <div className='navigation'>
      <Link to='/' className='logo-container'>
        <div>Logo</div>
      </Link>
      <div className='nav-links-container'></div>
          <Link className='nav-links' to='/shop'> SHOP </Link>
      </div>
      <Outlet />
    </Fragment>
  )
}
export default Navigation;