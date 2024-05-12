import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authToken: "",
        error: null,
        formData: {
            name: "",
            email: "",
            password: "",
            password2: "",
        },
        isLogin: true // Agregamos el estado isLogin con valor inicial true
    },
    reducers: {
        setAuthToken: (state, action) => {
            state.authToken = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        setFormData: (state, action) => {
            state.formData = action.payload;
        },
        clearFormData: (state) => {
            state.formData = {
                name: "",
                email: "",
                password: "",
                password2: "",
            };
        },
        setIsLogin: (state, action) => {
            state.isLogin = action.payload;
        }
    },
});

export const { setAuthToken, setError, clearError, setFormData, clearFormData, setIsLogin } = authSlice.actions;
export const authReducer = authSlice.reducer;
