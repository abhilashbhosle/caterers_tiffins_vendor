import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddCuisine from '../screens/main/views/AddCuisine';
import AddOccasions from '../screens/main/views/AddOccasions';
import AddBranch from '../screens/main/views/AddBranch';
import Notification from '../screens/main/views/Notification';
import HelpDesk from '../screens/main/views/HelpDesk';
import Aboutus from '../screens/main/views/Aboutus';
import Faq from '../screens/main/views/Faq';
import { Webview } from '../screens/main/views/WebView';

const Stack=createNativeStackNavigator()
export default function PageStack() {
  return (
	<>
	<Stack.Navigator screenOptions={{headerShown:false}}>
		<Stack.Screen name='AddCuisine' component={AddCuisine}/>
		<Stack.Screen name='AddOccasions' component={AddOccasions}/>
		<Stack.Screen name='AddBranch' component={AddBranch}/>
		<Stack.Screen name='Notification' component={Notification}/>
		<Stack.Screen name='HelpDesk' component={HelpDesk}/>
		<Stack.Screen name='AboutUs' component={Aboutus}/>
		<Stack.Screen name='Faq' component={Faq}/>
		<Stack.Screen name='WebView' component={Webview}/>
	</Stack.Navigator>
	</>
  )
}