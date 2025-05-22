import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {endpoints} from '../../endpoints';
import {showMessage} from 'react-native-flash-message';
import {startLoader} from '../../redux/slicers/CommomSlicer';
import { getBranch } from '../controllers/BranchController';



// =====GET CREDS========//
export const getCredentials = async ({phone,dispatch}) => {
  try {
    let body={
		phone_number:Number(phone)
    }
    dispatch(startLoader(true));
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(
      `${endpoints.baseUrl}get-vendor-creds`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      },
    );
 
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
  } finally {
    dispatch(startLoader(false));
  }
};
// ===GET VENDOR FSSAI NUMBER===///
export const getVendorFSNum = async () => {
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(
      `${endpoints.baseUrl}get-vendor-enc-info`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      },
    );
 
    return res.data;
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

// ===========GET SETTING DETAILS===========//
export const getSettings = async ({dispatch, loading}) => {
  try {
    if (loading) {
      dispatch(startLoader(true));
    }
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(`${endpoints.baseUrl}get-vendor-settings-info`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    if (error.response && error.response.data) {
      // showMessage({
      //   message: 'Request Failed!',
      //   description: error.response.data.message,
      //   type: 'danger',
      // });
      return error.response.data;
    } else {
      return error.message;
    }
  } finally {
    dispatch(startLoader(false));
  }
};
// =========UPDATE PROFILE==========//
export const updateProfileService = async ({body, dispatch}) => {
  try {
      dispatch(startLoader(true));
    let token = await AsyncStorage.getItem('token');
    let res = await axios.post(`${endpoints.baseUrl}send-update-vendor-profile-otp`, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });
    showMessage({
      message: 'Success!',
      description: "Otp sent successfully.",
      type: 'success',
    });
    return res;
  } catch (error) {
    console.log(error)
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
  } finally {
    dispatch(startLoader(false));
  }
};
// UPDATE OTP
export const updateOtpService = async ({body, dispatch}) => {
  try {
      dispatch(startLoader(true));
    let token = await AsyncStorage.getItem('token');
    let res = await axios.post(`${endpoints.baseUrl}update-vendor-phone`, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });
    showMessage({
      message: 'Success!',
      description: "Otp verified successfully.",
      type: 'success',
    });
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
  } finally {
    dispatch(startLoader(false));
  }
};
// ====INSERT AADHAR======//
export const insertAadharService = async ({res, dispatch}) => {
  console.log('entered inside aadhar service')
	try {
	  // dispatch(startLoader(true));
	  const formData = new FormData();
	  formData.append('id', '');
	  formData.append('image', {
		uri: res.path,
		name: res.filename || 'img',
		type: res.mime,
	  });
	  formData.append('action_type', 'insert');
	  let token = await AsyncStorage.getItem('token');
	  let result = await axios.post(
		`${endpoints.baseUrl}upload-vendor-enca`,
		formData,
		{
		  headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: `Bearer ${token}`,
		  },
		},
	  );
	  if (result.data.status == 'success') {
		showMessage({
		  message: 'Success!',
		  description: 'Aadhar Updated Successfully.',
		  type: 'success',
		});
	  }
	  return result;
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
	} finally {
	  // dispatch(startLoader(false));
	}
  };

  // =====REPLACE AADHAR=====//
  export const replaceAadharService = async ({res,id, dispatch}) => {
    try {
      // dispatch(startLoader(true));
      const formData = new FormData();
      formData.append('id', id);
      formData.append('image', {
      uri: res.path,
      name: res.filename || 'img',
      type: res.mime,
      });
      formData.append('action_type', 'replace');
      let token = await AsyncStorage.getItem('token');
      let result = await axios.post(
      `${endpoints.baseUrl}upload-vendor-enca`,
      formData,
      {
        headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        },
      },
      );
      if (result.data.status == 'success') {
      showMessage({
        message: 'Success!',
        description: 'Aadhar Updated Successfully.',
        type: 'success',
      });
      }
      return result;
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
    } finally {
      // dispatch(startLoader(false));
    }
    };
    // ====INSERT AADHAR BACK======//
