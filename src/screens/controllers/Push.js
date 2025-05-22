import {Platform, PermissionsAndroid, Alert, Linking} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import { getVendorDetails, manageFcmToken } from '../services/AuthServices';

export const requestUserPermission = async () => {
  let enabled = false;

  if (Platform.OS === 'ios') {
    // iOS: Request permission
    const authStatus = await messaging().requestPermission();
    enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('✅ iOS notification permission granted.');
    }
  } else if (Platform.OS === 'android') {
    // Android: For API level 33+ request POST_NOTIFICATIONS permission
    const sdkInt = parseInt(DeviceInfo.getSystemVersion(), 10);
    if (sdkInt >= 13) {
      const res = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      enabled = res === PermissionsAndroid.RESULTS.GRANTED;

      if (enabled) {
        console.log('✅ Android notification permission granted.');
      }
    } else {
      // Below API 33, no permission is needed
      enabled = true;
      console.log('ℹ️ Android version < 13, no explicit notification permission required.');
    }
  }

  if (enabled) {
    const fcmToken = await messaging().getToken();
    const vendorDetails = await getVendorDetails();
    const vendor = vendorDetails?.data?.data;
    const deviceId = DeviceInfo.getDeviceId();
    console.log('vendorDetails', vendor);
    console.log('deviceId', deviceId);

    if (vendor?.fcm_tokens?.length === 0) {
      await manageFcmToken(fcmToken, deviceId, 'add');
    } else {
      const tokenExists = vendor?.fcm_tokens?.some(
        token => token?.fcm_token === fcmToken,
      );
      const deviceExists = vendor?.fcm_tokens?.some(
        token => token?.device_id === deviceId,
      );
      console.log('tokenExists', tokenExists, deviceExists);

      if (!tokenExists && deviceExists) {
        await manageFcmToken(fcmToken, deviceId, 'delete');
        setTimeout(async () => {
          await manageFcmToken(fcmToken, deviceId, 'add');
        }, 2000);
      } else if (!tokenExists && !deviceExists) {
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
