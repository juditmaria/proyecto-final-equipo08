import { createSlice } from '@reduxjs/toolkit'

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileId: "", 
    profileImg: "", 
  }, 
  reducers: {
    setProfileId: (state, action) => {
        state.profileImg = action.payload;
    },
    setProfileImg: (state, action) => {
        state.profileImg = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProfileId, setProfileImg } = profileSlice.actions

export const profileReducer = profileSlice.reducer