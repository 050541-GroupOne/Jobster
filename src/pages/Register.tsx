import {ChangeEvent, FormEvent, useState} from 'react';
import {Logo} from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import FormGroup from "../components/FormGroup.tsx";
import {toast} from "react-toastify";

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
};

type RegisterState = typeof initialState;

function Register() {
    const [values, setValues] = useState<RegisterState>(initialState);

    const toggleMember = () => {
        setValues((prevValues) => ({ ...prevValues, isMember: !prevValues.isMember }));
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
    };

    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmit}>
                <Logo/>
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>

                {/* name field */}
                {!values.isMember && (
                    <FormGroup
                        name='name'
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

                <button type='submit' className='btn btn-block'>
                    submit
                </button>
                <p>
                    {values.isMember ? 'Not a member yet?' : 'Already a member?'}

                    <button type='button' onClick={toggleMember} className='member-btn'>
                        {values.isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </Wrapper>
    );
}

export default Register;
