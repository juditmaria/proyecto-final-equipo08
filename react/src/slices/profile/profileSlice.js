import { createSlice } from '@reduxjs/toolkit'

/* import ProfileDefaultImage from '../../assets/profileDefault.jpg'; */

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileId: "", 
    profileImg: "", 
  }, 
  reducers: {
    setProfileId: (state, action) => {
        state.profileId = action.payload;
    },
    setProfileImg: (state, action) => {
        state.profileImg = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProfileId, setProfileImg } = profileSlice.actions

export const profileReducer = profileSlice.reducer