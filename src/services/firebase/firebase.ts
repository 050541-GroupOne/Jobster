import {createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, updateProfile} from 'firebase/auth';
import {FormState} from "../../pages/Register.tsx";
import {app} from "./firebaseConfig.ts";

export const registerUser = async ({email, password, name}: FormState) => {
    const auth = getAuth(app);
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, {displayName: name});
        return name;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const loginUser = async ({email, password}: FormState) => {
    const auth = getAuth(app);
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user.displayName;
    } catch (error) {
        return Promise.reject(error);
    }
};
