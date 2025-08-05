import AsyncStorage from '@react-native-async-storage/async-storage';
import {endpoints} from '../../endpoints';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import {startLoader} from '../../redux/slicers/CommomSlicer';
import {getQueuedSubscription} from '../controllers/SubscriptionController';

//=======GET CATERERS SEARCH SERVICES=======//
export const getSubscriptionListService = async ({params}) => {
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(
      `${endpoints.baseUrl}rz-get-razorpay-plans?${params?.vendor_type}`,
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
  try {
    dispatch(startLoader(true));
    let token = await AsyncStorage.getItem('token');
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
    console.log("error",error);
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

// =========HANDLE SUBSCRIPTION SERVICE=======//

export const handleSubscriptionService = async ({body, dispatch}) => {
  try {
    dispatch(startLoader(true));
    let token = await AsyncStorage.getItem('token');

    let res = await axios.post(
      `${endpoints.baseUrl}rz-create-subscription`,
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

export const cancelOneTime = async ({body, dispatch}) => {
  try {
    dispatch(startLoader(true));
    let token = await AsyncStorage.getItem('token');

    let res = await axios.post(
      `${endpoints.baseUrl}rz-cancel-local-one-time-payment`,
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

export const cancelRecurring = async ({body, dispatch}) => {
  try {
    dispatch(startLoader(true));
    let token = await AsyncStorage.getItem('token');

    let res = await axios.post(
      `${endpoints.baseUrl}rz-cancel-local-recurring-payment`,
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

//=======GET QUEUED SUBSCRIPTION SERVICES=======//
export const getQueuedSubscriptionService = async () => {
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(
      `${endpoints.baseUrl}rz-get-current-active-and-queued-subscriptions`,
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
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
};

// =========CANCEL SUBSCRIPTION========//
export const cancelSubscriptionService = async ({
  subscription_id,
  dispatch,
}) => {
  try {
    dispatch(startLoader(true));
    let token = await AsyncStorage.getItem('token');
    console.log(subscription_id);
    let res = await axios.post(
      `${endpoints.baseUrl}vendor-rz-cancel-subscription`,
      {
        subscription_id,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    setTimeout(() => {
      dispatch(getQueuedSubscription());
    }, 1000);
    return res.data;
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
