import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {startLoader} from '../../redux/slicers/CommomSlicer';
import {createOneTimeSubService, getQueuedSubscriptionService, getSubscriptionListService} from '../services/SubscriptionService';

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
// ======CREATE ONE TIME SUBSCRIPTION=======//
export const createOneTimeSub = createAsyncThunk(
  'createOneTimeSub',
  async ({body}, {dispatch}) => {
    try {
      dispatch(startLoader(true))
      const res = await createOneTimeSubService({body});
      return res;
    } catch (error) {
      throw(error.message);
    } finally {
      dispatch(startLoader(false))
    }
  },
);
// ======GET QUEUED SUBSCRIPTION=======//
export const getQueuedSubscription = createAsyncThunk(
  'getQueuedSubscription',
  async (_, {dispatch}) => {
    try {
      dispatch(startLoader(true))
      const res = await getQueuedSubscriptionService();
      return res.data;
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
    queuedData:[]
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
      })
      .addCase(getQueuedSubscription.fulfilled, (state, action) => {
        state.queuedData = action.payload;
      })
  },
});
export const {} = subSlice.actions;
export default subSlice.reducer;
