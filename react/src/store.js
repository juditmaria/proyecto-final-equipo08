import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../src/slices/auth/authSlice';
import { profileReducer } from '../src/slices/profile/profileSlice';
import { promoterReducer } from './slices/promoter/promoterSlice';
import { userReducer } from './slices/user/userSlice';
import { locationReducer } from './slices/location/locationSlice';
import { movieReducer } from './slices/movie/movieSlice';
import { passesReducer } from './slices/passes/passesSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    promoter: promoterReducer,
    user: userReducer,
    location: locationReducer,
    movie: movieReducer,
    passes: passesReducer,
  },
});
