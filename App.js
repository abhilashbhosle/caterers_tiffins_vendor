import 'react-native-gesture-handler'
import React, { useEffect } from 'react';
import {PaperProvider} from 'react-native-paper';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/stacks/RootStack';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import { Platform } from 'react-native';

export default function App() {
  useEffect(()=>{
    if(Platform.OS=="android"){
      SplashScreen.hide();
    }
  },[])
  return (
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
