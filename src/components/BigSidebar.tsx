import {NavLinks} from "./index.ts";
import Logo from '../components/Logo';
import Wrapper from '../assets/wrappers/BigSidebar';
import { useSelector } from 'react-redux';
import { RootState } from '../features/store';


function BigSidebar() {
    const { isSidebarOpen } = useSelector((store: RootState) => store.auth);

    return (
        <Wrapper>
            <div
                className={
                    isSidebarOpen
                        ? 'sidebar-container '
                        : 'sidebar-container show-sidebar'
                }
            >
                <div className='content'>
                    <header>
                        <Logo />
                    </header>
                    <NavLinks toggleSidebar={() => undefined}/>
                </div>
            </div>
        </Wrapper>
    );
}

export default BigSidebar;
