import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Logo} from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import FormGroup from "../components/FormGroup.tsx";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../features/store.ts";
import {loginUser, registerUser} from "../features/auth/slice.ts";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {app} from "../services/firebase/firebaseConfig.ts";

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true
};

export type FormState = typeof initialState;

function Register() {
    const [values, setValues] = useState(initialState);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading } = useSelector((store: RootState) => store.auth);

    const toggleMember = () => {
        setValues((prevValues) => ({...prevValues, isMember: !prevValues.isMember}));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setValues({...values, [name]: value});
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {name, email, password, isMember} = values;
        if (!email || !password || (!isMember && !name)) {
            toast.error('Please fill out all form fields');
            return;
        }
        if (isMember) {
            dispatch(loginUser({email, password} as FormState));
            return;
        }
        dispatch(registerUser({name, email, password} as FormState));
    };

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                navigate('/');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmit}>
                <Logo/>
                <h3>{values.isMember ? 'Sign In' : 'Create account'}</h3>

                {/* name field */}
                {!values.isMember && (
                    <FormGroup
                        name='name'
                        labelText='name'
                        type='text'
                        value={values.name}
                        handleChange={handleChange}
                    />
                )}
                {/* email field */}
                <FormGroup
                    type='email'
                    name='email'
                    value={values.email}
                    handleChange={handleChange}
                />
                {/* password field */}
                <FormGroup
                    type='password'
                    name='password'
                    value={values.password}
                    handleChange={handleChange}
                />

                <button
                    type='submit'
                    className='btn btn-block'
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Continue'}
                </button>
                <p>
                    {values.isMember ? 'Not a member yet?' : 'Already a member?'}

                    <button type='button' onClick={toggleMember} className='member-btn'>
                        {values.isMember ? 'Create an account' : 'Sign in'}
                    </button>
                </p>
            </form>
        </Wrapper>
    );
}

export default Register;
