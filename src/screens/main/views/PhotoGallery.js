import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {useDispatch, useSelector} from 'react-redux';
import {ts} from '../../../../ThemeStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Actionsheet, Center, Divider, Flex, Image} from 'native-base';
import {gs} from '../../../../GlobalStyles';
import {ScaledSheet} from 'react-native-size-matters';
import {Card} from 'react-native-paper';
import MaterialComIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import AntIcons from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFlow} from '../../../redux/slicers/CommomSlicer';
import {
  emptyLocalImgs,
  emptyLocalLogo,
  emptyOther,
  emptyPackage,
  emptyService,
  imgUpload,
  imgUploadBanner,
  otherUpload,
  packageUpload,
  serviceUpload,
} from '../../controllers/PhotoController';
import {color} from 'native-base/lib/typescript/theme/styled-system';
import {
  deleteBannerService,
  deleteLogoService,
  deleteOtherService,
  deletePackageService,
  deleteService,
  gateGalleryService,
} from '../../services/PhotoService';
import ThemeSepBtn from '../../../components/ThemeSepBtn';

export default function PhotoGallery({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const [gallery, setGallery] = useState({});
  const dispatch = useDispatch();
  const {height, width} = useWindowDimensions();
  const logoUpdates = useSelector(state => state.photo.logoRes);
  const localImageData = useSelector(state => state.photo.img);
  const bannerUpdates = useSelector(state => state.photo.bannerRes);
  const localBannerData = useSelector(state => state.photo.bannerimg);
  const localPackageData = useSelector(state => state.photo.packageImg);
  const packageUpdates = useSelector(state => state.photo.packageRes);
  const localServData = useSelector(state => state.photo.serviceImg);
  const servUpdates = useSelector(state => state.photo.serviceRes);
  const localOtherData = useSelector(state => state.photo.otherImg);
  const otherUpdates = useSelector(state => state.photo.otherRes);
  const [enableCrop, setEnableCrop] = useState(true);
  const [enableCropSheet, setEnableCropSheet] = useState(false);
  const [selection, setSelection] = useState({
    type: '',
    id: '',
  });
  const handleEnableSheet = (type, id) => {
    setEnableCropSheet(true);
    setSelection({
      type: type,
      id: id ? id : null,
    });
  };
  useEffect(() => {
    (async () => {
      let flow = await AsyncStorage.getItem('flow');
      dispatch(getFlow(flow));
      let res = await gateGalleryService({dispatch, loading: true});
      if (res?.data?.status == 'success') {
        setGallery(res?.data?.data);
      }
    })();
  }, []);
  useEffect(() => {
    if (
      logoUpdates ||
      bannerUpdates ||
      packageUpdates ||
      servUpdates ||
      otherUpdates
    ) {
      (async () => {
        let res = await gateGalleryService({dispatch, loading: false});
        if (res?.data?.status == 'success') {
          dispatch(emptyPackage());
          dispatch(emptyService());
          dispatch(emptyOther());
          setGallery(res?.data?.data);
          setTimeout(() => {
            dispatch(emptyLocalImgs());
          }, 1000);
        }
      })();
    }
  }, [logoUpdates, bannerUpdates, packageUpdates, servUpdates, otherUpdates]);

  const [logo, setLogo] = useState({
    add: false,
    delete: false,
    replace: false,
  });
  const [banner, setBanner] = useState({
    add: false,
    delete: false,
    replace: false,
  });

  // ======LOGO UPLOAD======//
  const handleUploadLogo = type => {
    setLogo({...logo, add: true});
    dispatch(
      imgUpload({selection: 'logo', type: 'insert', typeOfUpload: type}),
    );
  };
  // =====BANNER UPLOAD======//
  const handleBannerUpload = typeOfUpload => {
    setBanner({...banner, add: true});
    dispatch(
      imgUploadBanner({
        selection: 'banner',
        type: 'insert',
        typeOfUpload: typeOfUpload,
      }),
    );
  };
  // =====PACKAGE UPLOAD=====//
  const handlePackageUpload = () => {
    dispatch(packageUpload({selection: 'package', type: 'insert'}));
  };
  // =====SERVICE UPLOAD=====//
  const handleServiceUpload = () => {
    dispatch(serviceUpload({selection: 'service', type: 'insert'}));
  };
  // =====OTHER UPLOAD=====//
  const handleOtherUpload = () => {
    dispatch(otherUpload({selection: 'service', type: 'insert'}));
  };
  // ======LOGO EDIT=====//
  const handleLogoEdit = (id, typeofUpload) => {
    dispatch(
      imgUpload({
        selection: 'logo',
        type: 'replace',
        id: id,
        typeOfUpload: typeofUpload,
      }),
    );
  };
  // ======BANNER EDIT======//
  const handleBannerEdit = (id,typeofUpload) => {
    console.log("type of up",typeofUpload)
    dispatch(imgUploadBanner({selection: 'banner', type: 'replace', id: id,typeofUpload:typeofUpload}));
  };
  // ========EDIT PACKAGE========//
  const handlePackageEdit = (id, i) => {
    dispatch(
      packageUpload({selection: 'package', type: 'replace', id: id, index: i}),
    );
  };
  // ========EDIT SERVICE========//
  const handleServiceEdit = (id, i) => {
    dispatch(
      serviceUpload({selection: 'package', type: 'replace', id: id, index: i}),
    );
  };
  // ========EDIT OTHER========//
  const handleOtherEdit = (id, i) => {
    dispatch(
      otherUpload({selection: 'package', type: 'replace', id: id, index: i}),
    );
  };
  // =====DELETE LOGO======//
  const handleLogoDel = async id => {
    Alert.alert(
      'Delete Brand Logo',
      'Are you sure, you want to delete brand logo?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => delLogo(id),
        },
      ],
      {cancelable: false},
    );
  };
  const delLogo = async id => {
    let res = await deleteLogoService(id);
    if (res?.data?.status == 'success') {
      let data = {...gallery};
      data['vendor-brand-logo'] = [];
      setGallery(data);
    }
  };
  // =====DELETE BANNER======//
  const handleBannerDel = async id => {
    Alert.alert(
      'Delete Main Banner',
      'Are you sure, you want to delete main banner?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => delBanner(id),
        },
      ],
      {cancelable: false},
    );
  };
  const delBanner = async id => {
    let res = await deleteBannerService(id);
    if (res?.data?.status == 'success') {
      let data = {...gallery};
      data['vendor-banner'] = [];
      setGallery(data);
    }
  };

  // ===DELETE PACKAGE===== //
  const handlePackageDel = (id, i) => {
    Alert.alert(
      'Delete Selected Photo',
      'Are you sure, you want to delete the photo?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => delPackage(id, i),
        },
      ],
      {cancelable: false},
    );
  };
  const delPackage = async (id, i) => {
    let res = await deletePackageService(id);
    if (res?.data?.status == 'success') {
      let result = await gateGalleryService({dispatch, loading: false});
      setGallery(result?.data?.data);
    }
  };
  // ===DELETE SERVICE===== //
  const handleServDel = (id, i) => {
    Alert.alert(
      'Delete Selected Photo',
      'Are you sure, you want to delete the photo?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => delServ(id, i),
        },
      ],
      {cancelable: false},
    );
  };
  const delServ = async (id, i) => {
    let res = await deleteService(id);
    if (res?.data?.status == 'success') {
      let result = await gateGalleryService({dispatch, loading: false});
      setGallery(result?.data?.data);
    }
  };
  // ===DELETE OTHER===== //
  const handleOtherDel = (id, i) => {
    Alert.alert(
      'Delete Selected Photo',
      'Are you sure, you want to delete the photo?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => delOther(id, i),
        },
      ],
      {cancelable: false},
    );
  };
  const delOther = async (id, i) => {
    let res = await deleteOtherService(id);
    if (res?.data?.status == 'success') {
      let result = await gateGalleryService({dispatch, loading: false});
      setGallery(result?.data?.data);
    }
  };

  return (
    <ScreenWrapper>
      {/* =====HEADER======== */}
      <ThemeHeaderWrapper
        lefttxt="Photo Gallery"
        navigation={navigation}
        notifyIcon={false}
      />
      <ScrollView style={[{flex: 1, backgroundColor: '#fff'}]}>
        {/* =====BRAND LOGO====== */}
        <Card style={[gs.p15, {backgroundColor: '#fff'}]}>
          <View>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between">
              <Text
                style={[
                  gs.fs21,
                  {color: ts.primarytext, fontFamily: ts.primarymedium},
                ]}>
                Brand Logo
              </Text>
              {/* <MaterialIcons name="edit" style={[gs.fs24, {color: theme}]} /> */}
            </Flex>
          </View>
          <Center width={'100%'}>
            {gallery &&
            gallery['vendor-brand-logo']?.length > 0 &&
            !logoUpdates.loading &&
            !localImageData?.path ? (
              <Flex direction="row" alignItems="center">
                <ImageBackground
                  source={{
                    uri: gallery['vendor-brand-logo'][0]?.image_name[0]?.medium,
                  }}
                  style={{
                    ...styles.img,
                  }}
                  resizeMode="cover"
                  imageStyle={[gs.br12]}>
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
                          // handleLogoEdit(gallery['vendor-brand-logo'][0].id);
                          handleEnableSheet(
                            'logoEdit',
                            gallery['vendor-brand-logo'][0].id,
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
                          handleLogoDel(gallery['vendor-brand-logo'][0].id);
                        }}>
                        <MaterialIcons
                          name="delete"
                          style={[gs.fs20, {color: '#000'}]}
                        />
                      </TouchableOpacity>
                    </Flex>
                  </View>
                </ImageBackground>
              </Flex>
            ) : (
              <>
                {localImageData?.path && (
                  <Flex direction="row" alignItems="center">
                    <ImageBackground
                      source={{uri: localImageData.path}}
                      style={{
                        ...styles.img,
                        opacity:
                          logoUpdates.loading ||
                          logoUpdates?.data?.status == 'error'
                            ? 0.5
                            : 1,
                      }}
                      resizeMode="cover"
                      imageStyle={[gs.br12]}></ImageBackground>
                    {logoUpdates?.data?.status == 'error' && (
                      <MaterialIcons
                        name="error-outline"
                        style={[gs.fs28, {color: ts.accent4}]}
                      />
                    )}
                  </Flex>
                )}
                {!localImageData?.path && (
                  <TouchableOpacity
                    onPress={
                      // handleUploadLogo
                      () => {
                        handleEnableSheet('logoUpload', null);
                      }
                    }>
                    <AntIcons
                      name="pluscircle"
                      style={[gs.fs30, gs.mv18, {color: theme}]}
                    />
                  </TouchableOpacity>
                )}
              </>
            )}
          </Center>
        </Card>
        {/* =====MAIN BANNER====== */}
        <Card style={[gs.p15, {backgroundColor: '#fff'}, gs.mv5]}>
          <View>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between">
              <Text
                style={[
                  gs.fs21,
                  {color: ts.primarytext, fontFamily: ts.primarymedium},
                ]}>
                Main Banner
              </Text>
              {/* <MaterialIcons name="edit" style={[gs.fs24, {color: theme}]} /> */}
            </Flex>
          </View>
          <Center width={'100%'}>
            {gallery &&
            gallery['vendor-banner']?.length > 0 &&
            !bannerUpdates.loading &&
            !localBannerData?.path ? (
              <Flex direction="row" alignItems="center">
                <ImageBackground
                  source={{
                    uri: gallery['vendor-banner'][0]?.image_name[0]?.medium,
                  }}
                  style={{
                    ...styles.img,
                  }}
                  resizeMode="cover"
                  imageStyle={[gs.br12]}>
                  <View
                    style={[
                      gs.h40,
                      {justifyContent: 'flex-end', alignItems: 'flex-end'},
                      gs.ph10,
                    ]}>
                    <Flex direction="row">
                      <TouchableOpacity
                        style={styles.iconContainer}
                        activeOpacity={0.7}
                        onPress={() => {
                          handleEnableSheet('bannerEdit',gallery['vendor-banner'][0].id);
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
                          handleBannerDel(gallery['vendor-banner'][0].id);
                        }}>
                        <MaterialIcons
                          name="delete"
                          style={[gs.fs20, {color: '#000'}]}
                        />
                      </TouchableOpacity>
                    </Flex>
                  </View>
                </ImageBackground>
              </Flex>
            ) : (
              <>
                {localBannerData?.path && (
                  <Flex direction="row" alignItems="center">
                    <ImageBackground
                      source={{uri: localBannerData.path}}
                      style={{
                        ...styles.img,
                        opacity:
                          bannerUpdates.loading ||
                          bannerUpdates?.data?.status == 'error'
                            ? 0.5
                            : 1,
                      }}
                      resizeMode="cover"
                      imageStyle={[gs.br12]}></ImageBackground>
                    {bannerUpdates?.data?.status == 'error' && (
                      <MaterialIcons
                        name="error-outline"
                        style={[gs.fs28, {color: ts.accent4}]}
                      />
                    )}
                  </Flex>
                )}
                {!localBannerData?.path && (
                  <TouchableOpacity
                    onPress={
                      // handleBannerUpload
                      () => {
                        handleEnableSheet('bannerUpload', null);
                      }
                    }>
                    <AntIcons
                      name="pluscircle"
                      style={[gs.fs30, gs.mv18, {color: theme}]}
                    />
                  </TouchableOpacity>
                )}
              </>
            )}
          </Center>
        </Card>
        {/* =====PACKAGE / MENU CARDS======== */}
        <Card style={[gs.p15, {backgroundColor: '#fff'}]}>
          <View>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between">
              <Text
                style={[
                  gs.fs21,
                  {color: ts.primarytext, fontFamily: ts.primarymedium},
                ]}>
                Package / Menu Card Photos
              </Text>
            </Flex>
          </View>
          <Flex
            direction="row"
            alignItems="center"
            flexWrap="wrap"
            style={gs.mt15}>
            {gallery &&
              gallery['vendor-menu']?.length > 0 &&
              gallery['vendor-menu']?.map((e, i) => {
                return (
                  <View key={i}>
                    {e['image_name'][0] && (
                      <ImageBackground
                        source={{uri: e['image_name'][0].medium}}
                        alt="pic"
                        style={{
                          ...styles.picsimg,
                          width: width / 3.6,
                          opacity: localPackageData?.index == i ? 0.5 : 1,
                        }}
                        onLoadStart={() => {
                          console.log('loadstart', i);
                        }}
                        onLoadEnd={() => {
                          console.log('loadend', i);
                        }}
                        imageStyle={gs.br10}
                        resizeMode="cover">
                        <Flex direction="row" justify="flex-end">
                          <TouchableOpacity
                            style={styles.iconContainer1}
                            activeOpacity={0.7}
                            onPress={() => {
                              handlePackageEdit(e.id, i);
                            }}>
                            <MaterialIcons
                              name="edit"
                              style={[gs.fs15, {color: '#000'}]}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              {...styles.iconContainer1},
                              gs.ml10,
                              gs.mr8,
                            ]}
                            activeOpacity={0.7}
                            onPress={() => {
                              handlePackageDel(e.id, i);
                            }}>
                            <MaterialIcons
                              name="delete"
                              style={[gs.fs15, {color: '#000'}]}
                            />
                          </TouchableOpacity>
                        </Flex>
                      </ImageBackground>
                    )}
                  </View>
                );
              })}
            {localPackageData?.path &&
              !localPackageData?.index &&
              localPackageData?.index !== 0 && (
                <ImageBackground
                  source={{uri: localPackageData.path}}
                  alt="pic"
                  style={{
                    ...styles.picsimg,
                    width: width / 3.6,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0.5,
                  }}
                  imageStyle={gs.br10}
                  resizeMode="cover"></ImageBackground>
              )}
            {!packageUpdates.loading && (
              <TouchableOpacity onPress={handlePackageUpload}>
                <AntIcons
                  name="pluscircle"
                  style={[gs.fs30, gs.mv18, {color: theme}]}
                />
              </TouchableOpacity>
            )}
          </Flex>
        </Card>
        {/* =====SERVICE PHOTOS======== */}
        <Card style={[gs.p15, {backgroundColor: '#fff'}, gs.mv5]}>
          <View>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between">
              <Text
                style={[
                  gs.fs21,
                  {color: ts.primarytext, fontFamily: ts.primarymedium},
                ]}>
                Service Photos
              </Text>
            </Flex>
          </View>
          <Flex
            direction="row"
            alignItems="center"
            flexWrap="wrap"
            style={gs.mt15}>
            {gallery &&
              gallery['vendor-service']?.length > 0 &&
              gallery['vendor-service']?.map((e, i) => {
                return (
                  <View key={i}>
                    {e['image_name'][0] && (
                      <ImageBackground
                        source={{uri: e['image_name'][0].medium}}
                        alt="pic"
                        style={{
                          ...styles.picsimg,
                          width: width / 3.6,
                          opacity: localServData?.index == i ? 0.5 : 1,
                        }}
                        imageStyle={gs.br10}
                        resizeMode="cover">
                        <Flex direction="row" justify="flex-end">
                          <TouchableOpacity
                            style={styles.iconContainer1}
                            activeOpacity={0.7}
                            onPress={() => {
                              handleServiceEdit(e.id, i);
                            }}>
                            <MaterialIcons
                              name="edit"
                              style={[gs.fs15, {color: '#000'}]}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              {...styles.iconContainer1},
                              gs.ml10,
                              gs.mr8,
                            ]}
                            activeOpacity={0.7}
                            onPress={() => {
                              handleServDel(e.id, i);
                            }}>
                            <MaterialIcons
                              name="delete"
                              style={[gs.fs15, {color: '#000'}]}
                            />
                          </TouchableOpacity>
                        </Flex>
                      </ImageBackground>
                    )}
                  </View>
                );
              })}

            {localServData?.path &&
              !localServData?.index &&
              localServData?.index !== 0 && (
                <ImageBackground
                  source={{uri: localServData.path}}
                  alt="pic"
                  style={{
                    ...styles.picsimg,
                    width: width / 3.6,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0.5,
                  }}
                  imageStyle={gs.br10}
                  resizeMode="cover"></ImageBackground>
              )}
            {!servUpdates.loading && (
              <TouchableOpacity onPress={handleServiceUpload}>
                <AntIcons
                  name="pluscircle"
                  style={[gs.fs30, gs.mv18, {color: theme}]}
                />
              </TouchableOpacity>
            )}
          </Flex>
        </Card>
        {/* =====OTHER PHOTOS======== */}
        <Card style={[gs.p15, {backgroundColor: '#fff'}]}>
          <View>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between">
              <Text
                style={[
                  gs.fs21,
                  {color: ts.primarytext, fontFamily: ts.primarymedium},
                ]}>
                Other Photos
              </Text>
            </Flex>
          </View>
          <Flex
            direction="row"
            alignItems="center"
            flexWrap="wrap"
            style={gs.mt15}>
            {gallery &&
              gallery['vendor-other']?.length > 0 &&
              gallery['vendor-other']?.map((e, i) => {
                return (
                  <View key={i}>
                    {e['image_name'][0] && (
                      <ImageBackground
                        source={{uri: e['image_name'][0].medium}}
                        alt="pic"
                        style={{
                          ...styles.picsimg,
                          width: width / 3.6,
                          opacity: localOtherData?.index == i ? 0.5 : 1,
                        }}
                        imageStyle={gs.br10}
                        resizeMode="cover">
                        <Flex direction="row" justify="flex-end">
                          <TouchableOpacity
                            style={styles.iconContainer1}
                            activeOpacity={0.7}
                            onPress={() => {
                              handleOtherEdit(e.id, i);
                            }}>
                            <MaterialIcons
                              name="edit"
                              style={[gs.fs15, {color: '#000'}]}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              {...styles.iconContainer1},
                              gs.ml10,
                              gs.mr8,
                            ]}
                            activeOpacity={0.7}
                            onPress={() => {
                              handleOtherDel(e.id, i);
                            }}>
                            <MaterialIcons
                              name="delete"
                              style={[gs.fs15, {color: '#000'}]}
                            />
                          </TouchableOpacity>
                        </Flex>
                      </ImageBackground>
                    )}
                  </View>
                );
              })}
            {localOtherData?.path &&
              !localOtherData?.index &&
              localOtherData?.index !== 0 && (
                <ImageBackground
                  source={{uri: localOtherData.path}}
                  alt="pic"
                  style={{
                    ...styles.picsimg,
                    width: width / 3.6,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0.5,
                  }}
                  imageStyle={gs.br10}
                  resizeMode="cover"></ImageBackground>
              )}
            {!otherUpdates.loading && (
              <TouchableOpacity onPress={handleOtherUpload}>
                <AntIcons
                  name="pluscircle"
                  style={[gs.fs30, gs.mv18, {color: theme}]}
                />
              </TouchableOpacity>
            )}
          </Flex>
        </Card>
      </ScrollView>
      <Actionsheet
        isOpen={enableCropSheet}
        onClose={() => {
          setEnableCropSheet(!enableCropSheet);
        }}>
        <Actionsheet.Content
          style={[{backgroundColor: '#fff', alignItems: 'flex-start'}]}>
          <Pressable
            onPress={() => {
              if (selection.type == 'logoUpload') {
                handleUploadLogo('normal');
              } else if (selection.type == 'logoEdit') {
                handleLogoEdit(selection.id, 'normal');
              } else if (selection.type == 'bannerUpload') {
                handleBannerUpload('normal');
              }
              else if (selection.type == 'bannerEdit'){
                handleBannerEdit(selection.id,'normal')
              }
              setEnableCropSheet(false);
              setSelection({type: '', id: null});
            }}>
            <Text
              style={[
                gs.p10,
                gs.fs15,
                {fontFamily: ts.secondarymedium, color: theme},
              ]}>
              Upload Image
            </Text>
          </Pressable>
          <Divider style={[gs.ph10]} />
          <Pressable
            onPress={() => {
              if (selection.type == 'logoUpload') {
                handleUploadLogo('crop');
              } else if (selection.type == 'logoEdit') {
                handleLogoEdit(selection.id, 'crop');
              } else if (selection.type == 'bannerUpload') {
                handleBannerUpload('crop');
              }
              else if (selection.type == 'bannerEdit'){
                handleBannerEdit(selection.id,'crop')
              }
              setEnableCropSheet(false);
              setSelection({type: '', id: null});
            }}>
            <Text
              style={[
                gs.p10,
                gs.fs15,
                {fontFamily: ts.secondarymedium, color: theme},
              ]}>
              Upload Crop Image
            </Text>
          </Pressable>
        </Actionsheet.Content>
      </Actionsheet>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  img: {
    height: '150@ms',
    width: '200@ms',
    marginVertical: '20@ms',
  },
  bannerimg: {
    height: '180@ms',
    width: '300@ms',
    marginVertical: '20@ms',
  },
  picsimg: {
    height: '100@ms',
    margin: '5@ms',
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
  iconContainer1: {
    height: '20@ms',
    width: '20@ms',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    opacity: 0.7,
    marginTop: '5@ms',
  },
});
