import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    locations: [],
    selectedLocation: null,
    loading: false,
    error: null,
};

const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        setLocations(state, action) {
            state.locations = action.payload;
        },
        setSelectedLocation(state, action) {
            state.selectedLocation = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setLocations, setSelectedLocation, setLoading, setError } = locationsSlice.actions;

export const locationReducer = locationsSlice.reducer;
