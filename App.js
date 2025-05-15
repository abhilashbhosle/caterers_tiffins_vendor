import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {PaperProvider} from 'react-native-paper';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/stacks/RootStack';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {
  Dimensions,
  Image,
  Platform,
  StatusBar,
  View,
  Alert,
} from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('📩 Background Message:', remoteMessage);
  // You can handle or log the message here
});

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const {height, width} = Dimensions.get('screen');

  // 🟡 Request Notification Permission + Foreground Handler
  useEffect(() => {
    const initNotifications = async () => {
     
      // Foreground message handler
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert(
          'New Notification',
          remoteMessage.notification?.title || 'No Title',
        );
        console.log('📥 Foreground Message:', remoteMessage);
      });

      // Handle notification when app opened from quit state
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              '🚀 App opened from quit by notification:',
              remoteMessage,
            );
            // You can handle navigation here
          }
        });

      return unsubscribe;
    };

    initNotifications();
  }, []);

  useEffect(() => {
    // changeNavigationBarColor('#ffffff', true);
    setTimeout(() => {
      // changeNavigationBarColor('#ffffff', false);
      setShowSplash(false);
    }, 1800);
  }, []);

  return showSplash ? (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <Image
        source={require('./src/assets/splash/5.gif')}
        style={{height, width}}
        resizeMode="cover"
      />
    </View>
  ) : (
    <Provider store={store}>
      <PaperProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </NativeBaseProvider>
      </PaperProvider>
    </Provider>
  );
}
