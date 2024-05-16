import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {useDispatch, useSelector} from 'react-redux';
import {ts} from '../../../../ThemeStyles';
import {gs} from '../../../../GlobalStyles';
import {Center, Divider, Flex} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CredInputs from '../../../components/CredInputs';
import {List, TextInput} from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import ThemeSepBtn from '../../../components/ThemeSepBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFlow} from '../../../redux/slicers/CommomSlicer';
import {
  getVendorDetails,
  getVendorPassword,
  resetPasswordService,
} from '../../services/AuthServices';
import {
  deleteAadharBackService,
  deleteAadharService,
  deleteFsService,
  getCredentials,
  getSettings,
  updateGstinService,
} from '../../services/SettingsService';
import {
  emptyLocalImgs,
  fsUpload,
  imgUpload,
  imgUploadBack,
  panUpload,
} from '../../controllers/SettingsController';
import {showMessage} from 'react-native-flash-message';
import {color} from 'native-base/lib/typescript/theme/styled-system';

export default function Settings({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const [details, setDetails] = useState({});
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [info, setInfo] = useState('');
  const [aadhar, setAadhar] = useState(null);
  const [aadharBack, setAadharBack] = useState(null);
  const [pan, setPan] = useState(null);
  const [fs, setFs] = useState(null);
  const [eye, setEye] = useState(false);
  const [gst, setGst] = useState(null);
  const [originalPass, setOriginalPass] = useState(null);
  const localAadhar = useSelector(state => state.settings.img);
  const aadharDetails = useSelector(state => state.settings.aadharRes);
  const localAadharBack = useSelector(state => state.settings.imgBack);
  const aadharBackDetails = useSelector(state => state.settings.aadharBackRes);
  const localPan = useSelector(state => state.settings.panImg);
  const panDetails = useSelector(state => state.settings.panRes);
  const localFs = useSelector(state => state.settings.fsImg);
  const fsDetails = useSelector(state => state.settings.fsRes);

  const [show, setShow] = useState({
    aadharEnable: false,
    panEnable: false,
    gstinEnable: false,
    fssaiEnable: false,
  });

  const handlePasswordReset = () => {
    if (originalPass !== password) {
      resetPasswordService({password, dispatch, setPassword, setOriginalPass});
    } else {
      showMessage({
        message: 'Request Cancelled!',
        description:
          'New password must be different from the current password .',
        type: 'warning',
      });
    }
  };

  useEffect(() => {
    (async () => {
      let flow = await AsyncStorage.getItem('flow');
      dispatch(getFlow(flow));
      let detail = await getVendorDetails(dispatch);
      setDetails(detail.data.data);
      // let creds = await getCredentials({
      //   phone: detail?.data?.data?.phone_number,
      //   dispatch,
      // });
      let pass = await getVendorPassword();
      if (pass?.length > 0) {
        setPassword(pass);
        setOriginalPass(pass);
      }
      let inf = await getSettings({dispatch, loading: true});
      setAadhar(inf?.data?.data['vendor-enca']);
      setAadharBack(inf?.data?.data['vendor-enca-back']);
      setPan(inf?.data?.data['vendor-encp']);
      setFs(inf?.data?.data['vendor-encf']);
      setInfo(inf?.data?.data);
      setGst(inf?.data?.data?.gstin_number);
    })();
  }, []);
  useEffect(() => {
    if (aadharDetails || panDetails || fsDetails || aadharBackDetails) {
      (async () => {
        let inf = await getSettings({dispatch, loading: false});
        setInfo(inf?.data?.data);
        setAadhar(inf?.data?.data['vendor-enca']);
        setAadharBack(inf?.data?.data['vendor-enca-back']);
        setPan(inf?.data?.data['vendor-encp']);
        setFs(inf?.data?.data['vendor-encf']);
        setTimeout(() => {
          dispatch(emptyLocalImgs());
        }, 1000);
      })();
    }
  }, [aadharDetails, panDetails, fsDetails, aadharBackDetails]);

  // ======UPLOAD AADHAR=======//
  const handleAadharUpload = () => {
    dispatch(imgUpload({selection: 'aadhar', type: 'insert'}));
  };
  // =====REPLACE AADHAR=======//
  const handleAadharEdit = id => {
    dispatch(imgUpload({selection: 'aadhar', type: 'replace', id}));
  };
  // ======UPLOAD AADHAR BACK=======//
  const handleAadharUploadBack = () => {
    dispatch(imgUploadBack({selection: 'aadhar', type: 'insert'}));
  };
  // =====REPLACE AADHAR BACK=======//
  const handleAadharBackEdit = id => {
    dispatch(imgUploadBack({selection: 'aadhar', type: 'replace', id}));
  };
  // =====DELETE AADHAR======//
  const handleAadhardel = async id => {
    Alert.alert(
      'Delete Aadhar',
      'Are you sure, you want to delete Aadhar?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => delAadhar(id),
        },
      ],
      {cancelable: false},
    );
  };
  const delAadhar = async id => {
    let res = await deleteAadharService(id);
    if (res?.data?.status == 'success') {
      let data = {...info};
      data['vendor-enca'] = [];
      setInfo(data);
      setAadhar(data['vendor-enca']);
    }
  };
  // =====DELETE AADHAR BACK======//
  const handleAadharBackdel = async id => {
    Alert.alert(
      'Delete Aadhar',
      'Are you sure, you want to delete Aadhar?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => delAadharBack(id),
        },
      ],
      {cancelable: false},
    );
  };
  const delAadharBack = async id => {
    let res = await deleteAadharBackService(id);
    if (res?.data?.status == 'success') {
      let data = {...info};
      data['vendor-enca-back'] = [];
      setInfo(data);
      setAadharBack(data['vendor-enca-back']);
    }
  };
  // ======UPLOAD PAN=======//
  const handlePanUpload = () => {
    dispatch(panUpload({selection: 'pan', type: 'insert'}));
  };
  // =====REPLACE PAN=======//
  const handlePanEdit = id => {
    dispatch(panUpload({selection: 'pan', type: 'replace', id}));
  };
  // =====DELETE FSSAI======//
  const handleFsdel = async id => {
    Alert.alert(
      'Delete FSSAI License',
      'Are you sure, you want to delete FSSAI License?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => delFs(id),
        },
      ],
      {cancelable: false},
    );
  };
  const delFs = async id => {
    let res = await deleteFsService(id);
    if (res?.data?.status == 'success') {
      let data = {...info};
      data['vendor-encf'] = [];
      setInfo(data);
      setFs(data['vendor-encf']);
    }
  };
  // =====DELETE PAN======//
  const handlePanDel = async id => {
    Alert.alert(
      'Delete PAN',
      'Are you sure, you want to delete PAN?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => delPan(id),
        },
      ],
      {cancelable: false},
    );
  };
  const delPan = async id => {
    let res = await deleteAadharService(id);
    if (res?.data?.status == 'success') {
      let data = {...info};
      data['vendor-encp'] = [];
      setInfo(data);
      setPan(data['vendor-encp']);
    }
  };
  // ======UPLOAD FSSAI=======//
  const handleFsUpload = () => {
    dispatch(fsUpload({selection: 'fssai', type: 'insert'}));
  };
  // =====REPLACE FSSAI=======//
  const handleFsEdit = id => {
    dispatch(fsUpload({selection: 'fssai', type: 'replace', id}));
  };
  // =======SUBMIT GSTIN=======//
  const submitGstin = async () => {
    await updateGstinService({number: gst, dispatch});
  };

  return (
    <ScreenWrapper>
      {/* =====HEADER======== */}
      <ThemeHeaderWrapper
        lefttxt="Settings"
        navigation={navigation}
        notifyIcon={false}
      />
      <KeyboardAwareScrollView
        style={[{flex: 1, backgroundColor: '#fff'}, gs.p20]}
        enableOnAndroid>
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="space-between">
          <Flex direction="row">
            <View style={{...styles.profileimg, backgroundColor: theme}}>
              <Text style={[gs.fs25, {color: '#fff'}]}>
                {details?.point_of_contact_name?.slice(0, 1)}
              </Text>
            </View>
            <View style={[gs.ph10, {width: '65%'}]}>
              <Text
                style={[
                  gs.fs20,
                  {fontFamily: ts.primarymedium, color: ts.primarytext},
                  gs.mb5,
                ]}
                numberOfLines={1}>
                {details?.point_of_contact_name}
              </Text>
              <Text
                style={[
                  gs.fs14,
                  {fontFamily: ts.secondaryregular, color: ts.teritary},
                ]}>
                {details?.phone_number}
              </Text>
            </View>
          </Flex>
          {/* <MaterialIcons name="edit" style={[gs.fs24, {color: theme}]} /> */}
        </Flex>
        <Text
          style={[
            gs.fs20,
            {color: ts.primarytext, fontFamily: ts.primarymedium},
            gs.mv15,
          ]}>
          Company ID - {details?.company_id}
        </Text>
        <Text style={styles.heading}>Change Login Password below</Text>
        <TextInput
          style={styles.input}
          right={
            <TextInput.Icon
              icon={() => (
                <TouchableOpacity
                  onPress={() => {
                    setEye(!eye);
                  }}>
                  <FeatherIcon
                    name={!eye ? 'eye-off' : 'eye'}
                    style={[gs.fs22, {color: theme}]}
                  />
                </TouchableOpacity>
              )}
            />
          }
          secureTextEntry={!eye}
          mode="outlined"
          outlineColor={'#ddd'}
          activeOutlineColor={theme}
          outlineStyle={[gs.br8]}
          value={password}
          onChangeText={text => setPassword(text)}
          maxLength={8}
          textColor={ts.secondarytext}
        />
        <TouchableOpacity onPress={handlePasswordReset}>
          <Text
            style={[
              {...styles.heading, textAlign: 'center', color: ts.teritary},
            ]}>
            Reset Password
          </Text>
        </TouchableOpacity>
        <Divider style={[gs.mv20, {backgroundColor: theme}]} />
        <Text style={styles.heading}>Documents</Text>
        <View style={[gs.mv10, {backgroundColor: '#fff'}]}>
          {/* =====AADHAR CARD====== */}
          <View style={styles.labelcontainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setShow({
                  aadharEnable: !show.aadharEnable,
                  panEnable: false,
                  gstinEnable: false,
                  fssaiEnable: false,
                });
              }}>
              <Flex
                direction="row"
                alignItems="center"
                justifyContent="space-between">
                <Text style={styles.accordianTitle}>Aadhar Card</Text>
                <FeatherIcon
                  name={show.aadharEnable?"chevron-up": "chevron-down"}
                  style={[gs.fs20, {color: ts.secondarytext}]}
                />
              </Flex>
            </TouchableOpacity>
            {show.aadharEnable && (
              <View style={styles.accordianitem}>
                <Text style={[styles.heading, gs.mb15]}>Upload Aadhar</Text>
                <Text style={[styles.heading, gs.mb15]}>Front</Text>
                <Center>
                  {localAadhar?.path && !aadhar && (
                    <ImageBackground
                      resizeMode="cover"
                      source={{uri: localAadhar?.path}}
                      alt="profile"
                      style={{...styles.img, opacity: 0.5}}
                      imageStyle={{borderRadius: 10}}
                    />
                  )}
                  {!localAadhar?.path && aadhar?.length > 0 && (
                    <ImageBackground
                      resizeMode="cover"
                      source={{
                        uri: aadhar[0]['image_name'][0].medium,
                      }}
                      alt="profile"
                      style={{...styles.img}}
                      imageStyle={{borderRadius: 10}}>
                      <View
                        style={[
                          gs.h40,
                          {justifyContent: 'flex-end', alignItems: 'flex-end'},
                          gs.ph10,
                        ]}>
                        <Flex direction="row">
                          <TouchableOpacity
                            style={[{...styles.iconContainer}]}
                            activeOpacity={0.7}
                            onPress={() => {
                              handleAadharEdit(info['vendor-enca'][0].id);
                            }}>
                            <MaterialIcons
                              name="edit"
                              style={[gs.fs20, {color: '#000'}]}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[{...styles.iconContainer}, gs.ml10]}
                            activeOpacity={0.7}
                            onPress={() => {
                              handleAadhardel(info['vendor-enca'][0].id);
                            }}>
                            <MaterialIcons
                              name="delete"
                              style={[gs.fs20, {color: '#000'}]}
                            />
                          </TouchableOpacity>
                        </Flex>
                      </View>
                    </ImageBackground>
                  )}

                  {!localAadhar?.path && !aadhar?.length && (
                    <TouchableOpacity
                      style={[
                        {...styles.uploadbtn, backgroundColor: theme},
                        gs.br10,
                      ]}
                      onPress={handleAadharUpload}>
                      <Flex direction="row" alignItems="center">
                        <AntIcon
                          name="cloudupload"
                          style={[gs.fs20, {color: '#fff'}, gs.mr10]}
                        />
                        <Text
                          style={[
                            gs.fs16,
                            {fontFamily: ts.secondaryregular, color: '#fff'},
                          ]}>
                          Upload
                        </Text>
                      </Flex>
                    </TouchableOpacity>
                  )}
                </Center>
                <Text style={[styles.heading, gs.mv15]}>Back</Text>
                <Center>
                  {localAadharBack?.path && !aadharBack && (
                    <ImageBackground
                      resizeMode="cover"
                      source={{uri: localAadharBack?.path}}
                      alt="profile"
                      style={{...styles.img, opacity: 0.5}}
                      imageStyle={{borderRadius: 10}}
                    />
                  )}
                  {!localAadharBack?.path && aadharBack?.length > 0 && (
                    <ImageBackground
                      resizeMode="cover"
                      source={{
                        uri: aadharBack[0]['image_name'][0].medium,
                      }}
                      alt="profile"
                      style={{...styles.img}}
                      imageStyle={{borderRadius: 10}}>
                      <View
                        style={[
                          gs.h40,
                          {justifyContent: 'flex-end', alignItems: 'flex-end'},
                          gs.ph10,
                        ]}>
                        <Flex direction="row">
                          <TouchableOpacity
                            style={[{...styles.iconContainer}]}
                            activeOpacity={0.7}
                            onPress={() => {
                              handleAadharBackEdit(
                                info['vendor-enca-back'][0].id,
                              );
                            }}>
                            <MaterialIcons
                              name="edit"
                              style={[gs.fs20, {color: '#000'}]}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[{...styles.iconContainer}, gs.ml10]}
                            activeOpacity={0.7}
                            onPress={() => {
                              handleAadharBackdel(
                                info['vendor-enca-back'][0].id,
                              );
                            }}>
                            <MaterialIcons
                              name="delete"
                              style={[gs.fs20, {color: '#000'}]}
                            />
                          </TouchableOpacity>
                        </Flex>
                      </View>
                    </ImageBackground>
                  )}

                  {!localAadharBack?.path && !aadharBack?.length && (
                    <TouchableOpacity
                      style={[
                        {...styles.uploadbtn, backgroundColor: theme},
                        gs.br10,
                      ]}
                      onPress={handleAadharUploadBack}>
                      <Flex direction="row" alignItems="center">
                        <AntIcon
                          name="cloudupload"
                          style={[gs.fs20, {color: '#fff'}, gs.mr10]}
                        />
                        <Text
                          style={[
                            gs.fs16,
                            {fontFamily: ts.secondaryregular, color: '#fff'},
                          ]}>
                          Upload
                        </Text>
                      </Flex>
                    </TouchableOpacity>
                  )}
                </Center>
              </View>
            )}
          </View>
          {/* =====PAN CARD====== */}
          <View style={styles.labelcontainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setShow({
                  aadharEnable: false,
                  panEnable: !show.panEnable,
                  gstinEnable: false,
                  fssaiEnable: false,
                });
              }}>
              <Flex
                direction="row"
                alignItems="center"
                justifyContent="space-between">
                <Text style={styles.accordianTitle}>PAN Card</Text>
                <FeatherIcon
                  name={show.panEnable?"chevron-up":"chevron-down"}
                  style={[gs.fs20, {color: ts.secondarytext}]}
                />
              </Flex>
            </TouchableOpacity>
            {show.panEnable && (
              <View style={styles.accordianitem}>
                {!localPan?.path && !pan && (
                  <Text style={[styles.heading, gs.mb15]}>Upload PAN Card</Text>
                )}
                <Center>
                  {localPan?.path && !pan && (
                    <ImageBackground
                      resizeMode="cover"
                      source={{uri: localPan?.path}}
                      alt="profile"
                      style={{...styles.img, opacity: 0.5}}
                      imageStyle={{borderRadius: 10}}
                    />
                  )}
                  {!localPan?.path && pan?.length > 0 && (
                    <ImageBackground
                      resizeMode="cover"
                      source={{
                        uri: pan[0]['image_name'][0].medium,
                      }}
                      alt="profile"
                      style={{...styles.img}}
                      imageStyle={{borderRadius: 10}}>
                      <View
                        style={[
                          gs.h40,
                          {justifyContent: 'flex-end', alignItems: 'flex-end'},
                          gs.ph10,
                        ]}>
                        <Flex direction="row">
                          <TouchableOpacity
                            style={[{...styles.iconContainer}]}
                            activeOpacity={0.7}
                            onPress={() => {
                              handlePanEdit(info['vendor-encp'][0].id);
                            }}>
                            <MaterialIcons
                              name="edit"
                              style={[gs.fs20, {color: '#000'}]}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[{...styles.iconContainer}, gs.ml10]}
                            activeOpacity={0.7}
                            onPress={() => {
                              handlePanDel(info['vendor-encp'][0].id);
                            }}>
                            <MaterialIcons
                              name="delete"
                              style={[gs.fs20, {color: '#000'}]}
                            />
                          </TouchableOpacity>
                        </Flex>
                      </View>
                    </ImageBackground>
                  )}

                  {!localPan?.path && !pan?.length && (
                    <TouchableOpacity
                      style={[
                        {...styles.uploadbtn, backgroundColor: theme},
                        gs.br10,
                      ]}
                      onPress={handlePanUpload}>
                      <Flex direction="row" alignItems="center">
                        <AntIcon
                          name="cloudupload"
                          style={[gs.fs20, {color: '#fff'}, gs.mr10]}
                        />
                        <Text
                          style={[
                            gs.fs16,
                            {fontFamily: ts.secondaryregular, color: '#fff'},
                          ]}>
                          Upload
                        </Text>
                      </Flex>
                    </TouchableOpacity>
                  )}
                </Center>
              </View>
            )}
          </View>

          {/* =====GSTIN Number====== */}

          <View style={styles.labelcontainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setShow({
                  aadharEnable: false,
                  panEnable: false,
                  gstinEnable: !show.gstinEnable,
                  fssaiEnable: false,
                });
              }}>
              <Flex
                direction="row"
                alignItems="center"
                justifyContent="space-between">
                <Text style={styles.accordianTitle}>GSTIN Number</Text>
                <FeatherIcon
                  name={show.gstinEnable?"chevron-up":"chevron-down"}
                  style={[gs.fs20, {color: ts.secondarytext}]}
                />
              </Flex>
            </TouchableOpacity>
            {show.gstinEnable && (
              <View style={styles.accordianitem}>
                <Text style={[styles.heading, gs.mb5]}>
                  Enter your GSTIN number below
                </Text>
                <TextInput
                  style={{...styles.input, backgroundColor: '#f5f5f5'}}
                  mode="outlined"
                  activeOutlineColor={theme}
                  outlineColor={'#999'}
                  outlineStyle={[gs.br8]}
                  value={gst}
                  onChangeText={text => setGst(text)}
                  textColor={ts.secondarytext}
                />
                <TouchableOpacity style={[gs.mv20]} onPress={submitGstin}>
                  <ThemeSepBtn themecolor={theme} btntxt="Submit" height={40} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          {/* =====FSSAI LICENSE====== */}
          <View style={styles.labelcontainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setShow({
                  aadharEnable: false,
                  panEnable: false,
                  gstinEnable: false,
                  fssaiEnable: !show.fssaiEnable,
                });
              }}>
              <Flex
                direction="row"
                alignItems="center"
                justifyContent="space-between">
                <Text style={styles.accordianTitle}>FSSAI License</Text>
                <FeatherIcon
                  name={show.fssaiEnable?"chevron-up": "chevron-down"}
                  style={[gs.fs20, {color: ts.secondarytext}]}
                />
              </Flex>
            </TouchableOpacity>
            {show.fssaiEnable && (
              <View style={styles.accordianitem}>
                {!localPan?.path && !pan && (
                  <Text style={[styles.heading, gs.mb15]}>
                    Upload FSSAI License
                  </Text>
                )}
                <Center>
                  {localFs?.path && !fs && (
                    <ImageBackground
                      resizeMode="cover"
                      source={{uri: localFs?.path}}
                      alt="profile"
                      style={{...styles.img, opacity: 0.5}}
                      imageStyle={{borderRadius: 10}}
                    />
                  )}
                  {!localFs?.path && fs?.length > 0 && (
                    <ImageBackground
                      resizeMode="cover"
                      source={{
                        uri: fs[0]['image_name'][0].medium,
                      }}
                      alt="profile"
                      style={{...styles.img}}
                      imageStyle={{borderRadius: 10}}>
                      <View
                        style={[
                          gs.h40,
                          {justifyContent: 'flex-end', alignItems: 'flex-end'},
                          gs.ph10,
                        ]}>
                        <Flex direction="row">
                          <TouchableOpacity
                            style={[{...styles.iconContainer}]}
                            activeOpacity={0.7}
                            onPress={() => {
                              handleFsEdit(info['vendor-encf'][0].id);
                            }}>
                            <MaterialIcons
                              name="edit"
                              style={[gs.fs20, {color: '#000'}]}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[{...styles.iconContainer}, gs.ml10]}
                            activeOpacity={0.7}
                            onPress={() => {
                              handleFsdel(info['vendor-encf'][0].id);
                            }}>
                            <MaterialIcons
                              name="delete"
                              style={[gs.fs20, {color: '#000'}]}
                            />
                          </TouchableOpacity>
                        </Flex>
                      </View>
                    </ImageBackground>
                  )}

                  {!localFs?.path && !fs?.length && (
                    <TouchableOpacity
                      style={[
                        {...styles.uploadbtn, backgroundColor: theme},
                        gs.br10,
                      ]}
                      onPress={handleFsUpload}>
                      <Flex direction="row" alignItems="center">
                        <AntIcon
                          name="cloudupload"
                          style={[gs.fs20, {color: '#fff'}, gs.mr10]}
                        />
                        <Text
                          style={[
                            gs.fs16,
                            {fontFamily: ts.secondaryregular, color: '#fff'},
                          ]}>
                          Upload
                        </Text>
                      </Flex>
                    </TouchableOpacity>
                  )}
                </Center>
              </View>
            )}
          </View>
          <Divider style={[gs.mv20, {backgroundColor: theme}]} />
          <Text style={styles.heading}>Links</Text>
          {/* ====ABOUT US====== */}
          <View style={[gs.mv10]}>
            <TouchableOpacity
              style={styles.labelcontainer}
              onPress={() =>
                navigation.navigate('PageStack', {
                  screen: 'AboutUs',
                })
              }>
              <Flex
                direction="row"
                alignItems="center"
                justifyContent="space-between">
                <Text style={[{...styles.accordianTitle}, gs.mh15]}>
                  About Us
                </Text>
                <EntypoIcons
                  name="chevron-small-right"
                  style={{
                    ...styles.righticon,
                    color: ts.primarytext,
                  }}
                />
              </Flex>
            </TouchableOpacity>
            {/* =====FAQ'S======= */}
            <TouchableOpacity
              style={styles.labelcontainer}
              onPress={() =>
                navigation.navigate('PageStack', {
                  screen: 'Faq',
                })
              }>
              <Flex
                direction="row"
                alignItems="center"
                justifyContent="space-between">
                <Text style={[{...styles.accordianTitle}, gs.mh15]}>FAQ's</Text>
                <EntypoIcons
                  name="chevron-small-right"
                  style={{
                    ...styles.righticon,
                    color: ts.primarytext,
                  }}
                />
              </Flex>
            </TouchableOpacity>
          </View>
          <Divider style={[gs.mv20, {backgroundColor: theme}]} />
          <Text style={styles.heading}>Help Desk / Support</Text>
          <TouchableOpacity
            style={[gs.mv20]}
            onPress={() =>
              navigation.navigate('PageStack', {
                screen: 'HelpDesk',
              })
            }>
            <ThemeSepBtn
              themecolor={theme}
              btntxt="Raise a Ticket"
              height={40}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  profileimg: {
    height: '50@ms',
    width: '50@ms',
    borderRadius: '50@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: '13@ms',
    color: ts.secondarytext,
    fontFamily: ts.secondaryregular,
  },
  input: {
    height: '44@ms',
    backgroundColor: '#fff',
    marginVertical: '10@ms',
    color: ts.secondarytext,
    fontSize: '14@ms',
  },
  labelcontainer: {
    // height: '60@ms',
    borderRadius: '10@ms',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderWidth: 0.5,
    borderColor: '#999',
    marginVertical: '5@ms',
    padding: '15@ms',
  },
  accordianTitle: {
    fontFamily: ts.secondaryregular,
    color: ts.primarytext,
    fontSize: '15@ms',
  },
  accordianitem: {
    padding: '10@ms',
    backgroundColor: '#f5f5f5',
    // marginTop: '-10@ms',
    borderBottomLeftRadius: '10@ms',
    borderBottomRightRadius: '10@ms',
    borderBottomColor: '#999',
    borderTopColor: 'transparent',
    borderLeftColor: '#999',
    borderRightColor: '#999',
    borderWidth: 0.5,
  },
  uploadbtn: {
    height: '40@ms',
    width: '150@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  righticon: {
    fontSize: '24@ms',
    color: '#fff',
    marginRight: '20@ms',
  },
  img: {
    height: 150,
    width: 250,
  },
  iconContainer: {
    height: '30@ms',
    width: '30@ms',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    opacity: 0.7,
    marginTop: '10@ms',
  },
});
