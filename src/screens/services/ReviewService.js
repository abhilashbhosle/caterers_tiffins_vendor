import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {endpoints} from '../../endpoints';
import {showMessage} from 'react-native-flash-message';
import {startLoader} from '../../redux/slicers/CommomSlicer';

// ===========GET REVIEWS===========//
export const getReviwService = async ({limit, page, sort}) => {
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(
      `${endpoints.baseUrl}get-vendor-reviews?current_page=${page}&limit=${limit}&order_by=${sort}`,
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
