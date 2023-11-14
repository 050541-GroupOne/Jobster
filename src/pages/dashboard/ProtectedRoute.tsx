import { Navigate } from 'react-router-dom';
import {ReactNode} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../features/store.ts";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated }  = useSelector((state: RootState) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to='/landing' />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
