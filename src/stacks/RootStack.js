import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardStack from './OnboardStack';
import HomeStack from './HomeStack';
import PageStack from './PageStack';
import {Dimensions, Platform, StatusBar, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import {gs} from '../../GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFlow, startLoader} from '../redux/slicers/CommomSlicer';
import {addEventListener} from '@react-native-community/netinfo';
import { ScaledSheet } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
export default function RootStack() {
  const {width, height} = Dimensions.get('screen');
  const loading = useSelector(state => state.common.loading);
  const [navdetails, setNavDetails] = useState(false);
  const [tk, setTk] = useState(null);
  const [profileUpdate, setProfleUpdate] = useState(null);
  const dispatch = useDispatch();
  let logout = useSelector(state => state.common.logout);
  const [checkConnection, setCheckConnection] = useState(true);
  const navigation=useNavigation()
  

  useEffect(() => {
    const unsubscribe = addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setCheckConnection(state.isConnected);
    });
    (async () => {
      let token = await AsyncStorage.getItem('token');
      let profile = await AsyncStorage.getItem('profileUpdated');
      let refreshToken = await AsyncStorage.getItem('refreshToken');
      let flow = await AsyncStorage.getItem('flow');
      console.log('flow', flow);
      dispatch(getFlow(flow));
      setTk(token);
      setProfleUpdate(profile);
      setNavDetails(true);
    })();
    return unsubscribe();
  }, []);
  useEffect(() => {
    if (logout) {
      console.log('entered into logout');
      setTk(null);
      setTimeout(()=>{
        dispatch(startLoader(false));
      },3000)
    }
  }, [logout]);

  if (!navdetails) {
    return;
  }

  return checkConnection ? (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!tk && <Stack.Screen name="OnboardStack" component={OnboardStack} />}
        <Stack.Screen name="HomeStack" component={HomeStack} />
        <Stack.Screen name="PageStack" component={PageStack} />
      </Stack.Navigator>
      {loading && (
        <View
          style={{...styles.lottifieContainer,width,height}}>
          <LottieView
            source={require('../assets/Loader/spinner.json')}
            autoPlay
            loop
            style={styles.lottiIcon}
          />
        </View>
      )}
      <FlashMessage
        position="top"
        // textStyle={[gs.fs15]}
        // titleStyle={[gs.fs18]}
        style={{
          marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : null,
        }}
      />
    </>
  ) : (
    <View
      style={{...styles.lottifieContainer,width,height}}>
      <LottieView
        source={require('../assets/Loader/no-network.json')}
        autoPlay
        loop
        style={styles.lottiIcon}
      />
    </View>
  );
}
const styles=ScaledSheet.create({
  lottifieContainer:{
    position: 'absolute',
    backgroundColor: '#fffe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottiIcon:{height: 210, width: 150, bottom: 10}
})
