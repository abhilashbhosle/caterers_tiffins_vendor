import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {startLoader} from '../../redux/slicers/CommomSlicer';
import { getProfileService } from '../services/ProfileService';

// ======GET PROFILE=======//
export const getProfile = createAsyncThunk(
  'getProfile',
  async (_, {dispatch}) => {
    try {
      dispatch(startLoader(true));
      const res = await getProfileService();
      return res.data.data;
    } catch (error) {
      return error;
    } finally {
      dispatch(startLoader(false));
    }
  },
);

const profileSlice = createSlice({
  name: 'getProfile',
  initialState: {
    profile: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});
export const {} = profileSlice.actions;
export default profileSlice.reducer;
