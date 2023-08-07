import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent  as WorldLogo} from '../../assets/WorldLogo.svg';

import './navigation.styles.scss'

const Navigation = () => {
    return (
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <WorldLogo className='logo' />
            </Link>
            <div className='nav-links-container'>
                <Link className='nav-link' to='/auth'>
                    Sign In
                </Link> 
            </div>
        </div>
        <Outlet/>
      </Fragment>
    );
}

export default Navigation;