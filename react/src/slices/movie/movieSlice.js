import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    movies: [],
    selectedMovie: null,
    loading: false,
    error: null,
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovies(state, action) {
            state.movies = action.payload;
        },
        setSelectedMovie(state, action) {
            state.selectedMovie = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setMovies, setSelectedMovie, setLoading, setError } = moviesSlice.actions;

export const movieReducer = moviesSlice.reducer;
