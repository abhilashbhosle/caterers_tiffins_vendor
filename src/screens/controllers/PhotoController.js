import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {startLoader} from '../../redux/slicers/CommomSlicer';
import ImagePicker from 'react-native-image-crop-picker';
import {showMessage} from 'react-native-flash-message';
import {insertLogoService} from '../onboarding/PhotoService';

// ======IMAGE SELECTION=======//
export const imgUpload = createAsyncThunk(
  'imgUpload',
  async ({selection, type}, {dispatch}) => {
    try {
      //   dispatch(startLoader(true));
      let res = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      });
      if (selection == 'logo' && type == 'insert') {
        dispatch(handleInsertLogo({res: res}));
      }
      return {...res, type, selection};
    } catch (error) {
      if (error.code === 'E_PICKER_CANCELLED') {
        showMessage({
          message: 'Request Cancelled!',
          description: 'Image Selection Failed.',
          type: 'warning',
        });
        return false;
      }
    } finally {
      //   dispatch(startLoader(false));
    }
  },
);
// =====INSERTLOGO========//
export const handleInsertLogo = createAsyncThunk(
  'handleInsertLogo',
  async ({res}, {dispatch}) => {
    try {
      let result = await insertLogoService({res});
	  return result
    } catch (error) {
      console.log('error in insert logo', error);
      return error;
    } finally {
      //   dispatch(startLoader(false));
    }
  },
);

const gallerySlice = createSlice({
  name: 'package',
  initialState: {
    img: {},
	logoRes:{
		data:'',
		error:null,
		loading:false
	}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(imgUpload.fulfilled, (state, action) => {
      state.img = action.payload;
    });
	builder.addCase(handleInsertLogo.pending,(state,action)=>{
		state.logoRes={
			data:null,
			error:null,
			loading:true
		}
	})
	builder.addCase(handleInsertLogo.fulfilled,(state,action)=>{
		state.logoRes={
			data:action.payload,
			error:null,
			loading:false
		}
	})
	builder.addCase(handleInsertLogo.rejected,(state,action)=>{
		state.logoRes={
			data:null,
			error:action.error.message,
			loading:false
		}
	})
  },
});
export const {} = gallerySlice.actions;
export default gallerySlice.reducer;
