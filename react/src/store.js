import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../src/slices/auth/authSlice';
import { profileReducer } from '../src/slices/profile/profileSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});
