import { BrowserRouter, Route, Routes } from "react-router-dom";
import {  Error, Landing, Register } from "./pages";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AddJob, AllJobs, Profile, SharedLayout, Stats } from "./pages/dashboard";
import ProtectedRoute from "./pages/dashboard/ProtectedRoute.tsx";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {setAuthenticated, setUser} from "./features/auth/slice.ts";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setAuthenticated(true));
                dispatch(setUser(user));
            } else {
                dispatch(setAuthenticated(false));
                dispatch(setUser(null));
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                    <SharedLayout/>
                    </ProtectedRoute>
                }>
                    <Route index element={<Stats />} />
                    <Route path='all-jobs' element={<AllJobs />} />
                    <Route path='add-job' element={<AddJob />} />
                    <Route path='profile' element={<Profile />} />
                </Route>
                <Route path='landing' element={<Landing />} />
                <Route path="register" element={<Register/>}/>
                <Route path="*" element={<Error/>}/>
            </Routes>
            <ToastContainer position='top-center'/>
        </BrowserRouter>
    )
        ;
}

export default App;
