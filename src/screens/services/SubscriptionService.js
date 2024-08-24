import AsyncStorage from '@react-native-async-storage/async-storage';
import {endpoints} from '../../endpoints';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import {startLoader} from '../../redux/slicers/CommomSlicer';

//=======GET CATERERS SEARCH SERVICES=======//
export const getSubscriptionListService = async ({params}) => {
  console.log('params in sub plans', params);
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(`${endpoints.baseUrl}rz-get-razorpay-plans`, {
      params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

// =========CALCULATE ORDER TOTAL=========//
export const calculatePayService = async ({body, dispatch}) => {
  try {
    dispatch(startLoader(true));
    let token = await AsyncStorage.getItem('token');
    let res = await axios.post(
      `${endpoints.baseUrl}rz-calculate-order-total`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.log(error);
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

// =========HANDLE PAY SERVICE=======//

export const handlePayService = async ({body, dispatch}) => {
  console.log(body);
  try {
    dispatch(startLoader(true));
    let token = await AsyncStorage.getItem('token');
    console.log(token);

    let res = await axios.post(
      `${endpoints.baseUrl}rz-create-one-time-payment`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.log(error);
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


