import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent  as WorldLogo} from '../../assets/WorldLogo.svg';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { CartContext } from '../../context/cart.context';
import { UserContext } from '../../context/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import {NavigationContainer, LogoContainer, NavLinks, NavLink} from './navigation.styles.jsx'

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    
    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <WorldLogo className='logo' />
            </LogoContainer>
            
            <NavLinks>
                <Link className='nav-link' to='/shop'>
                    SHOP
                </Link>

                {currentUser ? (
                        <NavLink as='span' onClick={signOutUser}>
                            SIGN OUT
                        </NavLink> )
                        : ( 
                        <NavLink to='/auth'>
                            SIGN IN 
                        </NavLink>
                )}

                <CartIcon/>
            </NavLinks>

            {isCartOpen && 
                <CartDropdown />
            }        
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    );
}

export default Navigation;