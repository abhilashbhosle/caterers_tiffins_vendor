import axios from 'axios';
import {endpoints} from '../../endpoints';
import {showMessage, hideMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearRegStates} from '../controllers/AuthControllers';
import {GOOGLE_KEY} from '@env';
import {setLocation, startLoader} from '../../redux/slicers/CommomSlicer';
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
// =======RESEND LOGIN OTP========//
export const resendLoginOtpService = async ({companyId, password}) => {
  let body = {
    company_id: companyId,
    password: password,
  };
  try {
    let res = await axios.post(
      `${endpoints.baseUrl}login-vendor-resend-otp`,
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
      console.log(error.response.data);
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
// ===========GET LOCATION===========//

export const getLocationService = async ({
  latitude,
  longitude,
  dispatch,
  navigation,
}) => {
  try {
    dispatch(startLoader(true));
    let res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_KEY}`,
    );

    let addressComponents = res.data.results[0].address_components;

    function getAddressComponent(components, typeName) {
      for (const component of components) {
        if (component.types.includes(typeName)) {
          return component.long_name;
        }
      }
      return null;
    }

    // Extracting specific components
    const area = getAddressComponent(addressComponents, 'sublocality_level_1');
    const state = getAddressComponent(
      addressComponents,
      'administrative_area_level_1',
    );
    const city = getAddressComponent(addressComponents, 'locality');
    const country = getAddressComponent(addressComponents, 'country');
    const pincode = getAddressComponent(addressComponents, 'postal_code');

    let temp = {
      street_name: area,
      area: area,
      pincode: pincode,
      latitude: latitude,
      longitude: longitude,
      address: res.data.results[0].formatted_address,
      city: city,
      state: state,
      country: country,
      formatted_address: res.data.results[0].formatted_address,
      place_id: res.data.results[0].place_id,
    };
    // console.log('temp', temp);
    await updateLocationService({temp, navigation});
    dispatch(setLocation(res.data.results[0]));
  } catch (error) {
    console.log('error in location', error);
  } finally {
    dispatch(startLoader(false));
  }
};
// ======UPDATE LOCATION=========//
export const updateLocationService = async ({temp, navigation}) => {
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.post(
      `${endpoints.baseUrl}update-vendor-location`,
      temp,
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
        description: 'Location Updated Successfully.',
        type: 'success',
      });
      navigation.navigate('Profile');
    }
    return res;
  } catch (error) {
    if (error.response && error.response.data) {
      showMessage({
        message: 'Request Failed!',
        description: error.response.data?.data_validation_errors.map((e, i) => (
          <Text>{e.msg}</Text>
        )),
        type: 'danger',
      });
      console.log('inside error in manual location', error.response.data);
      return error.response.data;
    } else {
      return error.message;
    }
  }
};

// =======GET VENDOR========//
export const getVendorDetails = async dispatch => {
  try {
    dispatch(startLoader(true));
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(`${endpoints.baseUrl}get-vendor-details`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    if (error.response && error.response.data) {
      showMessage({
        message: 'Request Failed!',
        description: error.response.data.message,
        type: 'danger',
      });
    }
  } finally {
    dispatch(startLoader(false));
  }
};
// =======GET VENDOR========//
export const getVendorPassword = async () => {
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(`${endpoints.baseUrl}get-vendor-infos`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = res?.data?.data?.password;
    console.log(responseData, 'responseData responseData');

    if (typeof responseData === 'string') {
      // Define the regular expression pattern
      let pattern = /%&\^\$(.*?)\^#*/;

      // Extract the substring using match
      let match = responseData.match(pattern);

      // Extract the password from the captured group
      let password = match ? match[1] : null;
      return password;
    }
    // return res.data.data;
  } catch (error) {
    if (error.response && error.response.data) {
      showMessage({
        message: 'Request Failed!',
        description: error.response.data.message,
        type: 'danger',
      });
    }
  }
};

// =======RESET PASSWORD SERVICE========//
export const resetPasswordService = async ({
  password,
  dispatch,
  setPassword,
  setOriginalPass,
}) => {
  let body = {
    new_password: password,
  };
  try {
    let token = await AsyncStorage.getItem('token');
    dispatch(startLoader(true));
    let res = await axios.post(
      `${endpoints.baseUrl}change-vendor-password`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.data.status == 'success') {
      setPassword(body.new_password);
      setOriginalPass(body.new_password);
      showMessage({
        message: 'Success!',
        description: `Password changed to ${password}`,
        type: 'success',
      });
    }
    return res;
  } catch (error) {
    console.log(error.response.data);
    if (error.response && error.response.data) {
      showMessage({
        message: 'Request Failed!',
        description: error.response.data.data_validation_errors.map(e => e.msg),
        type: 'danger',
      });
      return error.response.data;
    } else {
      return error.message;
    }
  } finally {
    dispatch(startLoader(false));
  }
};
