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
        userId: "",
        userName: "",
        userMail: "",
        role: "",
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
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        setUserMail: (state, action) => {
            state.userMail = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload;
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

export const { setIsLogin, setAuthToken, setFormData, clearFormData, setUserId, setUserName, setUserMail, setRole, setRememberMe, setError, clearError } = authSlice.actions;
export const authReducer = authSlice.reducer;
