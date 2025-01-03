import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {startLoader} from '../../redux/slicers/CommomSlicer';
import ImagePicker from 'react-native-image-crop-picker';
import {showMessage} from 'react-native-flash-message';
import {
  insertBannerService,
  insertLogoService,
  insertOtherService,
  insertPackageService,
  insertService,
  replaceBannerService,
  replaceLogoService,
  replaceOtherService,
  replacePackageService,
  replaceService,
} from '../services/PhotoService';

// ======IMAGE SELECTION=======//
export const imgUpload = createAsyncThunk(
  'imgUpload',
  async ({selection, type, id, typeOfUpload}, {dispatch}) => {
    try {
      //   dispatch(startLoader(true));
      let res = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: typeOfUpload == 'normal' ? false : true,
      });
      if (!id) {
        dispatch(handleInsertLogo({res: res}));
      } else {
        dispatch(handleReplaceLogo({res: res, id: id}));
      }
      return {...res, type, selection};
    } catch (error) {
      console.log('error in uploading', error);
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
      // Call the service
      let result = await insertLogoService({res});

      // Return only serializable fields
      const serializableResult = {
        data: result?.data,
        status: result?.status,
      };

      return serializableResult;
    } catch (error) {
      console.log('error in inserting logo', error);
      return error;
    }
  },
);
// =======REPLACELOGO======//
export const handleReplaceLogo = createAsyncThunk(
  'handleReplaceLogo',
  async ({res, id}, {dispatch}) => {
    try {
      let result = await replaceLogoService({res, id});
      return result;
    } catch (error) {
      return error;
    } finally {
      //   dispatch(startLoader(false));
    }
  },
);

// ======BANNER IMAGE SELECTION=======//
export const imgUploadBanner = createAsyncThunk(
  'imgUploadBanner',
  async ({selection, type, id,typeofUpload}, {dispatch}) => {
    try {
      //   dispatch(startLoader(true));
      let res = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping:typeofUpload == 'normal' ? false : true,
      });
      if (!id) {
        dispatch(handleInsertBanner({res: res}));
      } else {
        dispatch(handleReplaceBanner({res: res, id: id}));
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
// =======INSERT BANNER======//
export const handleInsertBanner = createAsyncThunk(
  'handleInsertBanner',
  async ({res}, {dispatch}) => {
    try {
      let result = await insertBannerService({res});
      const serializableResult = {
        data: result?.data,
        status: result?.status,
      };
      return serializableResult;
    } catch (error) {
      return error;
    } finally {
      //   dispatch(startLoader(false));
    }
  },
);
// =====REPLACE BANNER======//
export const handleReplaceBanner = createAsyncThunk(
  'handleInsertBanner',
  async ({res, id}, {dispatch}) => {
    try {
      let result = await replaceBannerService({res, id});
      const serializableResult = {
        data: result?.data,
        status: result?.status,
      };
      return serializableResult;
    } catch (error) {
      return error;
    } finally {
      //   dispatch(startLoader(false));
    }
  },
);
// ======PACKAGE IMAGE SELECTION=======//
export const packageUpload = createAsyncThunk(
  'packageUpload',
  async ({selection, type, id, index}, {dispatch}) => {
    try {
      //   dispatch(startLoader(true));
      let res = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      });
      
      if (!id) {
        dispatch(handleInsertPackage({res: res}));
      } else {
        dispatch(handleReplacePackage({res: res, id: id, index}));
      }
      return {...res, type, selection, index};
    } catch (error) {
      if (error.code === 'E_PICKER_CANCELLED') {
        showMessage({
          message: 'Request Cancelled!',
          description: 'Image Selection Failed.',
          type: 'warning',
        });
      }
    } finally {
      //   dispatch(startLoader(false));
    }
  },
);
// ========REPLACE PACKAGE========//
const handleReplacePackage = createAsyncThunk(
  'handleReplacePackage',
  async ({res, id, index}, {dispatch}) => {
    try {
      let result = await replacePackageService({res, id, index});
      const serializableResult = {
        data: result?.data,
        status: result?.status,
      };
      return serializableResult;
    } catch (error) {
      return error;
    } finally {
      //   dispatch(startLoader(false));
    }
  },
);
// =========INSERT PACKAGE========//
export const handleInsertPackage = createAsyncThunk(
  'handleInsertPackage',
  async ({res}, {dispatch}) => {
    try {
      let result = await insertPackageService({res});
      const serializableResult = {
        data: result?.data,
        status: result?.status,
      };
      return serializableResult;
    } catch (error) {
      return error;
    } finally {
      //   dispatch(startLoader(false));
    }
  },
);
// ======SERVICE IMAGE SELECTION=======//
export const serviceUpload = createAsyncThunk(
  'serviceUpload',
  async ({selection, type, id, index}, {dispatch}) => {
    try {
      //   dispatch(startLoader(true));
      let res = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      });
      if (!id) {
        dispatch(handleInsertServ({res: res}));
      } else {
        dispatch(handleReplaceServ({res: res, id: id, index}));
      }
      return {...res, type, selection, index};
    } catch (error) {
      if (error.code === 'E_PICKER_CANCELLED') {
        showMessage({
          message: 'Request Cancelled!',
          description: 'Image Selection Failed.',
          type: 'warning',
        });
      }
    } finally {
      //   dispatch(startLoader(false));
    }
  },
);
// ========REPLACE SERVICE========//
const handleReplaceServ = createAsyncThunk(
  'handleReplaceServ',
  async ({res, id, index}, {dispatch}) => {
    try {
      let result = await replaceService({res, id, index});
      const serializableResult = {
        data: result?.data,
        status: result?.status,
      };
      return serializableResult;
    } catch (error) {
      return error;
    } finally {
      //   dispatch(startLoader(false));
    }
  },
);
// =========INSERT SERVICE=======//
export const handleInsertServ = createAsyncThunk(
  'handleInsertServ',
  async ({res}, {dispatch}) => {
    try {
      let result = await insertService({res});
      const serializableResult = {
        data: result?.data,
        status: result?.status,
      };
      return serializableResult;
    } catch (error) {
      return error;
    } finally {
      //   dispatch(startLoader(false));
    }
  },
);