export const insertAadharBackService = async ({res, dispatch}) => {
  console.log('entered inside aadhar service')
	try {
	  // dispatch(startLoader(true));
	  const formData = new FormData();
	  formData.append('id', '');
	  formData.append('image', {
		uri: res.path,
		name: res.filename || 'img',
		type: res.mime,
	  });
	  formData.append('action_type', 'insert');
	  let token = await AsyncStorage.getItem('token');
	  let result = await axios.post(
		`${endpoints.baseUrl}upload-vendor-enca-back`,
		formData,
		{
		  headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: `Bearer ${token}`,
		  },
		},
	  );
	  if (result.data.status == 'success') {
		showMessage({
		  message: 'Success!',
		  description: 'Aadhar Updated Successfully.',
		  type: 'success',
		});
	  }
	  return result;
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
	} finally {
	  // dispatch(startLoader(false));
	}
  };

  // =====REPLACE AADHAR=====//
  export const replaceAadharBackService = async ({res,id, dispatch}) => {
    try {
      // dispatch(startLoader(true));
      const formData = new FormData();
      formData.append('id', id);
      formData.append('image', {
      uri: res.path,
      name: res.filename || 'img',
      type: res.mime,
      });
      formData.append('action_type', 'replace');
      let token = await AsyncStorage.getItem('token');
      let result = await axios.post(
      `${endpoints.baseUrl}upload-vendor-enca-back`,
      formData,
      {
        headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        },
      },
      );
      if (result.data.status == 'success') {
      showMessage({
        message: 'Success!',
        description: 'Aadhar Updated Successfully.',
        type: 'success',
      });
      }
      return result;
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
    } finally {
      // dispatch(startLoader(false));
    }
    };
    // =======DELETE AADHAR SERVICE========//
export const deleteAadharService = async (id) => {
  try {
    // dispatch(startLoader(true));
    const formData = new FormData();
    formData.append('id', id);
    formData.append('image', "");
    formData.append('action_type', 'remove');
    let token = await AsyncStorage.getItem('token');
    let result = await axios.post(
      `${endpoints.baseUrl}upload-vendor-enca`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (result.data.status == 'success') {
      showMessage({
        message: 'Success!',
        description: 'Aadhar deleted Successfully.',
        type: 'success',
      });
    }
    return result;
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
  } finally {
    // dispatch(startLoader(false));
  }
};
   // =======DELETE AADHAR SERVICE========//
   export const deleteAadharBackService = async (id) => {
    try {
      // dispatch(startLoader(true));
      const formData = new FormData();
      formData.append('id', id);
      formData.append('image', "");
      formData.append('action_type', 'remove');
      let token = await AsyncStorage.getItem('token');
      let result = await axios.post(
        `${endpoints.baseUrl}upload-vendor-enca-back`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (result.data.status == 'success') {
        showMessage({
          message: 'Success!',
          description: 'Aadhar deleted Successfully.',
          type: 'success',
        });
      }
      return result;
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
    } finally {
      // dispatch(startLoader(false));
    }
  };
// ====INSERT PAN======//
export const insertPanService = async ({res, dispatch}) => {
  console.log('entered inside aadhar service')
	try {
	  // dispatch(startLoader(true));
	  const formData = new FormData();
	  formData.append('id', '');
	  formData.append('image', {
		uri: res.path,
		name: res.filename || 'img',
		type: res.mime,
	  });
	  formData.append('action_type', 'insert');
	  let token = await AsyncStorage.getItem('token');
	  let result = await axios.post(
		`${endpoints.baseUrl}upload-vendor-encp`,
		formData,
		{
		  headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: `Bearer ${token}`,
		  },
		},
	  );
	  if (result.data.status == 'success') {
		showMessage({
		  message: 'Success!',
		  description: 'PAN Updated Successfully.',
		  type: 'success',
		});
	  }
	  return result;
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
	} finally {
	  // dispatch(startLoader(false));
	}
  };

  // =====REPLACE PAN=====//
  export const replacePanService = async ({res,id, dispatch}) => {
    try {
      // dispatch(startLoader(true));
      const formData = new FormData();
      formData.append('id', id);
      formData.append('image', {
      uri: res.path,
      name: res.filename || 'img',
      type: res.mime,
      });
      formData.append('action_type', 'replace');
      let token = await AsyncStorage.getItem('token');
      let result = await axios.post(
      `${endpoints.baseUrl}upload-vendor-encp`,
      formData,
      {
        headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        },
      },
      );
      if (result.data.status == 'success') {
      showMessage({
        message: 'Success!',
        description: 'PAN Updated Successfully.',
        type: 'success',
      });
      }
      return result;
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
    } finally {
      // dispatch(startLoader(false));
    }
    };
        // =======DELETE PAN SERVICE========//
