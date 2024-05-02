import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {startLoader} from '../../redux/slicers/CommomSlicer';
import {getPackageService, packageUpdateService} from '../services/PackageService';

// ======GET PACKAGE=======//
export const getPackage = createAsyncThunk(
  'getPackage',
  async (_, {dispatch}) => {
    try {
      dispatch(startLoader(true));
      const res = await getPackageService();
      return res.data.data;
    } catch (error) {
      return error;
    } finally {
      dispatch(startLoader(false));
    }
  },
);

const packageSlice = createSlice({
  name: 'package',
  initialState: {
    packages: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPackage.fulfilled, (state, action) => {
      state.packages = action.payload;
    });
  },
});
export const {} = packageSlice.actions;
export default packageSlice.reducer;
