import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  getLocationService,
  getLoginOtpService,
  getOtpService,
  kycUpdateService,
  profileUpdateService,
  resendLoginOtpService,
  resendOtpService,
  verifyLoginOtpService,
  verifyOtpService,
} from '../services/AuthServices';
import {asyncToken, startLoader} from '../../redux/slicers/CommomSlicer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location';
// ======GET OTP=======//
export const getOtp = createAsyncThunk(
  'getOtp',
  async ({name, phoneNumber, type}, {dispatch}) => {
    try {
      dispatch(startLoader(true));
      const res = await getOtpService({name, phoneNumber, type});
      return res.data;
    } catch (error) {
      return error;
    } finally {
      dispatch(startLoader(false));
    }
  },
);
// ======GET LOGIN OTP=======//
export const getLoginOtp = createAsyncThunk(
  'getLoginOtp',
  async ({companyId, password}, {dispatch}) => {
    try {
      dispatch(startLoader(true));
      const res = await getLoginOtpService({companyId, password});
      return res.data;
    } catch (error) {
      return error;
    } finally {
      dispatch(startLoader(false));
    }
  },
);
// ======VERIFY OTP=======//
export const verifyOtp = createAsyncThunk(
  'verifyOtp',
  async (
    {phoneNumber, otp, type, navigation, setEnableSubmitOtp},
    {dispatch},
  ) => {
    try {
      dispatch(startLoader(true));
      const res = await verifyOtpService({
        phoneNumber,
        otp,
        type,
        navigation,
        dispatch,
      });
      console.log('response', res.data);
      await AsyncStorage.setItem('token', res.data.data.accessToken);
      await AsyncStorage.setItem('refreshToken', res.data.data.refreshToken);
      await AsyncStorage.setItem('profileUpdated', 'No');
      setEnableSubmitOtp(false);
      return res.data;
    } catch (error) {
      return error;
    } finally {
      dispatch(startLoader(false));
    }
  },
);
// ======VERIFY LOGIN OTP=======//
export const verifyLoginOtp = createAsyncThunk(
  'verifyLoginOtp',
  async ({companyId, otp, navigation, setEnableSubmitOtp}, {dispatch}) => {
    try {
      dispatch(startLoader(true));
      const res = await verifyLoginOtpService({
        companyId,
        otp,
        navigation,
        dispatch,
      });
      console.log('response', res.data);
      await AsyncStorage.setItem('token', res.data.data.accessToken);
      await AsyncStorage.setItem('refreshToken', res.data.data.refreshToken);
      setEnableSubmitOtp(false);
      return res.data;
    } catch (error) {
      return error;
    } finally {
      dispatch(startLoader(false));
    }
  },
);
// ======RESEND OTP=======//
export const resendOtp = createAsyncThunk(
  'resendOtp',
  async ({phoneNumber, type}, {dispatch}) => {
    try {
      dispatch(startLoader(true));
      const res = await resendOtpService({phoneNumber, type});
      return res.data;
    } catch (error) {
      return error;
    } finally {
      dispatch(startLoader(false));
    }
  },
);
// ======RESEND LOGIN OTP=======//
export const resendLoginOtp = createAsyncThunk(
  'resendLoginOtp',
  async ({companyId, password}, {dispatch}) => {
    try {
      dispatch(startLoader(true));
      const res = await resendLoginOtpService({companyId, password});
      return res.data;
    } catch (error) {
      return error;
    } finally {
      dispatch(startLoader(false));
    }
  },
);
// ======PROFILE UPDATE========//
export const profileUpdate = createAsyncThunk(
  'profileUpdate',
  async (
    {serviceName, name, companyPhone, landline1, landline2, navigation},
    {dispatch},
  ) => {
    try {
      dispatch(startLoader(true));
      const res = await profileUpdateService({
        serviceName,
        name,
        companyPhone,
        landline1,
        landline2,
        navigation,
      });
      return res.data;
    } catch (error) {
      return error;
    } finally {
      dispatch(startLoader(false));
    }
  },
);

// ======PROFILE UPDATE========//
export const kycUpdate = createAsyncThunk(
  'kycUpdate',
  async ({aadharNo, panNo, gstinNo, fssaiNo, navigation}, {dispatch}) => {
    try {
      dispatch(startLoader(true));
      const res = await kycUpdateService({
        aadharNo,
        panNo,
        gstinNo,
        fssaiNo,
        navigation,
      });
      return res.data;
    } catch (error) {
      return error;
    } finally {
      dispatch(startLoader(false));
    }
  },
);
// ======PROFILE UPDATE========//
export const getLocation = createAsyncThunk(
  'getLocation',
  async ({navigation}, {dispatch}) => {
    try {
      dispatch(startLoader(true))
      let res = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      });
      console.log("location",res)
      if(res){
        getLocationService({latitude:res.latitude,longitude:res.longitude,dispatch,navigation})
      }
      return res;
    } catch (error) {
      return error;
    } finally {
      dispatch(startLoader(false));
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isGetOtpLoading: false,
    getOtpData: [],
    getOtpError: '',
    isGetLoginOtpLoading: false,
    getLoginOtpData: [],
    getLoginOtpError: '',
  },
  reducers: {
    clearRegStates: (state, action) => {
      console.log('clear reg states got called');
      state.isGetOtpLoading = false;
      state.getOtpData = [];
      state.getOtpError = '';
      (state.isGetLoginOtpLoading = false), (state.getLoginOtpData = []);
      state.getLoginOtpError = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getOtp.pending, (state, action) => {
        state.isGetOtpLoading = true;
        state.getOtpError = null; // Reset error state
      })
      .addCase(getOtp.fulfilled, (state, action) => {
        state.isGetOtpLoading = false;
        state.getOtpData = action.payload;
      })
      .addCase(getOtp.rejected, (state, action) => {
        state.isGetOtpLoading = false;
        state.getOtpError = action.error;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.getOtpData = action.payload;
      })
      .addCase(resendLoginOtp.fulfilled, (state, action) => {
        state.getLoginOtpData = action.payload;
      })
      .addCase(getLoginOtp.pending, (state, action) => {
        state.isGetLoginOtpLoading = true;
        state.getLoginOtpError = null; // Reset error state
      })
      .addCase(getLoginOtp.fulfilled, (state, action) => {
        state.isGetLoginOtpLoading = false;
        state.getLoginOtpData = action.payload;
      })
      .addCase(getLoginOtp.rejected, (state, action) => {
        state.isGetLoginOtpLoading = false;
        state.getLoginOtpError = action.error;
      });
  },
});
export const {clearRegStates} = authSlice.actions;
export default authSlice.reducer;
