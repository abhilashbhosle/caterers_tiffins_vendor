import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { getInquiryService } from '../services/InquiryService';

// ======GET INQUIRIES=======//
export const getInquiry = createAsyncThunk(
  'getInquiry',
  async ({limit, page, sort,date,search}, {dispatch}) => {
    try {
      const res = await getInquiryService({limit, page, sort,date,search});
      return res.data;
    } catch (error) {
      return error;
    } finally {
    }
  },
);

const inquirySlice = createSlice({
  name: 'getInquiry',
  initialState: {
    inquiry: {
      data: [],
      error: null,
      loading: false,
	  total:null
    },
  },
  reducers: {
    resetInquiry: (state,action) => {
      state.inquiry.data=[];
      state.inquiry.error=null,
      state.inquiry.loading=false,
      state.inquiry.total=null
    }
  },
  extraReducers: builder => {
    builder.addCase(getInquiry.pending, (state, action) => {
      state.inquiry = {
        data: [],
        error: null,
        loading: true,
		total:state.inquiry.total
      };
    });
    builder.addCase(getInquiry.fulfilled, (state, action) => {
      state.inquiry = {
        data: action.payload?.enquiries,
        error: null,
        loading: false,
		total:action.payload?.total_count,
      };
    });
    builder.addCase(getInquiry.rejected, (state, action) => {
      state.inquiry = {
        data: [],
        error: action.error,
        loading: false,
		total:state.inquiry.total
      };
    });
  },
});
export const {resetInquiry} = inquirySlice.actions;
export default inquirySlice.reducer;
