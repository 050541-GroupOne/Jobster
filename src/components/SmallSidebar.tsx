import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import { useSelector, useDispatch } from 'react-redux';
import {toggleSidebar} from "../features/auth/slice.ts";
import {NavLinks} from "./index.ts";
import {RootState} from "../features/store.ts";

function SmallSidebar() {
    const { isSidebarOpen } = useSelector((store: RootState) => store.auth);
    const dispatch = useDispatch();

    const toggle = () => {
        dispatch(toggleSidebar());
    };

    return (
        <Wrapper>
            <div className={isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
                <div className='content'>
                    <button
                        className='close-btn'
                        onClick={toggle}>
                        <FaTimes />
                    </button>
                    <header>
                        <Logo />
                    </header>
                    <NavLinks toggleSidebar={toggle} />
                </div>
            </div>
        </Wrapper>
    );
}

export default SmallSidebar;