export const deletePanService = async (id) => {
  try {
    // dispatch(startLoader(true));
    const formData = new FormData();
    formData.append('id', id);
    formData.append('image', "");
    formData.append('action_type', 'remove');
    let token = await AsyncStorage.getItem('token');
    let result = await axios.post(
      `${endpoints.baseUrl}upload-vendor-encp`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (result.data.status == 'success') {
      showMessage({
        message: 'Success!',
        description: 'PAN deleted Successfully.',
        type: 'success',
      });
    }
    return result;
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
  } finally {
    // dispatch(startLoader(false));
  }
};
// ====INSERT FSSAI======//
export const insertFsService = async ({res, dispatch}) => {
  console.log('entered inside aadhar service')
	try {
	  // dispatch(startLoader(true));
	  const formData = new FormData();
	  formData.append('id', '');
	  formData.append('image', {
		uri: res.path,
		name: res.filename || 'img',
		type: res.mime,
	  });
	  formData.append('action_type', 'insert');
	  let token = await AsyncStorage.getItem('token');
	  let result = await axios.post(
		`${endpoints.baseUrl}upload-vendor-encf`,
		formData,
		{
		  headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: `Bearer ${token}`,
		  },
		},
	  );
	  if (result.data.status == 'success') {
		showMessage({
		  message: 'Success!',
		  description: 'FSSAI License Updated Successfully.',
		  type: 'success',
		});
	  }
	  return result;
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
	} finally {
	  // dispatch(startLoader(false));
	}
  };

  // =====REPLACE FSSAI=====//
  export const replaceFsService = async ({res,id, dispatch}) => {
    try {
      // dispatch(startLoader(true));
      const formData = new FormData();
      formData.append('id', id);
      formData.append('image', {
      uri: res.path,
      name: res.filename || 'img',
      type: res.mime,
      });
      formData.append('action_type', 'replace');
      let token = await AsyncStorage.getItem('token');
      let result = await axios.post(
      `${endpoints.baseUrl}upload-vendor-encf`,
      formData,
      {
        headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        },
      },
      );
      if (result.data.status == 'success') {
      showMessage({
        message: 'Success!',
        description: 'FSSAI License Updated Successfully.',
        type: 'success',
      });
      }
      return result;
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
    } finally {
      // dispatch(startLoader(false));
    }
    };
       // =======DELETE FSSAI SERVICE========//
export const deleteFsService = async (id) => {
  try {
    // dispatch(startLoader(true));
    const formData = new FormData();
    formData.append('id', id);
    formData.append('image', "");
    formData.append('action_type', 'remove');
    let token = await AsyncStorage.getItem('token');
    let result = await axios.post(
      `${endpoints.baseUrl}upload-vendor-encp`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (result.data.status == 'success') {
      showMessage({
        message: 'Success!',
        description: 'FSSAI license deleted Successfully.',
        type: 'success',
      });
    }
    return result;
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
  } finally {
    // dispatch(startLoader(false));
  }
};
// =====SUBMIT GSTIN========//
export const updateGstinService = async ({number,dispatch}) => {
  try {
    let body={
      gstin_number:number
    }
    dispatch(startLoader(true));
    let token = await AsyncStorage.getItem('token');
    let res = await axios.post(
      `${endpoints.baseUrl}update-vendor-gs`,
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
        description: 'GSTIN Number Updated Successfully.',
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
  } finally {
    dispatch(startLoader(false));
  }
};

//====SUBMIT FSSAI=========//
export const updateFssaiService = async ({fssai_number,company_id,phone_number,dispatch}) => {
    let vendor_id= await JSON.parse(AsyncStorage.getItem("vendor_id"));
  try {
    let body={
      fssai_number,
      vendor_id,
      company_id,
      phone_number
    }
    dispatch(startLoader(true));
    let token = await AsyncStorage.getItem('token');
    let res = await axios.post(
      `${endpoints.baseUrl}vendor-update-enc`,
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
        description: 'FSSAI Number Updated Successfully.',
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
  } finally {
    dispatch(startLoader(false));
  }
};