import {View, Text, useWindowDimensions, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeader from '../../../components/ThemeHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {gs} from '../../../../GlobalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {ts} from '../../../../ThemeStyles';
import {ScaledSheet} from 'react-native-size-matters';
import {TextInput} from 'react-native-paper';
import Updatebtn from '../../../components/Updatebtn';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_KEY} from '@env';
import {Formik} from 'formik';
import {branchSchema} from '../../../components/Validations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFlow} from '../../../redux/slicers/CommomSlicer';
import {addBranchService, editBranchService} from '../../services/BranchService';
import {getBranch} from '../../controllers/BranchController';

export default function AddBranch({navigation,route}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const {height, width} = useWindowDimensions();
  const [locFilled, setLocFilled] = useState(true);
  const dispatch = useDispatch();
  const ref = useRef();
  
  useEffect(() => {
    (async () => {
      let flow = await AsyncStorage.getItem('flow');
      dispatch(getFlow(flow));
    })();
  }, []);
  useEffect(()=>{
    let data=route?.params?.editData
    if(data){
      setLoc({
        street_name: data.street_name,
        area: data.area,
        pincode: '1111212',
        latitude: data.latitude,
        longitude: data.longitude,
        city: data.city,
        state: data.state,
        country: 'India',
        formatted_address: data.formatted_address,
        place_id: data.place_id,
      })
      ref.current?.setAddressText(data.formatted_address);
    }
  },[route])
  const [loc, setLoc] = useState({
    street_name: '',
    area: '',
    pincode: '1111212',
    latitude: '',
    longitude: '',
    city: '',
    state: '',
    country: 'India',
    formatted_address: '',
    place_id: '',
  });

  const handleLocCheck = () => {
    if (loc.formatted_address) {
      setLocFilled(true);
    } else {
      setLocFilled(false);
    }
  };
  return (
    <ScreenWrapper>
      <ThemeHeader
        lefttxt="Enter your New Branch Details"
        navigation={navigation}
      />
      <ScrollView
        style={[{flexGrow: 1, backgroundColor: '#fff'}, gs.ph20]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        >
        <Formik
          initialValues={{
            serviceName:route?.params?.editData?route.params.editData.catering_service_name:'',
             personName: route?.params?.editData?route.params.editData.point_of_contact_name:'',
              phone: route?.params?.editData?route.params.editData.phone_number.split('-')[1]:'',
            }}
          onSubmit={values => {
            let body
            if(route?.params?.editData?.catering_service_name){
               body = {
                catering_service_name: values.serviceName,
                point_of_contact_name: values.personName,
                phone_number: `+91-${values.phone}`,
                branch_id:route?.params?.editData?.id,
                ...loc,
              };
              editBranchService({body,dispatch,navigation})
            }else{
               body = {
                catering_service_name: values.serviceName,
                point_of_contact_name: values.personName,
                phone_number: `+91-${values.phone}`,
                ...loc,
              };
            addBranchService({body, dispatch, navigation});
            }
          }}
          validationSchema={branchSchema}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
            touched,
          }) => (
            <View style={[gs.mt20]}>
              <TextInput
                style={{...styles.input}}
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
                label="Catering Service Name"
                value={values.serviceName}
                onChangeText={handleChange('serviceName')}
                onBlur={handleBlur('serviceName')}
              />
              {errors.serviceName && touched.serviceName && (
                <Text style={[{color: 'red'}, gs.fs12, gs.mb5, gs.ml10]}>
                  {errors.serviceName}
                </Text>
              )}
              <TextInput
                style={{...styles.input}}
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
                label="Contact Person Name"
                value={values.personName}
                onChangeText={handleChange('personName')}
                onBlur={handleBlur('personName')}
              />
              {errors.personName && touched.personName && (
                <Text style={[{color: 'red'}, gs.fs12, gs.mb5, gs.ml10]}>
                  {errors.personName}
                </Text>
              )}
              <TextInput
                style={{...styles.input}}
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
                label="Phone Number"
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                keyboardType="numeric"
                maxLength={10}
              />
              {errors.phone && touched.phone && (
                <Text style={[{color: 'red'}, gs.fs12, gs.mb10, gs.ml10]}>
                  {errors.phone}
                </Text>
              )}
              <GooglePlacesAutocomplete
                GooglePlacesSearchQuery={{fields: 'geometry'}}
                textInputProps={{
                  placeholderTextColor: ts.secondarytext,
                  returnKeyType: 'search',
                  onChangeText: text => {
                    if (text === '' && loc.formatted_address) {
                      setLoc({
                        street_name: '',
                        area: '',
                        pincode: '1111111',
                        latitude: '',
                        longitude: '',
                        city: '',
                        state: '',
                        country: 'India',
                        formatted_address: '',
                        place_id: '',
                      });
                    }
                  },
                }}
                disableScroll={true}
                ref={ref}
                placeholder="Try A2B, Mg road, Bangalore, etc."
                fetchDetails={true}
                onPress={(data, details) => {
                  console.log("pressed")
                  let tempData = data.description.split(',');
                  let geo = details?.geometry;
                  setLoc({
                    ...loc,
                    street_name: tempData[0].trim(),
                    area: tempData[1].trim(),
                    pincode: '1112323',
                    latitude: geo.location.lat,
                    longitude: geo.location.lng,
                    city: tempData[tempData?.length - 2].trim(),
                    state: tempData[tempData?.length - 1].trim(),
                    country: 'India',
                    formatted_address: data.description,
                    place_id: data.place_id,
                  });
                  setLocFilled(true);
                }}
                query={{
                  key: GOOGLE_KEY,
                  language: 'en',
                  region: 'IN',
                }}
                styles={{
                  textInput: {
                    ...styles.input,
                    borderWidth: 1,
                    borderColor: '#999',
                    borderRadius: 8,
                  },
                }}
                // listEmptyComponent={
                //   <Text style={styles.notfound}>Result Not found</Text>
                // }
              />
              {!locFilled && (
                <Text style={[{color: 'red'}, gs.fs12, gs.mb5, gs.ml10]}>
                  Address is required
                </Text>
              )}
              <TouchableOpacity
                style={[gs.mt20]}
                onPress={() => {
                  handleSubmit();
                  handleLocCheck();
                }}>
                <Updatebtn btntxt="Submit" />
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  input: {
    color: ts.secondarytext,
    fontSize: '12@ms',
    fontFamily: ts.secondaryregular,
    height: '40@ms',
    backgroundColor: '#fff',
    marginBottom: '10@ms',
  },
});
