import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {endpoints} from '../../endpoints';
import {showMessage} from 'react-native-flash-message';
import {startLoader} from '../../redux/slicers/CommomSlicer';
import { Platform } from 'react-native';


// =====UPDATE BUSINESS-SERVICE========//

export const insertLogoService = async ({res,dispatch}) => {
  try {
    // dispatch(startLoader(true));
	const formData = new FormData();
	formData.append('id', '');
	formData.append('image',
  {
     uri:res.path,
     name:res.filename,
     type:res.mime
  });
	formData.append('action_type', 'insert')
    let token = await AsyncStorage.getItem('token');
    let result = await axios.post(
      `${endpoints.baseUrl}upload-vendor-brand-logo`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (result.data.status == 'success') {
      showMessage({
        message: 'Success!',
        description: 'Logo Updated Successfully.',
        type: 'success',
      });
    }
    return result;
  } catch (error) {
    if (error.response && error.response.data) {
      showMessage({
        message: 'Request Failed!',
        description:error.response.data.message,
        type: 'danger',
      });
      return error.response.data;
    } else {
      return error.message;
    }
  } finally {
    // dispatch(startLoader(false));
  }
};
