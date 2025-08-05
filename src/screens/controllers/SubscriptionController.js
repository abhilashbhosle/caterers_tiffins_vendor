import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {startLoader} from '../../redux/slicers/CommomSlicer';
import {cancelSubscriptionService, createOneTimeSubService, getQueuedSubscriptionService, getSubscriptionListService} from '../services/SubscriptionService';

// ======GET LIST OF SUBSCRIPTION=======//
export const getSubscriptionList = createAsyncThunk(
  'getSubscriptionList',
  async ({params}, {dispatch}) => {
    try {
      dispatch(startLoader(true))
      const res = await getSubscriptionListService({params});
      return res?.filter((e)=>e?.plans?.length>0);
    } catch (error) {
      console.log("error in get subscription list",error)
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
      console.log("error in get queued subscription",error)
      throw(error.message);
    } finally {
      dispatch(startLoader(false))
    }
  },
);
// ======CANCEL SUBSCRIPTION=======//
export const cancelSubscription = createAsyncThunk(
  'cancelSubscription',
  async ({subscription_id}, {dispatch}) => {
    try {
      dispatch(startLoader(true))
      const res = await cancelSubscriptionService({subscription_id,dispatch});
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
    queuedData:[],
    canceltriggered:false
  },
  reducers: {
    cancelChange: (state, action) => {
      state.canceltriggered=action.payload;
    },
  },
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
      .addCase(cancelSubscription.fulfilled,(state,action)=>{
        state.canceltriggered=true;
      })
  },
});
export const {cancelChange} = subSlice.actions;
export default subSlice.reducer;
