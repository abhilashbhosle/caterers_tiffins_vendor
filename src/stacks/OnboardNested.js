import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {ScreenWrapper} from '../components/ScreenWrapper';
import {ts} from '../../ThemeStyles';
import {ScaledSheet} from 'react-native-size-matters';
import {Center} from 'native-base';
import {gs} from '../../GlobalStyles';
import {Card} from 'react-native-paper';
import Credentials from '../screens/onboarding/Credentials';
import Location from '../screens/onboarding/Location';
import Profile from '../screens/onboarding/Profile';
import Kyc from '../screens/onboarding/Kyc';
import ManualLocation from '../screens/onboarding/ManualLocation';

const Stack = createNativeStackNavigator();
export default function OnboardNested() {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const {height, width} = Dimensions.get('screen');
  if (!flow) {
    return;
  }
  return (
    <ScreenWrapper>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
          marginTop: Platform.OS == 'android' && StatusBar.currentHeight,
        }}>
        <Center>
          <View
            style={{
              ...styles.titlecontainer,
              backgroundColor: theme,
              width: width - 70,
            }}>
            {flow == 'catering' ? (
              <Text style={[gs.fs28, styles.title]}>CATERING SERVICE</Text>
            ) : (
              <Text style={[gs.fs28, styles.title]}>TIFFIN SERVICE</Text>
            )}
          </View>
          <View style={[styles.mainContainer, {height: height / 1, width}]}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen
                name="Credentials"
                component={Credentials}></Stack.Screen>
              <Stack.Screen name="Location" component={Location}></Stack.Screen>
              <Stack.Screen name='Profile' component={Profile}></Stack.Screen>
              <Stack.Screen name='Kyc' component={Kyc}></Stack.Screen>
              <Stack.Screen name='ManualLocation' component={ManualLocation}></Stack.Screen>
            </Stack.Navigator>
          </View>
        </Center>
      </SafeAreaView>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  titlecontainer: {
    height: '200@ms',
    marginTop: '20@ms',
    borderRadius: '15@ms',
    paddingTop: '60@ms',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontFamily: ts.primarysemibold,
    color: '#fff',
  },
  mainContainer: {
    position: 'absolute',
    top: '150@ms',
    backgroundColor: '#fff',
  },
});
