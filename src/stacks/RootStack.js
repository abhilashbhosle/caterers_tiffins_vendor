import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardStack from './OnboardStack';
import HomeStack from './HomeStack';
import PageStack from './PageStack';

const Stack = createNativeStackNavigator();
export default function RootStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="OnboardStack" component={OnboardStack} />
      <Stack.Screen name='HomeStack' component={HomeStack}/>
      <Stack.Screen name='PageStack' component={PageStack}/>
    </Stack.Navigator>
  );
}
