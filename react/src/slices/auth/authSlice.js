import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authToken: "",
    },
    reducers: {
        setAuthToken: (state, action) => {
            state.authToken = action.payload
        },
    },
})
export const { setAuthToken, setError } = authSlice.actions
export const authReducer = authSlice.reducer