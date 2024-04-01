import axios from 'axios';
import {endpoints} from '../../endpoints';
import {showMessage, hideMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearRegStates} from '../controllers/AuthControllers';

// =======GET OTP========//
export const getOtpService = async ({name, phoneNumber, type}) => {
  let body = {
    phone_number: phoneNumber,
    point_of_contact_name: name,
    phone_number_extension: '+91',
    vendor_type: type,
  };
  try {
    let res = await axios.post(
      `${endpoints.baseUrl}register-vendor-send-otp`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    if (res.data.status == 'success') {
      showMessage({
        message: 'Otp Sent!',
        description: 'Otp sent to your registered mobile number.',
        type: 'success',
      });
    }
    return res;
  } catch (error) {
    if (error.response && error.response.data) {
      showMessage({
        message: 'Request Failed!',
        description: error.response.data.message,
        type: 'danger',
      });
      return error.response.data;
    } else {
      return error.message;
    }
  }
};
// =======GET LOGIN OTP========//
export const getLoginOtpService = async ({companyId, password}) => {
  let body = {
    company_id: companyId,
    password: password,
  };
  try {
    let res = await axios.post(
      `${endpoints.baseUrl}login-vendor-send-otp`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    if (res.data.status == 'success') {
      showMessage({
        message: 'Otp Sent!',
        description: 'Otp sent to your registered mobile number.',
        type: 'success',
      });
    }
    return res;
  } catch (error) {
    if (error.response && error.response.data) {
      showMessage({
        message: 'Request Failed!',
        description: error.response.data.message,
        type: 'danger',
      });
      return error.response.data;
    } else {
      return error.message;
    }
  }
};
// =======VERIFY OTP========//
export const verifyOtpService = async ({
  phoneNumber,
  otp,
  type,
  navigation,
  dispatch,
}) => {
  let body = {
    phone_number: phoneNumber,
    otp_code: otp,
    vendor_type: type,
  };
  try {
    let res = await axios.post(
      `${endpoints.baseUrl}register-vendor-verify-otp`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    if (res.data.status == 'success') {
      showMessage({
        message: 'Otp Verified!',
        description: 'Otp Verified Successfully.',
        type: 'success',
      });
      dispatch(clearRegStates());
      navigation.navigate('Location');
    }
    return res;
  } catch (error) {
    if (error.response && error.response.data) {
      showMessage({
        message: 'Request Failed!',
        description: error.response.data.message,
        type: 'danger',
      });
      return error.response.data;
    } else {
      return error.message;
    }
  }
};
// =======VERIFY LOGIN OTP========//
export const verifyLoginOtpService = async ({
  companyId,
  otp,
  navigation,
  dispatch,
}) => {
  let body = {
    company_id: companyId,
    otp_code: otp,
  };
  try {
    let res = await axios.post(
      `${endpoints.baseUrl}login-vendor-verify-otp`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    if (res.data.status == 'success') {
      showMessage({
        message: 'Otp Verified!',
        description: 'Otp Verified Successfully.',
        type: 'success',
      });
      dispatch(clearRegStates());
      navigation.navigate('HomeStack');
    }
    return res;
  } catch (error) {
    if (error.response && error.response.data) {
      showMessage({
        message: 'Request Failed!',
        description: error.response.data.message,
        type: 'danger',
      });
      return error.response.data;
    } else {
      return error.message;
    }
  }
};
// =======RESEND OTP========//
export const resendOtpService = async ({phoneNumber, type}) => {
  let body = {
    phone_number: phoneNumber,
    vendor_type: type,
  };
  try {
    let res = await axios.post(
      `${endpoints.baseUrl}register-vendor-resend-otp`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    if (res.data.status == 'success') {
      showMessage({
        message: 'Otp sent!',
        description: 'Otp sent to your registered mobile number.',
        type: 'success',
      });
      navigation.navigate('Location');
    }
    return res;
  } catch (error) {
    if (error.response && error.response.data) {
      showMessage({
        message: 'Request Failed!',
        description: error.response.data.message,
        type: 'danger',
      });
      return error.response.data;
    } else {
      return error.message;
    }
  }
};
// =====PROFILE UPDATE========//
export const profileUpdateService = async ({
  serviceName,
  name,
  companyPhone,
  landline1,
  landline2,
  navigation,
}) => {
  let body = {
    vendor_service_name: serviceName,
    point_of_contact_name: name,
    business_phone_number: companyPhone,
    landline_number: landline1,
    whatsapp_business_phone_number: landline2,
  };
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.post(
      `${endpoints.baseUrl}register-vendor-profile-update`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (res.data.status == 'success') {
      showMessage({
        message: 'Success!',
        description: 'Profile Updated Successfully.',
        type: 'success',
      });
      await AsyncStorage.setItem('profileUpdated', 'yes');
      navigation.navigate('Kyc');
    }
    return res;
  } catch (error) {
    if (error.response && error.response.data) {
      showMessage({
        message: 'Request Failed!',
        description: error.response.data.message,
        type: 'danger',
      });
      return error.response.data;
    } else {
      return error.message;
    }
  }
};
// =====PROFILE UPDATE========//
export const kycUpdateService = async ({
  aadharNo,
  panNo,
  gstinNo,
  fssaiNo,
  navigation,
}) => {
  let body = {
    aadhar_card_number: aadharNo,
    pan_number: panNo,
    gstin_number: gstinNo,
    fssai_document_filename: fssaiNo,
  };
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.post(
      `${endpoints.baseUrl}register-vendor-kyc-update`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (res.data.status == 'success') {
      showMessage({
        message: 'Success!',
        description: 'KYC Details Updated Successfully.',
        type: 'success',
      });
      navigation.navigate('HomeStack');
    }
    return res;
  } catch (error) {
    if (error.response && error.response.data) {
      showMessage({
        message: 'Request Failed!',
        description: error.response.data.message,
        type: 'danger',
      });
      return error.response.data;
    } else {
      return error.message;
    }
  }
};
