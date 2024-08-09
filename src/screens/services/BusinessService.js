import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {endpoints} from '../../endpoints';
import {showMessage} from 'react-native-flash-message';
import {startLoader} from '../../redux/slicers/CommomSlicer';
import { Text } from 'react-native';


// =====UPDATE BUSINESS-SERVICE========//

export const businessUpdateService = async ({body, dispatch}) => {
  try {
    dispatch(startLoader(true));
    let token = await AsyncStorage.getItem('token');
    let res = await axios.post(
      `${endpoints.baseUrl}update-vendor-business-profile-detailed`,
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
        description: 'Profile Updated Successfully.',
        type: 'success',
      });
    }
    return res;
  } catch (error) {
    console.log(error)
    if (error.response && error.response.data) {
      console.log(error.response.data)
      showMessage({
        message: 'Request Failed!',
        description:error.response.data?.data_validation_errors.map((e,i)=><Text key={i}>{e.msg}</Text>),
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
