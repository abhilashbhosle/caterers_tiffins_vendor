import {View, Text, useWindowDimensions, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {gs} from '../../../../GlobalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {ts} from '../../../../ThemeStyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Center} from 'native-base';
import {Card, TextInput} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import Updatebtn from '../../../components/Updatebtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFlow} from '../../../redux/slicers/CommomSlicer';
import {getProfile} from '../../controllers/ProfileController';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_KEY} from '@env';
import {businessUpdateService} from '../../services/BusinessService';

export default function BusinessProfile({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const {height, width} = useWindowDimensions();
  const dispatch = useDispatch();
  const profileDetails = useSelector(state => state.profile?.profile[0]);
  const ref = useRef();
  // console.log(profileDetails);
  const [profile, setProfile] = useState({
    cateringName: '',
    contactPersonName: '',
    address: '',
    about: '',
    since: '',
    bEmail: '',
    bPhone: '',
    landlineNumber: '',
    whatsappNumber: '',
    website: '',
    twitter: '',
    instagram: '',
    facebook: '',
    geometry: '',
    area: '',
    city: '',
    country: '',
    latitude: '',
    longitude: '',
    pincode: '',
    placeId: '',
    state: '',
    streetName: '',
    staffs: '',
    workingDays: '',
  });
  useEffect(() => {
    (async () => {
      let flow = await AsyncStorage.getItem('flow');
      dispatch(getFlow(flow));
      dispatch(getProfile());
    })();
  }, []);
  useEffect(() => {
    if (profileDetails) {
      ref.current?.setAddressText(profileDetails.formatted_address);
      setProfile({
        ...profile,
        about: profileDetails?.about_description,
        cateringName: profileDetails?.vendor_service_name,
        contactPersonName: profileDetails?.point_of_contact_name,
        since: profileDetails?.working_since,
        bEmail: profileDetails?.business_email,
        bPhone: profileDetails?.business_phone_number?.split('-')[1],
        landlineNumber:
          profileDetails?.landline_number?.split('-')?.length > 1
            ? profileDetails?.landline_number?.split('-')[1]
            : profileDetails?.landline_number,
        whatsappNumber:
          profileDetails?.whatsapp_business_phone_number?.split('-')[1],
        area: profileDetails?.area,
        city: profileDetails?.city,
        country: profileDetails?.country,
        address: profileDetails?.formatted_address,
        latitude: profileDetails?.latitude,
        longitude: profileDetails?.longitude,
        pincode: profileDetails?.pincode || '111111',
        placeId: profileDetails?.place_id,
        state: profileDetails?.state,
        streetName: profileDetails?.street_name,
        staffs: profileDetails?.total_staffs_approx,
        workingDays: profileDetails?.working_days_hours,
      });
    }
  }, [profileDetails]);
  handleUpdate = () => {
    let data = profile.address;
    let tempData = data?.description
      ? data.description.split(',')
      : data.split(',');
    let temp = {
      street_name: tempData[0],
      area: tempData[1].trim(),
      pincode: '11111',
      latitude: profile?.geometry
        ? profile.geometry.location.lat
        : profile.latitude,
      longitude: profile?.geometry
        ? profile.geometry.location.lng
        : profile.longitude,
      // address: data?.description ? data.description : profile.address,
      city: tempData[tempData?.length - 2].trim(),
      state: tempData[tempData?.length - 1].trim(),
      country: 'India',
      formatted_address: data?.description ? data.description : profile.address,
      place_id: data?.place_id ? data.place_id : profile.placeId,
      vendor_service_name: profile?.cateringName,
      vendor_type: flow == 'catering' ? 'Caterer' : 'Tiffin',
      working_days_hours: profile?.workingDays,
      total_staffs_approx: profile?.staffs,
      about_description: profile?.about,
      working_since: profile?.since,
      business_email: profile?.bEmail,
      // business_phone_number: profile?.bEmail,
      business_phone_number: `+91-${profile?.bPhone}`,
      landline_number: profile?.landlineNumber,
      whatsapp_business_phone_number: `+91-${profile?.whatsappNumber}`,
      website_link: profile?.website,
      twitter_id: profile?.twitter,
      instagram_link: profile?.instagram,
      facebook_link: profile?.facebook,
      point_of_contact_name: profile?.contactPersonName,
    };
    businessUpdateService({body: temp, dispatch});
  };
  return (
    <ScreenWrapper>
      {/* =====HEADER======== */}
      <ThemeHeaderWrapper
        lefttxt="Business Profile"
        navigation={navigation}
        notifyIcon={false}
      />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        style={[{flex: 1, backgroundColor: '#fff'}, gs.pt15]}>
        <Center>
          <Text
            style={[
              gs.fs21,
              {color: ts.primarytext, fontFamily: ts.primarymedium},
            ]}>
            Business Information
          </Text>
        </Center>
        <Card style={[gs.p15, {backgroundColor: '#fff'}, gs.mv10, gs.mh10]}>
          <Center>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: theme}}>
                Catering Name
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                placeholder="Enter your Catering Service Name"
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
                value={profile?.cateringName}
                onChangeText={text => {
                  setProfile({...profile, cateringName: text});
                }}
              />
            </View>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: theme}}>
                Contact person Name
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                placeholder="Enter your Catering Service Name"
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
                value={profile?.contactPersonName}
                onChangeText={text => {
                  setProfile({...profile, contactPersonName: text});
                }}
              />
            </View>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: theme}}>
                Working days/hours
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                placeholder="Monday to Saturday (9AM to 10PM)"
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
                value={profile?.workingDays}
                onChangeText={text => {
                  setProfile({...profile, workingDays: text});
                }}
              />
            </View>
            {
              flow=='catering'&&
              <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: theme}}>
                Total No.of Staffs Approx
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                placeholder="100"
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
                value={profile?.staffs?.toString()}
                onChangeText={text => {
                  setProfile({...profile, staffs: text});
                }}
                keyboardType="numeric"
              />
            </View>
            }
     
          </Center>
        </Card>
        {/* ======ADDRESS======= */}
        <Card
          style={[
            gs.p15,
            {
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            },
            gs.mv10,
            gs.mh10,
          ]}>
          <View style={{width: width - 80}}>
            <Text style={{...styles.subtitke, color: theme}}>
              Enter Full Address
            </Text>
            <GooglePlacesAutocomplete
              textInputProps={{
                placeholderTextColor: ts.secondarytext,
                returnKeyType: 'search',
              }}
              GooglePlacesSearchQuery={{fields: 'geometry'}}
              disableScroll={true}
              ref={ref}
              placeholder="Try A2B, Mg road, Bangalore, etc."
              fetchDetails={true}
              onPress={(data, details) => {
                setProfile({
                  ...profile,
                  address: data,
                  geometry: details?.geometry,
                });
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
          </View>
        </Card>
        {/* =======ABOUT=========== */}
        <Card style={[gs.p15, {backgroundColor: '#fff'}, gs.mv10, gs.mh10]}>
          <Center>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: theme}}>About</Text>
              <TextInput
                style={{...styles.input, width: width - 80, height: height / 5}}
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                multiline
                numberOfLines={10}
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
                textAlignVertical="top"
                value={profile?.about}
                onChangeText={text => {
                  setProfile({...profile, about: text});
                }}
              />
            </View>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: theme}}>
                Working Since
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                placeholder="Eg. 1987"
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
                value={profile?.since?.toString()}
                onChangeText={text => {
                  setProfile({...profile, since: text});
                }}
                keyboardType="numeric"
                maxLength={4}
              />
            </View>
          </Center>
        </Card>
        {/* ======CONTACT DETAILS====== */}
        <Card style={[gs.p15, {backgroundColor: '#fff'}, gs.mv10, gs.mh10]}>
          <Center>
            <Text
              style={[
                gs.fs21,
                {color: ts.primarytext, fontFamily: ts.primarymedium},
              ]}>
              Contact Details
            </Text>
          </Center>
          <Center>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: theme}}>
                Business Email Id
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
                value={profile?.bEmail}
                onChangeText={text => {
                  setProfile({...profile, bEmail: text});
                }}
              />
            </View>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: theme}}>
                Business Phone Number
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
                value={profile?.bPhone}
                onChangeText={text => {
                  setProfile({...profile, bPhone: text});
                }}
              />
            </View>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: theme}}>
                Alternative Phone Number / Landline Number
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
                value={profile?.landlineNumber?.toString()}
                onChangeText={text => {
                  setProfile({...profile, landlineNumber: text});
                }}
              />
            </View>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: theme}}>
                Whatsapp Business Number
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
                value={profile?.whatsappNumber}
                onChangeText={text => {
                  setProfile({...profile, whatsappNumber: text});
                }}
              />
            </View>
          </Center>
        </Card>
        {/* ======OTHERS====== */}
        <Card style={[gs.p15, {backgroundColor: '#fff'}, gs.mv10, gs.mh10]}>
          <Center>
            <Text
              style={[
                gs.fs21,
                {color: ts.primarytext, fontFamily: ts.primarymedium},
              ]}>
              Others
            </Text>
          </Center>
          <Center>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: ts.teritary}}>
                Website link (optional)
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
              />
            </View>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: ts.teritary}}>
                Twitter ID (optional)
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
              />
            </View>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: ts.teritary}}>
                Instagram link (optional)
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
              />
            </View>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: ts.teritary}}>
                Facebook link (optional)
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
              />
            </View>
          </Center>
        </Card>
        <TouchableOpacity
          style={[styles.updatebtncontainer, gs.mh10]}
          activeOpacity={0.7}
          onPress={handleUpdate}>
          <Updatebtn btntxt="Update" />
        </TouchableOpacity>
      </KeyboardAwareScrollView>
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
  },
  subtitke: {
    color: ts.secondarytext,
    fontSize: '12@ms',
    fontFamily: ts.secondaryregular,
    marginBottom: '10@ms',
    lineHeight: '18@ms',
  },
  updatebtncontainer: {
    marginBottom: '60@ms',
    marginTop: '10@ms',
  },
});
