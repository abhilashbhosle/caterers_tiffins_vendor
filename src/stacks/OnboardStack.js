import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from '../screens/onboarding/Welcome';
import { useSelector } from 'react-redux';
import OnboardNested from './OnboardNested';

const Stack=createNativeStackNavigator()
export default function OnboardStack() {
  return (
	<>
	<Stack.Navigator screenOptions={{headerShown:false}}>
		<Stack.Screen name='Welcome' component={Welcome}/>
		<Stack.Screen name='OnboardNested' component={OnboardNested}/>
	</Stack.Navigator>
	</>
  )
}