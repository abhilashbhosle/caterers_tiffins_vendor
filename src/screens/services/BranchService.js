import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {endpoints} from '../../endpoints';
import {showMessage} from 'react-native-flash-message';
import {startLoader} from '../../redux/slicers/CommomSlicer';
import { getBranch } from '../controllers/BranchController';

// ===========GET BRANCH===========//
export const getBranchService = async () => {
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(
      `${endpoints.baseUrl}get-vendor-branches`,
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
  }
};
// =====INSERT BRANCH========//
export const addBranchService = async ({body, dispatch,navigation}) => {
  try {
    dispatch(startLoader(true));
    let token = await AsyncStorage.getItem('token');
    let res = await axios.post(
      `${endpoints.baseUrl}insert-vendor-branch`,
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
        description: 'Branch Added Successfully.',
        type: 'success',
      });
      navigation.goBack()
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
// =====UPDATE STATUS========//
export const updateStatusService = async ({id, status,dispatch}) => {
  try {
    let body={
      branch_id:id,
      status:status
    }
    dispatch(startLoader(true));
    let token = await AsyncStorage.getItem('token');
    let res = await axios.post(
      `${endpoints.baseUrl}update-vendor-branch-status`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (res.data.status == 'success') {
      dispatch(getBranch());
      showMessage({
        message: 'Success!',
        description: 'Status Updated Successfully.',
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
export const editBranchService = async ({body, dispatch,navigation}) => {
  try {
    dispatch(startLoader(true));
    let token = await AsyncStorage.getItem('token');
    let res = await axios.post(
      `${endpoints.baseUrl}update-vendor-branch`,
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
        description: 'Branch Edited Successfully.',
        type: 'success',
      });
      navigation.goBack()
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
