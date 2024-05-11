import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {endpoints} from '../../endpoints';
import {showMessage} from 'react-native-flash-message';
import {startLoader} from '../../redux/slicers/CommomSlicer';
import {Platform} from 'react-native';

// =====INSEERT LOGO SERVICE========//

export const insertLogoService = async ({res, dispatch}) => {
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
      `${endpoints.baseUrl}upload-vendor-brand-logo`,
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
        description: 'Logo Updated Successfully.',
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
// ===REPLACE LOGO SERVICE=====//
export const replaceLogoService = async ({res,id, dispatch}) => {
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
      `${endpoints.baseUrl}upload-vendor-brand-logo`,
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
        description: 'Logo Updated Successfully.',
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
// ====INSERT BANNER SERVICE======//
export const insertBannerService = async ({res, dispatch}) => {
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
      `${endpoints.baseUrl}upload-vendor-banner-image`,
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
        description: 'Banner Updated Successfully.',
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

// =======REPLACE BANNER SERVICE========//
export const replaceBannerService = async ({res,id, dispatch}) => {
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
      `${endpoints.baseUrl}upload-vendor-banner-image`,
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
        description: 'Banner Updated Successfully.',
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
// =======DELETE LOGO SERVICE========//
export const deleteLogoService = async (id) => {
  try {
    // dispatch(startLoader(true));
    const formData = new FormData();
    formData.append('id', id);
    formData.append('image', "");
    formData.append('action_type', 'remove');
    let token = await AsyncStorage.getItem('token');
    let result = await axios.post(
      `${endpoints.baseUrl}upload-vendor-brand-logo`,
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
        description: 'Logo deleted Successfully.',
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
// =======DELETE BANNER SERVICE========//
export const deleteBannerService = async (id) => {
  try {
    // dispatch(startLoader(true));
    const formData = new FormData();
    formData.append('id', id);
    formData.append('image', "");
    formData.append('action_type', 'remove');
    let token = await AsyncStorage.getItem('token');
    let result = await axios.post(
      `${endpoints.baseUrl}upload-vendor-banner-image`,
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
        description: 'Banner deleted Successfully.',
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
// =======DELETE PACKAGE SERVICE========//
export const deletePackageService = async (id) => {
  try {
    // dispatch(startLoader(true));
    const formData = new FormData();
    formData.append('id', id);
    formData.append('image', "");
    formData.append('action_type', 'remove');
    let token = await AsyncStorage.getItem('token');
    let result = await axios.post(
      `${endpoints.baseUrl}upload-vendor-menu-image`,
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
        description: 'Photo deleted Successfully.',
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
// =======DELETE PACKAGE SERVICE========//
export const deleteService = async (id) => {
  try {
    // dispatch(startLoader(true));
    const formData = new FormData();
    formData.append('id', id);
    formData.append('image', "");
    formData.append('action_type', 'remove');
    let token = await AsyncStorage.getItem('token');
    let result = await axios.post(
      `${endpoints.baseUrl}upload-vendor-service-image`,
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
        description: 'Photo deleted Successfully.',
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
// =======DELETE PACKAGE SERVICE========//
export const deleteOtherService = async (id) => {
  try {
    // dispatch(startLoader(true));
    const formData = new FormData();
    formData.append('id', id);
    formData.append('image', "");
    formData.append('action_type', 'remove');
    let token = await AsyncStorage.getItem('token');
    let result = await axios.post(
      `${endpoints.baseUrl}upload-vendor-other-image`,
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
        description: 'Photo deleted Successfully.',
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
// =======INSERT PACKAGE SERVICE===========//
export const insertPackageService=async ({res, dispatch}) => {
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
      `${endpoints.baseUrl}upload-vendor-menu-image`,
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
        description: 'Photo added Successfully.',
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
// ====REPLACE PACKAGE======//
export const replacePackageService = async ({res,id, dispatch}) => {
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
      `${endpoints.baseUrl}upload-vendor-menu-image`,
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
        description: 'Package Updated Successfully.',
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
// ====INSERT SERVICE======//
export const insertService = async ({res, dispatch}) => {
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
      `${endpoints.baseUrl}upload-vendor-service-image`,
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
        description: 'Photo Updated Successfully.',
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
// =======REPLACE SERVICE========//
export const replaceService = async ({res,id, dispatch}) => {
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
      `${endpoints.baseUrl}upload-vendor-service-image`,
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
        description: 'Image Updated Successfully.',
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
// ====INSERT OTHER======//
export const insertOtherService = async ({res, dispatch}) => {
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
      `${endpoints.baseUrl}upload-vendor-other-image`,
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
        description: 'Photo Updated Successfully.',
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
// =======REPLACE SERVICE========//
export const replaceOtherService = async ({res,id, dispatch}) => {
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
      `${endpoints.baseUrl}upload-vendor-other-image`,
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
        description: 'Image Updated Successfully.',
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
// ===========GET GALLERY===========//
export const gateGalleryService = async ({dispatch, loading}) => {
  try {
    if (loading) {
      dispatch(startLoader(true));
    }
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(`${endpoints.baseUrl}get-vendor-gallery-images`, {
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
