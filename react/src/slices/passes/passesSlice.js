import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    passes: [],
    loading: false,
    error: null,
    selectedPassId: null // Estado para almacenar el ID del pase seleccionado
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
        setSelectedPassId(state, action) { // Reducer para almacenar el ID del pase seleccionado
            state.selectedPassId = action.payload;
        }
    },
});

export const { setPasses, setLoading, setError, setSelectedPassId } = passesSlice.actions;

export const passesReducer = passesSlice.reducer;
