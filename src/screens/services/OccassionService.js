import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {endpoints} from '../../endpoints';
import {showMessage} from 'react-native-flash-message';
import {startLoader} from '../../redux/slicers/CommomSlicer';

// ===========GET OCCASSION===========//
export const getOccassionsService = async () => {
  try {
    let token = await AsyncStorage.getItem('token');
	console.log(token)
    let res = await axios.get(`${endpoints.baseUrl}get-vendor-occasions`, {
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
      return error.response.data;
    } else {
      return error.message;
    }
  }
};
// ===========UPDATE OCCASSION===========//
export const updateOccassionsService = async ({finalData, dispatch,navigation}) => {

  try {
    dispatch(startLoader(true));
	let body = {
		occasions: JSON.stringify(finalData),
	  };
    let token = await AsyncStorage.getItem('token');
    let res = await axios.post(
      `${endpoints.baseUrl}update-vendor-occasion`,
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
        description: 'Occasions Updated Successfully.',
        type: 'success',
      });
	
		navigation.goBack()
    }
  } catch (error) {
	console.log(error)
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
