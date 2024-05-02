import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { startLoader } from "../../redux/slicers/CommomSlicer";
import { getOccassionsService } from "../services/OccassionService";

// ======GET OCCASSIONS=======//
export const getOccasions = createAsyncThunk(
	'getOccasions',
	async (_,{dispatch}) => {
	  try {
		dispatch(startLoader(true));
		const res = await getOccassionsService();
		return res.data.data;
	  } catch (error) {
		return error;
	  } finally {
		dispatch(startLoader(false));
	  }
	},
  );

const occassionSlice = createSlice({
	name: 'occassion',
	initialState: {
	  occassions: [],
	},
	reducers: {
	},
	extraReducers: builder => {
	  builder
		.addCase(getOccasions.fulfilled, (state, action) => {
		  state.occassions = action.payload;
		})
	},
  });
  export const {} = occassionSlice.actions;
  export default occassionSlice.reducer;