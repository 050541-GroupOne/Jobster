import {AuthState} from "../../interfaces/states/authState.ts";
import {FormState} from "../../pages/Register.tsx";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginUserThunk, registerUserThunk} from "./thunk.ts";
import {toast} from "react-toastify";

const initialState: AuthState = {
    isLoading: false
}

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (user: FormState, {rejectWithValue}) => registerUserThunk(user, {rejectWithValue}));

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (user: FormState, {rejectWithValue}) => loginUserThunk(user, {rejectWithValue}));

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            console.log(payload)
            toast.success(`Welcome ${payload}!`);
        });
        builder.addCase(registerUser.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload as string);
        });
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            console.log(payload)
            toast.success(`Welcome back ${payload}!`);
        });
        builder.addCase(loginUser.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload as string);
        });
    }
});

export default authSlice.reducer;
