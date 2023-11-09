import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateEmail,
    updateProfile
} from 'firebase/auth';
import {FormState} from "../../pages/Register.tsx";
import {app} from "./firebaseConfig.ts";
import {User} from "../../interfaces/states/authState.ts";

export const registerUser = async ({email, password, name}: FormState) => {
    const auth = getAuth(app);
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, {displayName: name});
        return user;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const loginUser = async ({email, password}: FormState) => {
    const auth = getAuth(app);
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user
    } catch (error) {
        return Promise.reject(error);
    }
};

export const logoutUser = async () => {
    const auth = getAuth(app);
    try {
        await signOut(auth);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const initializeAuthState = async () => {
    const auth = getAuth();

    try {
        const user = await new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                resolve(user);
                unsubscribe();
            });
        });
        return !!user;
    } catch (error) {
        console.error('Error initializing authentication state:', error);
        return false;
    }
};

export const initializeUserState = async () => {
    const auth = getAuth();

    try {
        return await new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                resolve({name: user?.displayName, email: user?.email} as User);
                unsubscribe();
            });
        }) as User;
    } catch (error) {
        console.error('Error initializing authentication state:', error);
        return null;
    }
};

export const updateUserInfo = async (user: User) => {
    const auth = getAuth(app);
    try {
        if (auth.currentUser) {
            await updateProfile(auth.currentUser, {displayName: user.name});
            await updateEmail(auth.currentUser, user.email);
        }
        return auth.currentUser;
    } catch (error) {
        return Promise.reject(error);
    }
}

