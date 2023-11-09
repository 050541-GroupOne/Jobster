import {AuthState, User} from "../../interfaces/states/authState.ts";
import {FormState} from "../../pages/Register.tsx";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginUserThunk, logoutUserThunk, registerUserThunk, updateUserThunk} from "./thunk.ts";
import {toast} from "react-toastify";
import {initializeAuthState} from "../../services/firebase/firebase.ts";

const initialState: AuthState = {
    user: null,
    isAuthenticated: await initializeAuthState(),
    isLoading: false,
    isSidebarOpen: false
}

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (user: FormState, {rejectWithValue}) => registerUserThunk(user, {rejectWithValue}));

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (user: FormState, {rejectWithValue}) => loginUserThunk(user, {rejectWithValue}));

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, {rejectWithValue}) => logoutUserThunk({rejectWithValue}));

export const updateUser = createAsyncThunk(
    "auth/updateUser",
    async (user: User, {rejectWithValue}) => updateUserThunk(user, {rejectWithValue}));

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        setUser: (state, {payload}) => {
            state.user = {name: payload.displayName, email: payload.email};
        },
        setAuthenticated: (state, {payload}) => {
            state.isAuthenticated = payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.user = {name: payload.displayName, email: payload.email};
            toast.success(`Welcome ${state.user.name}!`);
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
            state.user = {name: payload.displayName, email: payload.email};
            toast.success(`Welcome ${state.user.name}!`);
        });
        builder.addCase(loginUser.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload as string);
        });
        builder.addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.isLoading = false;
            toast.success(`Logged out successfully!`);
        });
        builder.addCase(logoutUser.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload as string);
        });
        builder.addCase(updateUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateUser.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.user = {name: payload.displayName, email: payload.email};
            toast.success(`User updated successfully!`);
        });
        builder.addCase(updateUser.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload as string);
        });
    }
});
export const {toggleSidebar, setUser, setAuthenticated} = authSlice.actions;
export default authSlice.reducer;
