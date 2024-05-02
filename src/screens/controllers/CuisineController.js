import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { startLoader } from "../../redux/slicers/CommomSlicer";
import { getCuisineService } from "../services/CuisineService";

// ======GET CUISINE=======//
export const getCuisine = createAsyncThunk(
	'getCuisine',
	async (_,{dispatch}) => {
	  try {
		dispatch(startLoader(true));
		const res = await getCuisineService();
		return res.data.data;
	  } catch (error) {
		return error;
	  } finally {
		dispatch(startLoader(false));
	  }
	},
  );

const cuisineSlice = createSlice({
	name: 'cuisine',
	initialState: {
	  cuisines: [],
	},
	reducers: {
	},
	extraReducers: builder => {
	  builder
		.addCase(getCuisine.fulfilled, (state, action) => {
		  state.cuisines = action.payload;
		})
	},
  });
  export const {} = cuisineSlice.actions;
  export default cuisineSlice.reducer;