import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent  as WorldLogo} from '../../assets/WorldLogo.svg';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { signOutStart } from '../../store/user/user.action';

import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

import {NavigationContainer, LogoContainer, NavLinks, NavLink} from './navigation.styles.jsx'

const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

    const signOut = () => dispatch(signOutStart());

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
                        <NavLink as='span' onClick={signOut}>
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