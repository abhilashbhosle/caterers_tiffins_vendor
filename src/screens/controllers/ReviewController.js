import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {startLoader} from '../../redux/slicers/CommomSlicer';
import {
  getPackageService,
  packageUpdateService,
} from '../services/PackageService';
import { getReviwService } from '../services/ReviewService';

// ======GET REVIEWS=======//
export const getReviews = createAsyncThunk(
  'getReviews',
  async ({limit, page, sort}, {dispatch}) => {
    try {
      const res = await getReviwService({limit, page, sort});
      return res.data;
    } catch (error) {
      return error;
    } finally {
    }
  },
);

const reviewSlice = createSlice({
  name: 'getReviews',
  initialState: {
    review: {
      data: [],
      error: null,
      loading: false,
	  total:null
    },
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getReviews.pending, (state, action) => {
      state.review = {
        data: [],
        error: null,
        loading: true,
		total:state.review.total
      };
    });
    builder.addCase(getReviews.fulfilled, (state, action) => {
      state.review = {
        data: action.payload.data,
        error: null,
        loading: false,
		total:action.payload.total_count,
      };
    });
    builder.addCase(getReviews.rejected, (state, action) => {
      state.review = {
        data: [],
        error: action.error,
        loading: false,
		total:state.review.total
      };
    });
  },
});
export const {} = reviewSlice.actions;
export default reviewSlice.reducer;
