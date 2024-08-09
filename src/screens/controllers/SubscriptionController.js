import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {startLoader} from '../../redux/slicers/CommomSlicer';
import {getSubscriptionListService} from '../services/SubscriptionService';

// ======GET LIST OF SUBSCRIPTION=======//
export const getSubscriptionList = createAsyncThunk(
  'getSubscriptionList',
  async ({params}, {dispatch}) => {
    try {
      dispatch(startLoader(true))
      const res = await getSubscriptionListService({params});
      return res;
    } catch (error) {
      throw(error.message);
    } finally {
      dispatch(startLoader(false))
    }
  },
);

const subSlice = createSlice({
  name: 'subSlice',
  initialState: {
    subListData: [],
    subListError: null,
    subListLoading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getSubscriptionList.pending, (state, action) => {
        state.subListError = null;
        state.subListLoading = true;
      })
      .addCase(getSubscriptionList.fulfilled, (state, action) => {
        state.subListData = action.payload;
        state.subListLoading = false;
      })
      .addCase(getSubscriptionList.rejected, (state, action) => {
        state.subListError = action.error;
        state.subListLoading = false;
      });
  },
});
export const {} = subSlice.actions;
export default subSlice.reducer;
