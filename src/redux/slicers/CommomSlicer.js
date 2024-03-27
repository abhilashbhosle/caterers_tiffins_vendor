import { createSlice } from '@reduxjs/toolkit'
const initialState= {
	flow:''
  }
const commonSlice = createSlice({
  name: 'common',
  initialState:initialState,
  reducers: {
	getFlow: (state,action) => {
		state.flow = action.payload;
	  },
  },
})

export const { getFlow} = commonSlice.actions
export default commonSlice.reducer