import {View, Text, TouchableOpacity, useWindowDimensions, Image} from 'react-native';
import React from 'react';
import OnboardCard from '../../components/OnboardCard';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import {ScaledSheet} from 'react-native-size-matters';
import {useSelector,useDispatch} from 'react-redux';
import {ts} from '../../../ThemeStyles';
import {gs} from '../../../GlobalStyles';
import * as Animatable from 'react-native-animatable';
import ThemeSepBtn from '../../components/ThemeSepBtn';
import {Center} from 'native-base';
import { getLocation } from '../controllers/AuthControllers';

export default function Location({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const {height, width} = useWindowDimensions();
  const dispatch=useDispatch()
  return (
    <OnboardCard>
      <Animatable.View
        style={styles.container}
        animation="fadeInUp"
        useNativeDriver={true}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <EntypoIcons
            name="chevron-small-left"
            style={[{color: theme}, gs.fs24, gs.h40]}
          />
        </TouchableOpacity>
        <Text style={[styles.heading]}>Whats's your location?</Text>
        <Text style={styles.subtxt}>
          Could you please share your company location to receive personalized
          promotions.
        </Text>
        <Center>
          <Image source={require('../../assets/Onboard/allowlocation.jpg')} resizeMode='cover' style={styles.locationpic}/>
          <TouchableOpacity activeOpacity={0.7} onPress={
          //  ()=> navigation.navigate('Profile')
            ()=>dispatch(getLocation({navigation}))
          }>
            <ThemeSepBtn
              themecolor={theme}
              btntxt="ALLOW LOCATION ACCESS"
              height={height / 18}
              // width={width / 1.5}
            />
          </TouchableOpacity>
		  <TouchableOpacity onPress={()=>navigation.navigate('ManualLocation')}>
          <Text style={styles.subtxt}>Enter Location Manually</Text>
		  </TouchableOpacity>
        </Center>
      </Animatable.View>
    </OnboardCard>
  );
}
const styles = ScaledSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: '24@ms',
    color: ts.primarytext,
    fontFamily: ts.primarymedium,
  },
  subtxt: {
    fontSize: '12@ms',
    color: ts.secondarytext,
    fontFamily: ts.secondaryregular,
    marginVertical: '16@ms',
  },
  locationpic:{
    width:'80%',
    height:'220@ms',
    marginBottom:'10@ms'
  }
});
