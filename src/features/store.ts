import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./auth/slice.ts";
import jobSlice from "./job/slice.ts";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        job: jobSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
