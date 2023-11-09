import { useState } from "react";
<<<<<<< HEAD
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../features/store.ts";
=======
import { useDispatch } from "react-redux";
import {AppDispatch} from "../features/store.ts";
>>>>>>> 32287c530e9bf3eb4bb68fb3dd581aa46683ef3d
import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from './Logo';
import {toggleSidebar} from "../features/auth/slice.ts";
import {logoutUser} from "../features/auth/slice";


function Navbar() {
    const dispatch = useDispatch<AppDispatch>();
    const [showLogout, setShowLogout] = useState(false);
<<<<<<< HEAD
    const {user} = useSelector((state: RootState) => state.auth);
=======
>>>>>>> 32287c530e9bf3eb4bb68fb3dd581aa46683ef3d

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
<<<<<<< HEAD
                        {user?.name}
=======
                        {/*{user?.name}*/}
>>>>>>> 32287c530e9bf3eb4bb68fb3dd581aa46683ef3d
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
