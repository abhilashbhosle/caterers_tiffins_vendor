import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {endpoints} from '../../endpoints';
import {showMessage} from 'react-native-flash-message';
import {startLoader} from '../../redux/slicers/CommomSlicer';

// ===========GET CUISINE===========//
export const getCuisineService = async () => {
  try {
    let token = await AsyncStorage.getItem('token');
    let res = await axios.get(`${endpoints.baseUrl}get-vendor-cuisines`, {
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
// ===========UPDATE CUISINE===========//
export const updateCuisinesService = async ({finalData, dispatch,navigation}) => {

  try {
    dispatch(startLoader(true));
	let body = {
		cuisines: JSON.stringify(finalData),
	  };
    let token = await AsyncStorage.getItem('token');
    let res = await axios.post(
      `${endpoints.baseUrl}update-vendor-cuisine`,
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
        description: 'Cuisines Updated Successfully.',
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
