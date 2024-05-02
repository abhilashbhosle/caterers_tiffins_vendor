import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {startLoader} from '../../redux/slicers/CommomSlicer';
import { getBranchService } from '../services/BranchService';

// ======GET BRANCHES=======//
export const getBranch = createAsyncThunk(
  'getBranch',
  async (_, {dispatch}) => {
    try {
      dispatch(startLoader(true));
      const res = await getBranchService();
      return res.data.data;
    } catch (error) {
      return error;
    } finally {
      dispatch(startLoader(false));
    }
  },
);

const branchSlice = createSlice({
  name: 'getBranch',
  initialState: {
    branch: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getBranch.fulfilled, (state, action) => {
      state.branch = action.payload;
    });
  },
});
export const {} = branchSlice.actions;
export default branchSlice.reducer;
