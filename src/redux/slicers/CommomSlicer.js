import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  flow: '',
  loading: false,
  asyncToken:null
};
const commonSlice = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {
    getFlow: (state, action) => {
      state.flow = action.payload;
    },
    startLoader: (state, action) => {
      state.loading = action.payload;
    },
    asyncToken:(state,action)=>{
      state.asyncToken=action.payload
    }
  },
});

export const {getFlow, startLoader,asyncToken} = commonSlice.actions;
export default commonSlice.reducer;
