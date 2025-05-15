import messaging from '@react-native-firebase/messaging';
import {getVendorDetails, manageFcmToken} from '../services/AuthServices';
import DeviceInfo from 'react-native-device-info';
import {Alert, Linking, Platform} from 'react-native';
export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('✅ Notification permission granted.');
    const fcmToken = await messaging().getToken();
    const vendorDetails = await getVendorDetails();
    const vendor = vendorDetails?.data?.data;
    const deviceId = DeviceInfo.getDeviceId();
    console.log('vendorDetails', vendor);
    console.log('deviceId', deviceId);
    if (vendor?.fcm_tokens?.length == 0) {
      await manageFcmToken(fcmToken, deviceId, 'add');
    } else {
      const tokenExists = vendor?.fcm_tokens?.some(
        token => token?.fcm_token === fcmToken,
      );
      const deviceExists = vendor?.fcm_tokens?.some(
        token => token?.device_id === deviceId,
      );
      console.log('tokenExists', tokenExists, deviceExists);
      // if token expired for the same device.
      if (!tokenExists && deviceExists) {
        await manageFcmToken(fcmToken, deviceId, 'delete');
        setTimeout(async () => {
          await manageFcmToken(fcmToken, deviceId, 'add');
        }, 2000);
      }
      // If same user with different device.
      else if (!tokenExists && !deviceExists) {
        await manageFcmToken(fcmToken, deviceId, 'add');
      }
    }
    console.log('📱 FCM Token:', fcmToken);
  } else {
    console.log('❌ Notification permission not granted');
    Alert.alert(
      'Notifications Disabled',
      'Please enable notifications in settings to receive important updates.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Go to Settings',
          onPress: () => {
            if (Platform.OS === 'ios') {
              Linking.openURL('app-settings:');
            } else {
              Linking.openSettings();
            }
          },
        },
      ],
      {cancelable: true},
    );
  }
};
