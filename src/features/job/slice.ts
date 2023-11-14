import { createSlice } from '@reduxjs/toolkit';
import {JobState} from "../../interfaces/states/jobState.ts";

const initialState: JobState = {
    isLoading: false,
    position: '',
    company: '',
    jobLocation: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    isEditing: false,
    editJobId: '',
};

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        handleChange(state, action) {
            const {name, value} = action.payload;
            // @ts-ignore
            state[name] = value;
        },
        clearValues() {
            return initialState;
        }
    }
});

export const { handleChange, clearValues } = jobSlice.actions;
export default jobSlice.reducer;
