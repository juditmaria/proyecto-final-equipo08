import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../src/slices/auth/authSlice';
import { profileReducer } from '../src/slices/profile/profileSlice';
import { promoterReducer } from './slices/promoter/promoterSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    promoter: promoterReducer,
  },
});
