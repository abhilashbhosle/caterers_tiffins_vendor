import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {startLoader} from '../../redux/slicers/CommomSlicer';
import ImagePicker from 'react-native-image-crop-picker';
import {showMessage} from 'react-native-flash-message';
import {
  insertAadharBackService,
  insertAadharService,
  insertFsService,
  insertPanService,
  replaceAadharBackService,
  replaceAadharService,
  replaceFsService,
  replacePanService,
} from '../services/SettingsService';
import {stat} from 'fs';

// ======IMAGE SELECTION=======//
export const imgUpload = createAsyncThunk(
  'imgUpload',
  async ({selection, type, id}, {dispatch}) => {
    console.log(selection, type, id);
    try {
      //   dispatch(startLoader(true));
      let res = await ImagePicker.openPicker({
        width: 300,
        height: 500,
        cropping: true,
      });
      if (id == undefined) {
        console.log('entered inside handleInsertAadhar');
        dispatch(handleInsertAadhar({res}));
      } else {
        dispatch(handleReplaceAadhar({res, id}));
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
// =====INSERT AADHAR========//
export const handleInsertAadhar = createAsyncThunk(
  'handleInsertAadhar',
  async ({res}, {dispatch}) => {
    console.log('entered inside handleInsertAadhar1');
    try {
      let result = await insertAadharService({res});
      return result;
    } catch (error) {
      return error;
    } finally {
      //   dispatch(startLoader(false));
    }
  },
);

// =======REPLACE AADHAR======//
export const handleReplaceAadhar = createAsyncThunk(
  'handleReplaceAadhar',
  async ({res, id}, {dispatch}) => {
    try {
      let result = await replaceAadharService({res, id});
      return result;
    } catch (error) {
      return error;
    } finally {
      //   dispatch(startLoader(false));
    }
  },
);

// ======IMAGE SELECTION BACK=======//
export const imgUploadBack = createAsyncThunk(
  'imgUploadBack',
  async ({selection, type, id}, {dispatch}) => {
    try {
      //   dispatch(startLoader(true));
      let res = await ImagePicker.openPicker({
        width: 300,
        height: 500,
        cropping: true,
      });
      if (id == undefined) {
        console.log('entered inside handleInsertAadhar');
        dispatch(handleInsertAadharBack({res}));
      } else {
        dispatch(handleReplaceAadharBack({res, id}));
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
// =====INSERT AADHAR BACK========//
export const handleInsertAadharBack = createAsyncThunk(
  'handleInsertAadharBack',
  async ({res}, {dispatch}) => {
    console.log('entered inside handleInsertAadhar1');
    try {
      let result = await insertAadharBackService({res});
      return result;
    } catch (error) {
      return error;
    } finally {
      //   dispatch(startLoader(false));
    }
  },
);
// =======REPLACE AADHAR BACK======//
export const handleReplaceAadharBack = createAsyncThunk(
  'handleReplaceAadharBack',
  async ({res, id}, {dispatch}) => {
    try {
      let result = await replaceAadharBackService({res, id});
      return result;
    } catch (error) {
      return error;
    } finally {
      //   dispatch(startLoader(false));
    }
  },
);
// ======PAN SELECTION=======//
export const panUpload = createAsyncThunk(
  'panUpload',
  async ({selection, type, id}, {dispatch}) => {
    try {
      //   dispatch(startLoader(true));
      let res = await ImagePicker.openPicker({
        width: 300,
        height: 500,
        cropping: true,
      });
      if (id == undefined) {
        console.log('entered inside handleInsertAadhar');
        dispatch(handleInsertPan({res}));
      } else {
        dispatch(handleReplacePan({res, id}));
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
// =====INSERT PAN========//
export const handleInsertPan = createAsyncThunk(
  'handleInsertPan',
  async ({res}, {dispatch}) => {
    console.log('entered inside handleInsertAadhar1');
    try {
      let result = await insertPanService({res});
      return result;
    } catch (error) {
      return error;
    } finally {
      //   dispatch(startLoader(false));
    }
  },
);

// =======REPLACE PAN======//
export const handleReplacePan = createAsyncThunk(
  'handleReplacePan',
  async ({res, id}, {dispatch}) => {
    try {
      let result = await replacePanService({res, id});
      return result;
    } catch (error) {
      return error;
    } finally {
      //   dispatch(startLoader(false));
    }
  },
);
// ======FSSAI SELECTION=======//
export const fsUpload = createAsyncThunk(
  'fsUpload',
  async ({selection, type, id}, {dispatch}) => {
    try {
      //   dispatch(startLoader(true));
      let res = await ImagePicker.openPicker({
        width: 300,
        height: 500,
        cropping: true,
      });
      if (id == undefined) {
        console.log('entered inside handleInsertAadhar');
        dispatch(handleInsertFs({res}));
      } else {
        dispatch(handleReplaceFs({res, id}));
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
// =====INSERT FS========//
export const handleInsertFs = createAsyncThunk(
  'handleInsertFs',
  async ({res}, {dispatch}) => {
    console.log('entered inside handleInsertAadhar1');
    try {
      let result = await insertFsService({res});
      return result;
    } catch (error) {
      return error;
    } finally {
      //   dispatch(startLoader(false));
    }
  },
);

// =======REPLACE FS======//
export const handleReplaceFs = createAsyncThunk(
  'handleReplaceFs',
  async ({res, id}, {dispatch}) => {
    try {
      let result = await replaceFsService({res, id});
      return result;
    } catch (error) {
      return error;
    } finally {
      //   dispatch(startLoader(false));
    }
  },
);

const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    img: {},
    imgBack: {},
    panImg: {},
    fsImg: {},
    aadharRes: {
      data: '',
      error: null,
      loading: false,
    },
    aadharBackRes: {
      data: '',
      error: null,
      loading: false,
    },
    panRes: {
      data: '',
      error: null,
      loading: false,
    },
    fsRes: {
      data: '',
      error: null,
      loading: false,
    },
  },
  reducers: {
    emptyLocalImgs: (state, action) => {
      state.img = {};
      state.panImg = {};
      state.fsImg = {};
      state.imgBack={}
    },
  },
  extraReducers: builder => {
    builder.addCase(imgUpload.fulfilled, (state, action) => {
      state.img = action.payload;
    });
    builder.addCase(imgUploadBack.fulfilled, (state, action) => {
      state.imgBack = action.payload;
    });
    builder.addCase(panUpload.fulfilled, (state, action) => {
      state.panImg = action.payload;
    });
    builder.addCase(fsUpload.fulfilled, (state, action) => {
      state.fsImg = action.payload;
    });

    builder.addCase(handleInsertAadhar.pending, (state, action) => {
      state.aadharRes = {
        data: null,
        error: null,
        loading: true,
      };
    });

    builder.addCase(handleInsertAadhar.fulfilled, (state, action) => {
      state.aadharRes = {
        data: action.payload,
        error: null,
        loading: false,
      };
    });

    builder.addCase(handleInsertAadhar.rejected, (state, action) => {
      state.aadharRes = {
        data: null,
        error: action.error.message,
        loading: false,
      };
    });
    builder.addCase(handleReplaceAadhar.pending, (state, action) => {
      state.aadharRes = {
        data: null,
        error: null,
        loading: true,
      };
    });

    builder.addCase(handleReplaceAadhar.fulfilled, (state, action) => {
      state.aadharRes = {
        data: action.payload,
        error: null,
        loading: false,
      };
    });

    builder.addCase(handleReplaceAadhar.rejected, (state, action) => {
      state.aadharRes = {
        data: null,
        error: action.error.message,
        loading: false,
      };
    });
    // =========
    builder.addCase(handleInsertAadharBack.pending, (state, action) => {
      state.aadharBackRes = {
        data: null,
        error: null,
        loading: true,
      };
    });

    builder.addCase(handleInsertAadharBack.fulfilled, (state, action) => {
      state.aadharBackRes = {
        data: action.payload,
        error: null,
        loading: false,
      };
    });

    builder.addCase(handleInsertAadharBack.rejected, (state, action) => {
      state.aadharBackRes = {
        data: null,
        error: action.error.message,
        loading: false,
      };
    });
    builder.addCase(handleReplaceAadharBack.pending, (state, action) => {
      state.aadharBackRes = {
        data: null,
        error: null,
        loading: true,
      };
    });

    builder.addCase(handleReplaceAadharBack.fulfilled, (state, action) => {
      state.aadharBackRes = {
        data: action.payload,
        error: null,
        loading: false,
      };
    });

    builder.addCase(handleReplaceAadharBack.rejected, (state, action) => {
      state.aadharBackRes = {
        data: null,
        error: action.error.message,
        loading: false,
      };
    });
// ==========
    builder.addCase(handleInsertPan.pending, (state, action) => {
      state.panRes = {
        data: null,
        error: null,
        loading: true,
      };
    });

    builder.addCase(handleInsertPan.fulfilled, (state, action) => {
      state.panRes = {
        data: action.payload,
        error: null,
        loading: false,
      };
    });

    builder.addCase(handleInsertPan.rejected, (state, action) => {
      state.panRes = {
        data: null,
        error: action.error.message,
        loading: false,
      };
    });
    builder.addCase(handleReplacePan.pending, (state, action) => {
      state.panRes = {
        data: null,
        error: null,
        loading: true,
      };
    });

    builder.addCase(handleReplacePan.fulfilled, (state, action) => {
      state.panRes = {
        data: action.payload,
        error: null,
        loading: false,
      };
    });

    builder.addCase(handleReplacePan.rejected, (state, action) => {
      state.panRes = {
        data: null,
        error: action.error.message,
        loading: false,
      };
    });
    // =========
    builder.addCase(handleInsertFs.pending, (state, action) => {
      state.fsRes = {
        data: null,
        error: null,
        loading: true,
      };
    });

    builder.addCase(handleInsertFs.fulfilled, (state, action) => {
      state.fsRes = {
        data: action.payload,
        error: null,
        loading: false,
      };
    });

    builder.addCase(handleInsertFs.rejected, (state, action) => {
      state.fsRes = {
        data: null,
        error: action.error.message,
        loading: false,
      };
    });
    builder.addCase(handleReplaceFs.pending, (state, action) => {
      state.fsRes = {
        data: null,
        error: null,
        loading: true,
      };
    });

    builder.addCase(handleReplaceFs.fulfilled, (state, action) => {
      state.fsRes = {
        data: action.payload,
        error: null,
        loading: false,
      };
    });

    builder.addCase(handleReplaceFs.rejected, (state, action) => {
      state.fsRes = {
        data: null,
        error: action.error.message,
        loading: false,
      };
    });
  },
});
export const {emptyLocalImgs} = settingSlice.actions;
export default settingSlice.reducer;
