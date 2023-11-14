import {ChangeEvent, FormEvent, useState} from 'react';
import {FormGroup} from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {AppDispatch, RootState} from "../../features/store.ts";
import {User} from "../../interfaces/states/authState.ts";
import {updateUser} from "../../features/auth/slice.ts";


const Profile = () => {
    const {isLoading, user} = useSelector((store: RootState) => store.auth);
    const dispatch = useDispatch<AppDispatch>();

    const [userData, setUserData] = useState({
        name: user?.name || '',
        email: user?.email || ''
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {name, email} = userData;

        if (!name || !email) {
            toast.error('Please fill out all fields');
            return;
        }
        dispatch(updateUser({name, email} as User));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setUserData({...userData, [name]: value})
    };

    return (
        <Wrapper>
            <form className='form' onSubmit={handleSubmit}>
                <h3>profile</h3>

                <div className='form-center'>
                    <FormGroup
                        type='text'
                        name='name'
                        value={userData.name}
                        handleChange={handleChange}
                    />
                    <FormGroup
                        type='email'
                        name='email'
                        value={userData.email}
                        handleChange={handleChange}
                    />
                    <button className='btn btn-block' type='submit' disabled={isLoading}>
                        {isLoading ? 'Please Wait...' : 'save changes'}
                    </button>
                </div>
            </form>
        </Wrapper>
    );
};

export default Profile;
