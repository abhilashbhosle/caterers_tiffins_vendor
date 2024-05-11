import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import OnboardCard from '../../components/OnboardCard';
import {ScaledSheet} from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';
import {ts} from '../../../ThemeStyles';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import {gs} from '../../../GlobalStyles';
import {useSelector, useDispatch} from 'react-redux';
import {TextInput} from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_KEY} from '@env';
import {Center, Flex, ScrollView, theme} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getLocation} from '../controllers/AuthControllers';
import ThemeSepBtn from '../../components/ThemeSepBtn';
import { startLoader } from '../../redux/slicers/CommomSlicer';
import {showMessage, hideMessage} from 'react-native-flash-message';
import { updateLocationService } from '../services/AuthServices';

export default function ManualLocation({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const {height, width} = useWindowDimensions();
  const [selectedData,setSelectedData]=useState([])
  const [geometry,setGeometry]=useState()
  const dispatch = useDispatch();
  const [focused, setFocused] = useState(false);
  const currentLocation = useSelector(state => state.common.currentLocation);
  const ref = useRef();
  console.log(focused);
  useEffect(() => {
    if(currentLocation?.formatted_address){
    ref.current?.setAddressText(currentLocation.formatted_address);
    }
  }, [currentLocation]);

  const handleNext=async()=>{
    try{
      dispatch(startLoader(true))
      let data={...selectedData}
      let tempData=data.description.split(',')
      let temp={
      street_name:tempData[0],
      area:tempData[1],
      pincode:'111111',
      latitude:geometry.location.lat,
      longitude:geometry.location.lng,
      address:selectedData.description,
      city:tempData[tempData?.length-2].trim(),
      state: tempData[tempData?.length-1].trim(),
      country:'India',
      formatted_address:selectedData.description,
      place_id:selectedData.place_id
      }

      await updateLocationService({temp,navigation})
    }catch(error){
      showMessage({
        message: 'Request Failed!',
        description: 'Oops something went wrong..',
        type: 'danger',
      });
    }finally{
      dispatch(startLoader(false))
    }
  }

  return (
    <OnboardCard>
      <Animatable.View
        style={styles.container}
        animation="fadeInUp"
        useNativeDriver={true}>
          <View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <EntypoIcons
            name="chevron-small-left"
            style={[{color: theme}, gs.fs24, gs.h40]}
          />
        </TouchableOpacity>
        <Text style={[styles.heading]}>Enter your area or address</Text>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flexGrow: 1}}>
          <GooglePlacesAutocomplete
            GooglePlacesSearchQuery={{fields: 'geometry'}}
            disableScroll={true}
            ref={ref}
            placeholder="Try A2B, Mg road, Bangalore, etc."
            placeholderTextColor="#333"
            fetchDetails={true}
            onPress={(data, details) => {
              setSelectedData(data)
              setGeometry(details?.geometry)
            }}
            query={{
              key: GOOGLE_KEY,
              language: 'en',
              region: 'IN',
            }}
            styles={{
              textInput: {...styles.input, borderColor: theme},
            }}
            // listEmptyComponent={
            //   <Text style={styles.notfound}>Result Not found</Text>
            // }
          />
        </ScrollView>
        <TouchableOpacity
          style={styles.currentLocbtn}
          activeOpacity={0.7}
          onPress={() => dispatch(getLocation({navigation}))}>
          <Flex direction="row" alignItems="center">
            <MaterialIcons
              name="send"
              style={[gs.fs20, {color: theme}, gs.mr7]}
            />
            <Text style={{...styles.locbtntxt, color: theme}}>
              Use my current location
            </Text>
          </Flex>
        </TouchableOpacity>
        </View>
        <Center>
          <TouchableOpacity activeOpacity={0.7} style={[gs.mt15]} onPress={handleNext}>
            <ThemeSepBtn
              themecolor={theme}
              height={height / 18}
              width={width / 2.5}
              btntxt="NEXT"
            />
          </TouchableOpacity>
        </Center>
      </Animatable.View>
    </OnboardCard>
  );
}
const styles = ScaledSheet.create({
  container: {
    padding: 20,
    justifyContent:'space-between',
    height:'100%'
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
  input: {
    height: '40@ms',
    backgroundColor: '#fff',
    fontSize: '13@ms',
    fontFamily: ts.secondaryregular,
    color: ts.primarytext,
    marginVertical: '10@ms',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
  },
  icon: {
    fontSize: '22@ms',
    top: '2@ms',
  },
  notfound: {
    marginVertical: '10@ms',
    color: '#333',
    fontFamily: ts.secondaryregular,
  },
  currentLocbtn: {
    height: '40@ms',
    width: '80%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: '10@ms',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 2,
    borderRadius: '8@ms',
  },
  locbtntxt: {
    fontFamily: ts.secondaryregular,
    fontSize: '14@ms',
  },
});
