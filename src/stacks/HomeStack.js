import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from '../screens/main/views/Dashboard';
import Inquiries from '../screens/main/views/Inquiries';
import Reviews from '../screens/main/views/Reviews';
import ManageOccasions from '../screens/main/views/ManageOccasions';
import ManageCuisine from '../screens/main/views/ManageCuisine';
import Packages from '../screens/main/views/Packages';
import BusinessProfile from '../screens/main/views/BusinessProfile';
import PhotoGallery from '../screens/main/views/PhotoGallery';
import Branches from '../screens/main/views/Branches';
import Subscription from '../screens/main/views/Subscription';
import Settings from '../screens/main/views/Settings';
import CustomDrawer from './CustomDrawer';
import { useSelector } from 'react-redux';
import { ts } from '../../ThemeStyles';

export default function HomeStack() {
  const Drawer = createDrawerNavigator();
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={
        {
          headerShown: false,
        }
      }
      
      drawerContent={props=><CustomDrawer {...props}/>}
      >
      <Drawer.Screen name="Dashboard" component={Dashboard} 
      />
      <Drawer.Screen name="Inquiries" component={Inquiries} />
      <Drawer.Screen name="Reviews" component={Reviews} />
      <Drawer.Screen name="Manage Cuisine" component={ManageCuisine} />
      <Drawer.Screen name="Manage Occassions" component={ManageOccasions} />
      <Drawer.Screen name="Packages" component={Packages} />
      <Drawer.Screen name="Business Profile" component={BusinessProfile} />
      <Drawer.Screen name="Photo Gallery" component={PhotoGallery} />
      <Drawer.Screen name="Branches" component={Branches} />
      <Drawer.Screen name="Subscription" component={Subscription} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}
