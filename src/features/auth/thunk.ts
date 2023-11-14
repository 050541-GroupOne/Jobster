import {FormState} from "../../pages/Register.tsx";
import {loginUser, logoutUser, registerUser, updateUserInfo} from "../../services/firebase/firebase.ts";
import {User} from "../../interfaces/states/authState.ts";

export const registerUserThunk = async (user: FormState, { rejectWithValue } : any) => {
    try {
        return await registerUser(user);
    } catch(error: any) {
        return rejectWithValue(error.message as string);
    }
}

export const loginUserThunk = async (user: FormState, { rejectWithValue } : any) => {
    try {
        return await loginUser(user);
    } catch(error: any) {
        return rejectWithValue(error.message as string);
    }
}

export const logoutUserThunk = async ({ rejectWithValue } : any) => {
    try {
        return await logoutUser();
    } catch(error: any) {
        return rejectWithValue(error.message as string);
    }
}

export const updateUserThunk = async (user: User, { rejectWithValue } : any) => {
    try {
        return await updateUserInfo(user);
    } catch(error: any) {
        return rejectWithValue(error.message as string);
    }
}