// ======OTHER IMAGE SELECTION=======//
export const otherUpload = createAsyncThunk(
  'otherUpload',
  async ({selection, type, id, index}, {dispatch}) => {
    try {
      //   dispatch(startLoader(true));
      let res = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      });
      if (!id) {
        dispatch(handleInsertOther({res: res}));
      } else {
        dispatch(handleReplaceOther({res: res, id: id, index}));
      }
      return {...res, type, selection, index};
    } catch (error) {
      if (error.code === 'E_PICKER_CANCELLED') {
        showMessage({
          message: 'Request Cancelled!',
          description: 'Image Selection Failed.',
          type: 'warning',
        });
      }
    } finally {
      //   dispatch(startLoader(false));
    }
  },
);
// ========REPLACE OTHER========//
const handleReplaceOther = createAsyncThunk(
  'handleReplaceOther',
  async ({res, id, index}, {dispatch}) => {
    try {
      let result = await replaceOtherService({res, id, index});
      const serializableResult = {
        data: result?.data,
        status: result?.status,
      };
      return serializableResult;
      return result;
    } catch (error) {
      return error;
    } finally {
      //   dispatch(startLoader(false));
    }
  },
);
// =========INSERT SERVICE=======//
export const handleInsertOther = createAsyncThunk(
  'handleInsertOther',
  async ({res}, {dispatch}) => {
    try {
      let result = await insertOtherService({res});
      const serializableResult = {
        data: result?.data,
        status: result?.status,
      };
      return serializableResult;
      return result;
    } catch (error) {
      return error;
    } finally {
      //   dispatch(startLoader(false));
    }
  },
);

