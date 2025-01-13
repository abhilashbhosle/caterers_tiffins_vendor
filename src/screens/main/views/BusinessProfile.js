import {View, Text, useWindowDimensions, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {gs} from '../../../../GlobalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {ts} from '../../../../ThemeStyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Center, Flex} from 'native-base';
import {Card, TextInput} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import Updatebtn from '../../../components/Updatebtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFlow, startLoader} from '../../../redux/slicers/CommomSlicer';
import {getProfile} from '../../controllers/ProfileController';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_KEY} from '@env';
import {businessUpdateService} from '../../services/BusinessService';
import {BusinessProfileValidation} from '../../../components/Validations';
import {Dropdown} from 'react-native-element-dropdown';
import FeatherIcon from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {showMessage} from 'react-native-flash-message';

export default function BusinessProfile({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const {height, width} = useWindowDimensions();
  const dispatch = useDispatch();
  const profileDetails = useSelector(state => state.profile?.profile[0]);
  const [date, setDate] = useState(new Date());
  const ref = useRef();
  const days = [
    {label: 'Monday', value: 'Monday'},
    {label: 'Tuesday', value: 'Tuesday'},
    {label: 'Wednesday', value: 'Wednesday'},
    {label: 'Thursday', value: 'Thursday'},
    {label: 'Friday', value: 'Friday'},
    {label: 'Saturday', value: 'Saturday'},
    {label: 'Sunday', value: 'Sunday'},
  ];

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
  const [fromDay, setFromDay] = useState('');
  const [toDay, setToday] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setTotime] = useState('');
  const [working, setWorking] = useState({
    fromFocus: false,
    toFocus: false,
    toTimeVisible: false,
    fromTimeVisible: false,
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
        // workingDays: profileDetails?.working_days_hours,
      });
      setFromDay(profileDetails?.start_day);
      setToday(profileDetails?.end_day);
      setFromTime(profileDetails?.start_time);
      setTotime(profileDetails?.end_time);
    }
  }, [profileDetails]);

  const handleCheckPlace = async place => {
    if (!place) {
      showMessage({
        message: 'Request Failed!',
        description: 'Full Address is required.',
        type: 'danger',
      });
      return;
    } else {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${place}&key=${GOOGLE_KEY}`,
      );
      const data = await response.json();
      console.log('data', data);
      console.log(
        'has own',
        data.results.filter(e => e.hasOwnProperty('business_status')),
      );
      if (
        data.results &&
        data.results.length == 1 &&
        data.results.filter(e => e.hasOwnProperty('business_status'))?.length ==
          0
      ) {
        return true;
      } else {
        showMessage({
          message: 'Request Failed!',
          description: 'Full address is invalid.',
          type: 'danger',
        });
        return false;
      }
    }
  };
  const formatTime = (time) => {
    const [hour, minute, secondPeriod] = time.split(':');
    if(hour>10){
      return time
    }
    const [second, period] = secondPeriod.split(' ');
  console.log('period',period)
    const formattedHour = hour.padStart(2, '0');
  
    return `${formattedHour}:${minute}:${second} ${period}`;
  };
  

  handleUpdate = async () => {
    let data = profile.address;
    // let tempData = data?.description
    //   ? data.description.split(',')
    //   : data.split(',');
    let checkPlace = await handleCheckPlace(ref.current.getAddressText());
    let tempData = ref?.current?.getAddressText()?.split(',');
    // ====CHECK WHETHER THE PLACE EXIST OR NOT======//

    let res = await BusinessProfileValidation(data, profile);
    if (res && checkPlace) {
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
        formatted_address: data?.description
          ? data.description
          : profile.address,
        place_id: data?.place_id ? data.place_id : profile.placeId,
        vendor_service_name: profile?.cateringName,
        vendor_type: flow == 'catering' ? 'Caterer' : 'Tiffin',
        working_days_start: fromDay,
        working_days_end: toDay,
        working_hours_start: formatTime(fromTime),
        working_hours_end: formatTime(toTime),
        total_staffs_approx: profile?.staffs,
        about_description: profile?.about,
        working_since: profile?.since,
        business_email: profile?.bEmail,
        // business_phone_number: profile?.bEmail,
        business_phone_number: profile?.bPhone ? `+91-${profile?.bPhone}` : '',
        landline_number: profile?.landlineNumber,
        whatsapp_business_phone_number: profile?.whatsappNumber
          ? `+91-${profile?.whatsappNumber}`
          : '',
        website_link: profile?.website,
        twitter_id: profile?.twitter,
        instagram_link: profile?.instagram,
        facebook_link: profile?.facebook,
        point_of_contact_name: profile?.contactPersonName,
      };
      console.log(temp)
      businessUpdateService({body: temp, dispatch});
    }

  };

  // ========SETTING SELECTED TIME=======//
  const parseTimeString = timeString => {
    console.log(
      'entered into parse time string',
      timeString,
      typeof timeString,
    );
    const [time, modifier] = timeString.split(' ');
    let [hours, minutes, seconds] = time.split(':');

    // Ensure hours, minutes, and seconds are numbers
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);
    seconds = parseInt(seconds, 10);

    // Convert hours to 24-hour format
    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }
    const date = new Date();
    date.setHours(hours);
    
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    date.setMilliseconds(0);
    setDate(date);
  };
  const handleFromChange = item => {
    setFromDay(item.value);
  };
  const handleToChange = item => {
    setToday(item.value);
  };

  const hideDatePicker = () => {
    setWorking({...working, toTimeVisible: false, fromTimeVisible: false});
  };

  const handleConfirm = date => {
    let dt = new Date(date).toLocaleTimeString();
    parseTimeString(dt);
    if (working.toTimeVisible) {
      setTotime(dt);
    } else if (working.fromTimeVisible) {
      setFromTime(dt);
    }
    hideDatePicker();
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
        style={[{flex: 1, backgroundColor: '#fff'}, gs.pt15]}
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
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
                {flow == 'catering' ? 'Catering Name' : 'Tiffin Name'}
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
                textColor={ts.secondarytext}
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
                textColor={ts.secondarytext}
              />
            </View>
            {/* =======WORKING FROM===== */}
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: theme}}>
                Working days/hours
              </Text>

              <Text style={{...styles.subtitke, color: ts.secondarytext}}>
                From
              </Text>
              <Flex direction="row" alignItems="center">
                <View>
                  <Dropdown
                    style={[
                      {...styles.dropdown, width: (width - 90) / 2},

                      working.fromFocus && {borderColor: theme},
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={days}
                    maxHeight={200}
                    labelField="label"
                    valueField="value"
                    placeholder={!working.fromFocus ? 'Select Day' : '...'}
                    searchPlaceholder="Search..."
                    value={fromDay}
                    onFocus={() => setWorking({...working, fromFocus: true})}
                    onBlur={() => setWorking({...working, fromFocus: false})}
                    onChange={item => {
                      handleFromChange(item);
                    }}
                    itemTextStyle={{color: ts.primarytext}}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    ...styles.dropdown,
                    width: (width - 90) / 2,
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setWorking({...working, fromTimeVisible: true});
                    if (fromTime) {
                      parseTimeString(fromTime);
                    }
                  }}>
                  <Flex direction="row" alignItems="center">
                    <FeatherIcon
                      name="clock"
                      style={[gs.fs18, {color: ts.secondarytext}]}
                    />
                    <Text
                      style={{
                        ...styles.subtitke,
                        color: ts.secondarytext,
                        marginBottom: 0,
                        marginLeft: 10,
                      }}>
                      {fromTime || "00:00"}
                    </Text>
                  </Flex>
                </TouchableOpacity>
              </Flex>
            </View>
            {/* =======WORKING To===== */}
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: ts.secondarytext}}>
                To
              </Text>
              <Flex direction="row" alignItems="center">
                <View>
                  <Dropdown
                    style={[
                      {...styles.dropdown, width: (width - 90) / 2},

                      working.toFocus && {borderColor: theme},
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={days}
                    maxHeight={200}
                    labelField="label"
                    valueField="value"
                    placeholder={!working.toFocus ? 'Select Day' : '...'}
                    searchPlaceholder="Search..."
                    value={toDay}
                    onFocus={() => setWorking({...working, toFocus: true})}
                    onBlur={() => setWorking({...working, toFocus: false})}
                    onChange={item => {
                      handleToChange(item);
                    }}
                    itemTextStyle={{color: ts.primarytext}}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    ...styles.dropdown,
                    width: (width - 90) / 2,
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setWorking({...working, toTimeVisible: true});
                    if (toTime) {
                      parseTimeString(toTime);
                    }
                  }}>
                  <Flex direction="row" alignItems="center">
                    <FeatherIcon
                      name="clock"
                      style={[gs.fs18, {color: ts.secondarytext}]}
                    />
                    <Text
                      style={{
                        ...styles.subtitke,
                        color: ts.secondarytext,
                        marginBottom: 0,
                        marginLeft: 10,
                      }}>
                      {toTime || "00:00"}
                    </Text>
                  </Flex>
                </TouchableOpacity>
              </Flex>
            </View>

            {flow == 'catering' && (
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
                  textColor={ts.secondarytext}
                />
              </View>
            )}
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
                multiline:true,
                numberOfLines:3
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
                description: {
                  color: ts.primarytext,
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
                textColor={ts.secondarytext}
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
                textColor={ts.secondarytext}
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
                textColor={ts.secondarytext}
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
                textColor={ts.secondarytext}
                maxLength={10}
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
                textColor={ts.secondarytext}
                maxLength={12}
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
                textColor={ts.secondarytext}
                maxLength={10}
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
                textColor={ts.secondarytext}
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
                textColor={ts.secondarytext}
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
                textColor={ts.secondarytext}
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
                textColor={ts.secondarytext}
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
      <DateTimePickerModal
        isVisible={working.toTimeVisible || working.fromTimeVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        style={{backgroundColor: theme}}
        display="spinner"
        date={date}
        is24Hour={false}
      />
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  input: {
    color: ts.secondarytext,
    fontSize: '14@ms',
    fontFamily: ts.secondaryregular,
    // height: '40@ms',
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
  dropdown: {
    height: '50@ms',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: '8@ms',
    paddingHorizontal: '8@ms',
    color: ts.secondarytext,
    fontSize: '12@ms',
    marginHorizontal:'2.5@ms'
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: '14@ms',
    color: ts.secondarytext,
  },
  selectedTextStyle: {
    fontSize: '14@ms',
    fontFamily: ts.secondaryregular,
    color: ts.secondarytext,
  },
  iconStyle: {
    width: '20@ms',
    height: '20@ms',
  },
});
