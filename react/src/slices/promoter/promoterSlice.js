import { createSlice } from '@reduxjs/toolkit'

export const promoterSlice = createSlice({
  name: 'promoter',
  initialState: { 
    promoterId: "",
    promoterName: "",
    promoterImg: "",
    error: null
  }, 
  reducers: {
    setPromoterId: (state, action) => {
        state.promoterId = action.payload;
    },
    setPromoterName: (state, action) => {
        state.promoterName = action.payload;
    },
    setPromoterImg: (state, action) => {
        state.promoterImg = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
        state.error = null;
    } 
  },
})

// Action creators are generated for each case reducer function
export const { setPromoterId, setPromoterName, setPromoterImg, setError, clearError } = promoterSlice.actions

export const promoterReducer = promoterSlice.reducer