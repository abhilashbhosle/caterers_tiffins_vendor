import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {PaperProvider} from 'react-native-paper';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/stacks/RootStack';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {Dimensions, Image, Platform} from 'react-native';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1800);
  }, []);
  const {height, width} = Dimensions.get('screen');
  // useEffect(()=>{
  //   if(Platform.OS!=="ios"){
  //     SplashScreen.hide();
  //   }
  // },[])
  return showSplash ? (
    <Image
      source={require('./src/assets/splash/5.gif')}
      style={{height, width}}
    />
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
