import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogin: true,
        authToken: "",  
        formData: {
            name: "",
            email: "",
            password: "",
            password2: "",
        },
        userName: "",
        userMail: "",
        rememberMe: "N",
        error: null
    },
    reducers: {
        setIsLogin: (state, action) => {
            state.isLogin = action.payload;
        },
        setAuthToken: (state, action) => {
            state.authToken = action.payload;
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
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        setUserMail: (state, action) => {
            state.userMail = action.payload;
        },
        setRememberMe: (state, action) => {
            state.rememberMe = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        }   
    },
});

export const { setIsLogin, setAuthToken, setFormData, clearFormData, setUserName, setUserMail, setRememberMe, setError, clearError } = authSlice.actions;
export const authReducer = authSlice.reducer;
