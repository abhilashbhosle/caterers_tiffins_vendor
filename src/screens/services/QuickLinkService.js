import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {endpoints} from '../../endpoints';
import {showMessage} from 'react-native-flash-message';

// ===========GET QuickLink===========//
export const getQuickLink = async () => {
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(
      `${endpoints.baseUrl}list-vendor-quick-create`,
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
		console.log("error in getQuickLink",error.response.data);
      return error.response.data;
    } else {
      return error.message;
    }
  }
};