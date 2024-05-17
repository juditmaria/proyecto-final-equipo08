import { createSlice } from '@reduxjs/toolkit'

export const profileSlice = createSlice({
  name: 'profile',
  initialState: { 
    profileImg: "", 
  }, 
  reducers: {
    setProfileImg: (state, action) => {
        state.profileImg = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProfileImg } = profileSlice.actions

export const profileReducer = profileSlice.reducer