const gallerySlice = createSlice({
  name: 'photo',
  initialState: {
    img: {},
    bannerimg: {},
    packageImg: {},
    serviceImg: {},
    otherImg: {},
    logoRes: {
      data: '',
      error: null,
      loading: false,
    },
    bannerRes: {
      data: '',
      error: null,
      loading: false,
    },
    packageRes: {
      data: [],
      error: null,
      loading: false,
    },
    serviceRes: {
      data: [],
      error: null,
      loading: false,
    },
    otherRes: {
      data: [],
      error: null,
      loading: false,
    },
  },
  reducers: {
    emptyLocalImgs: (state, action) => {
      state.img = {};
      state.bannerimg = {};
    },
    emptyPackage: (state, action) => {
      state.packageImg = {};
    },
    emptyService: (state, action) => {
      state.serviceImg = {};
    },
    emptyOther: (state, action) => {
      state.otherImg = {};
    },
  },
  extraReducers: builder => {
    builder.addCase(imgUpload.fulfilled, (state, action) => {
      state.img = action.payload;
    });
    builder.addCase(imgUploadBanner.fulfilled, (state, action) => {
      state.bannerimg = action.payload;
    });
    builder.addCase(packageUpload.fulfilled, (state, action) => {
      state.packageImg = action?.payload && action.payload;
    });
    builder.addCase(serviceUpload.fulfilled, (state, action) => {
      state.serviceImg = action?.payload && action.payload;
    });
    builder.addCase(otherUpload.fulfilled, (state, action) => {
      state.otherImg = action.payload && action.payload;
    });
    // =========INSERT LOGO=======//
    builder.addCase(handleInsertLogo.pending, (state, action) => {
      state.logoRes = {
        data: null,
        error: null,
        loading: true,
      };
    });
    builder.addCase(handleInsertLogo.fulfilled, (state, action) => {
      state.logoRes = {
        data: action.payload,
        error: null,
        loading: false,
      };
    });
    builder.addCase(handleInsertLogo.rejected, (state, action) => {
      state.logoRes = {
        data: null,
        error: action.error.message,
        loading: false,
      };
    });
    // ======REPLACE LOGO========//
    builder.addCase(handleReplaceLogo.pending, (state, action) => {
      state.logoRes = {
        data: null,
        error: null,
        loading: true,
      };
    });
    builder.addCase(handleReplaceLogo.fulfilled, (state, action) => {
      state.logoRes = {
        data: action.payload,
        error: null,
        loading: false,
      };
    });
    builder.addCase(handleReplaceLogo.rejected, (state, action) => {
      state.logoRes = {
        data: null,
        error: action.error.message,
        loading: false,
      };
    });
    // ======INSERT BANNER========//
    builder.addCase(handleInsertBanner.pending, (state, action) => {
      state.bannerRes = {
        data: null,
        error: null,
        loading: true,
      };
    });
    builder.addCase(handleInsertBanner.fulfilled, (state, action) => {
      state.bannerRes = {
        data: action.payload,
        error: null,
        loading: false,
      };
    });
    builder.addCase(handleInsertBanner.rejected, (state, action) => {
      state.bannerRes = {
        data: null,
        error: action.error.message,
        loading: false,
      };
    });

    // =======INSERT PACKAGE======//
    builder.addCase(handleInsertPackage.pending, (state, action) => {
      state.packageRes = {
        data: null,
        error: null,
        loading: true,
      };
    });
    builder.addCase(handleInsertPackage.fulfilled, (state, action) => {
      state.packageRes = {
        data: action.payload,
        error: null,
        loading: false,
      };
    });
    builder.addCase(handleInsertPackage.rejected, (state, action) => {
      state.packageRes = {
        data: null,
        error: action.error.message,
        loading: false,
      };
    });
    // =======REPLACE PACKAGE======//
    builder.addCase(handleReplacePackage.pending, (state, action) => {
      state.packageRes = {
        data: null,
        error: null,
        loading: true,
      };
    });
    builder.addCase(handleReplacePackage.fulfilled, (state, action) => {
      state.packageRes = {
        data: action.payload,
        error: null,
        loading: false,
      };
    });
    builder.addCase(handleReplacePackage.rejected, (state, action) => {
      state.packageRes = {
        data: null,
        error: action.error.message,
        loading: false,
      };
    });

    // ==========INSERT SERVICES======//
    builder.addCase(handleInsertServ.pending, (state, action) => {
      state.serviceRes = {
        data: null,
        error: null,
        loading: true,
      };
    });
    builder.addCase(handleInsertServ.fulfilled, (state, action) => {
      state.serviceRes = {
        data: action.payload,
        error: null,
        loading: false,
      };
    });
    builder.addCase(handleInsertServ.rejected, (state, action) => {
      state.serviceRes = {
        data: null,
        error: action.error.message,
        loading: false,
      };
    });
    // =========REPLACE SERVICES=======//
    builder.addCase(handleReplaceServ.pending, (state, action) => {
      state.serviceRes = {
        data: null,
        error: null,
        loading: true,
      };
    });
    builder.addCase(handleReplaceServ.fulfilled, (state, action) => {
      state.serviceRes = {
        data: action.payload,
        error: null,
        loading: false,
      };
    });
    builder.addCase(handleReplaceServ.rejected, (state, action) => {
      state.serviceRes = {
        data: null,
        error: action.error.message,
        loading: false,
      };
    });

    // ========INSERT OTHERS=======//
    builder.addCase(handleInsertOther.pending, (state, action) => {
      state.otherRes = {
        data: null,
        error: null,
        loading: true,
      };
    });
    builder.addCase(handleInsertOther.fulfilled, (state, action) => {
      state.otherRes = {
        data: action.payload,
        error: null,
        loading: false,
      };
    });
    builder.addCase(handleInsertOther.rejected, (state, action) => {
      state.otherRes = {
        data: null,
        error: action.error.message,
        loading: false,
      };
    });

    // ======REPLACE OTHERS=======//
    builder.addCase(handleReplaceOther.pending, (state, action) => {
      state.otherRes = {
        data: null,
        error: null,
        loading: true,
      };
    });
    builder.addCase(handleReplaceOther.fulfilled, (state, action) => {
      state.otherRes = {
        data: action.payload,
        error: null,
        loading: false,
      };
    });
    builder.addCase(handleReplaceOther.rejected, (state, action) => {
      state.otherRes = {
        data: null,
        error: action.error.message,
        loading: false,
      };
    });
    // ==========
  },
});
export const {emptyLocalImgs, emptyPackage, emptyService, emptyOther} =
  gallerySlice.actions;
export default gallerySlice.reducer;
