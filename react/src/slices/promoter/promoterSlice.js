import { createSlice } from '@reduxjs/toolkit'

export const promoterSlice = createSlice({
  name: 'promoter',
  initialState: { 
    promoterId: "",
    promoterName: "",
    promoterImg: "", 
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
  },
})

// Action creators are generated for each case reducer function
export const { setPromoterId, setPromoterName, setPromoterImg } = promoterSlice.actions

export const promoterReducer = promoterSlice.reducer