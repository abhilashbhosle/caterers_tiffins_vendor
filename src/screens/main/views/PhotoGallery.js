import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  ImageBackground,
  TouchableOpacity,
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
import {imgUpload} from '../../controllers/PhotoController';

export default function PhotoGallery({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const [packagesheet, setPackageSheet] = useState(false);
  const [servicesheet, setServicesheet] = useState(false);
  const [othersheet, setOthersheet] = useState(false);
  const [addpack, setAddpack] = useState(false);
  const [delpack, setDelpack] = useState(false);
  const [addser, setAddser] = useState(false);
  const [delser, setDelser] = useState(false);
  const [other, setOther] = useState(false);
  const [delother, setDelother] = useState(false);
  const dispatch = useDispatch();
  const {height, width} = useWindowDimensions();
  const logoUpdates = useSelector(state => state.photo.logoRes);
  const localImageData = useSelector(state => state.photo.img);
  console.log('logo updates', logoUpdates);
  console.log("image upload",localImageData);
  useEffect(() => {
    (async () => {
      let flow = await AsyncStorage.getItem('flow');
      dispatch(getFlow(flow));
      // dispatch(getCuisine());
    })();
  }, []);
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
  let pics;
  const handleClose = () => {
    setOthersheet(false);
    setServicesheet(false);
    setPackageSheet(false);
    setDelother(false);
    setDelpack(false);
    setDelser(false);
    setAddpack(false);
    setAddser(false);
    setOther(false);
  };
  const handleAddSheet = () => {
    if (packagesheet) {
      setPackageSheet(false);
      setAddpack(true);
    } else if (servicesheet) {
      setServicesheet(false);
      setAddser(true);
    } else if (othersheet) {
      setOthersheet(false);
      setOther(true);
    }
  };
  const handleDelSheet = () => {
    if (packagesheet) {
      setPackageSheet(false);
      setDelpack(true);
    } else if (servicesheet) {
      setServicesheet(false);
      setDelser(true);
    } else if (othersheet) {
      setOthersheet(false);
      setDelother(true);
    }
  };
  const handleUploadLogo = () => {
    setLogo({...logo, add: true});
    dispatch(imgUpload({selection: 'logo', type: 'insert'}));
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
            <ImageBackground
              source={require('../../../assets/PhotoGallery/brand.jpg')}
              style={styles.img}
              resizeMode="cover"
              imageStyle={[gs.br12]}
            />
            <TouchableOpacity onPress={handleUploadLogo}>
              <AntIcons
                name="pluscircle"
                style={[gs.fs30, gs.mv18, {color: theme}]}
              />
            </TouchableOpacity>
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
            {/* <ImageBackground
              source={require('../../../assets/PhotoGallery/banner.jpg')}
              style={styles.bannerimg}
              resizeMode="cover"
              imageStyle={[gs.br12]}
            /> */}
            <AntIcons
              name="pluscircle"
              style={[gs.fs30, gs.mv18, {color: theme}]}
            />
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
              <TouchableOpacity
                onPress={() => {
                  setPackageSheet(true);
                }}>
                <MaterialIcons name="edit" style={[gs.fs24, {color: theme}]} />
              </TouchableOpacity>
            </Flex>
          </View>
          <Flex
            direction="row"
            alignItems="center"
            flexWrap="wrap"
            style={gs.mt15}>
            {pics?.map((e, i) => {
              return (
                <View key={i}>
                  <ImageBackground
                    source={e}
                    alt="pic"
                    style={{...styles.picsimg, width: width / 3.6}}
                    imageStyle={gs.br10}
                    resizeMode="cover">
                    <Flex justify="flex-end" alignItems="flex-end">
                      {delpack && (
                        <Animatable.View
                          animation="bounceIn"
                          useNativeDriver={true}>
                          <MaterialComIcons
                            name="delete-circle-outline"
                            style={[gs.fs24, {color: '#fff'}, gs.p8]}
                          />
                        </Animatable.View>
                      )}
                    </Flex>
                  </ImageBackground>
                </View>
              );
            })}
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
              <TouchableOpacity
                onPress={() => {
                  setServicesheet(true);
                }}>
                <MaterialIcons name="edit" style={[gs.fs24, {color: theme}]} />
              </TouchableOpacity>
            </Flex>
          </View>
          <Flex
            direction="row"
            alignItems="center"
            flexWrap="wrap"
            style={gs.mt15}>
            {pics?.map((e, i) => {
              return (
                <View key={i}>
                  <ImageBackground
                    source={e}
                    alt="pic"
                    style={{...styles.picsimg, width: width / 3.6}}
                    imageStyle={gs.br10}
                    resizeMode="cover">
                    <Flex justify="flex-end" alignItems="flex-end">
                      {delser && (
                        <Animatable.View
                          animation="bounceIn"
                          useNativeDriver={true}>
                          <MaterialComIcons
                            name="delete-circle-outline"
                            style={[gs.fs24, {color: '#fff'}, gs.p8]}
                          />
                        </Animatable.View>
                      )}
                    </Flex>
                  </ImageBackground>
                </View>
              );
            })}
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
              <TouchableOpacity
                onPress={() => {
                  setOthersheet(true);
                }}>
                <MaterialIcons name="edit" style={[gs.fs24, {color: theme}]} />
              </TouchableOpacity>
            </Flex>
          </View>
          <Flex
            direction="row"
            alignItems="center"
            flexWrap="wrap"
            style={gs.mt15}>
            {pics?.map((e, i) => {
              return (
                <View key={i}>
                  <ImageBackground
                    source={e}
                    alt="pic"
                    style={{...styles.picsimg, width: width / 3.6}}
                    imageStyle={gs.br10}
                    resizeMode="cover">
                    <Flex justify="flex-end" alignItems="flex-end">
                      {delother && (
                        <Animatable.View
                          animation="bounceIn"
                          useNativeDriver={true}>
                          <MaterialComIcons
                            name="delete-circle-outline"
                            style={[gs.fs24, {color: '#fff'}, gs.p8]}
                          />
                        </Animatable.View>
                      )}
                    </Flex>
                  </ImageBackground>
                </View>
              );
            })}
          </Flex>
        </Card>
        <Actionsheet
          isOpen={packagesheet || servicesheet || othersheet}
          onClose={handleClose}>
          <Actionsheet.Content style={{backgroundColor: '#fff'}}>
            <View style={[{width}, gs.ph10]}>
              <Text
                style={[
                  gs.fs16,
                  {color: theme, fontFamily: ts.secondaryregular},
                ]}>
                {packagesheet
                  ? 'Package / Menu card'
                  : servicesheet
                  ? 'Service'
                  : 'Other'}
              </Text>
              <Divider style={[gs.mv10]} />
              <TouchableOpacity onPress={handleAddSheet}>
                <Flex direction="row" alignItems="center">
                  <MaterialIcons
                    name="add"
                    style={[gs.fs24, {color: ts.primarytext}, gs.pr10]}
                  />
                  <Text
                    style={[
                      gs.fs14,
                      gs.pv10,
                      {color: ts.primarytext, fontFamily: ts.secondaryregular},
                    ]}>
                    Add New Photo
                  </Text>
                </Flex>
              </TouchableOpacity>
              <Divider style={[gs.mv3]} />
              <TouchableOpacity onPress={handleDelSheet}>
                <Flex direction="row" alignItems="center">
                  <MaterialIcons
                    name="delete"
                    style={[gs.fs24, {color: ts.accent4}, gs.pr10]}
                  />
                  <Text
                    style={[
                      gs.fs14,
                      gs.pv10,
                      {color: ts.accent4, fontFamily: ts.secondaryregular},
                    ]}>
                    Delete
                  </Text>
                </Flex>
              </TouchableOpacity>
              <Divider style={[gs.mv3]} />
              <TouchableOpacity onPress={handleClose}>
                <Flex direction="row" alignItems="center">
                  <MaterialIcons
                    name="close"
                    style={[gs.fs24, {color: '#00f'}, gs.pr10]}
                  />
                  <Text
                    style={[
                      gs.fs14,
                      gs.pv10,
                      {color: '#00f', fontFamily: ts.secondaryregular},
                    ]}>
                    Cancel
                  </Text>
                </Flex>
              </TouchableOpacity>
            </View>
          </Actionsheet.Content>
        </Actionsheet>
      </ScrollView>
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
});
