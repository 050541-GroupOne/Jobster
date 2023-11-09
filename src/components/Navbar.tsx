import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../features/store.ts";
import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from './Logo';
import {toggleSidebar} from "../features/auth/slice.ts";
import {logoutUser} from "../features/auth/slice";


function Navbar() {
    const dispatch = useDispatch<AppDispatch>();
    const [showLogout, setShowLogout] = useState(false);
    const {user} = useSelector((state: RootState) => state.auth);

    const toggle = () => {
        dispatch(toggleSidebar());
    }

    return (
        <Wrapper>
            <div className='nav-center'>
                <button type='button' className='toggle-btn' onClick={toggle}>
                    <FaAlignLeft />
                </button>
                <div>
                    <Logo />
                    <h3 className='logo-text'>dashboard</h3>
                </div>
                <div className='btn-container'>
                    <button
                        type='button'
                        className='btn'
                        onClick={() => setShowLogout(!showLogout)}
                    >
                        <FaUserCircle />
                        {user?.name}
                        <FaCaretDown />
                    </button>
                    <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                        <button
                            type='button'
                            className='dropdown-btn'
                            onClick={() => dispatch(logoutUser())}
                        >
                            logout
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

export default Navbar;
