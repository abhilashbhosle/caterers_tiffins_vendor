import AsyncStorage from '@react-native-async-storage/async-storage';
import {endpoints} from '../../endpoints';
import axios from 'axios';

//=======GET CATERERS SEARCH SERVICES=======//
export const getSubscriptionListService = async ({params}) => {
	console.log("params in sub plans",params)
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(
      `${endpoints.baseUrl}rz-get-razorpay-plans`,
      {
        params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};
