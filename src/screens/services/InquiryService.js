import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {endpoints} from '../../endpoints';
import {showMessage} from 'react-native-flash-message';

// ===========GET INQUIRY===========//
export const getInquiryService = async ({limit, page, sort,date,search}) => {
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(
      `${endpoints.baseUrl}get-vendor-enquiries?search_term=${search}&enquiry_date=${date}&limit=${limit}&current_page=${page}&order_by=${sort}`,
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
      // showMessage({
      //   message: 'Request Failed!',
      //   description: error.response.data.message,
      //   type: 'danger',
      // });
      return error.response.data;
    } else {
      return error.message;
    }
  }
};
