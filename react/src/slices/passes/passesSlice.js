import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    passes: [],
    loading: false,
    error: null,
};

const passesSlice = createSlice({
    name: 'passes',
    initialState,
    reducers: {
        setPasses(state, action) {
            state.passes = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setPasses, setLoading, setError } = passesSlice.actions;

export const passesReducer = passesSlice.reducer;
