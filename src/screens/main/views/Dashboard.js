import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect } from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import {useDispatch, useSelector} from 'react-redux';
import {ts} from '../../../../ThemeStyles';
import {Flex} from 'native-base';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {ScaledSheet} from 'react-native-size-matters';
import {gs} from '../../../../GlobalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import AntIcons from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFlow } from '../../../redux/slicers/CommomSlicer';

export default function Dashboard({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const {height, width} = useWindowDimensions();
  const dispatch=useDispatch()
  useEffect(()=>{
    (async () => {
      let flow = await AsyncStorage.getItem('flow');
      dispatch(getFlow(flow));
    })();
  },[])
  return (
    <>
      <ScreenWrapper>
        {/* =====HEADER======== */}
        <ThemeHeaderWrapper
          lefttxt="Dashboard"
          navigation={navigation}
          notifyIcon={true}
        />
        <View style={[{flex: 1, backgroundColor: '#fff'}, gs.ph15, gs.pt20]}>
          <Flex direction="row" alignItems="center">
            <Text
              style={[
                gs.fs13,
                {fontFamily: ts.secondaryregular, color: ts.secondarytext},
              ]}>
              Subscription Type:
            </Text>
            <View style={styles.brandedbtn}>
              <Text
                style={[
                  gs.fs13,
                  {fontFamily: ts.secondaryregular, color: '#fff'},
                ]}>
                Branded
              </Text>
            </View>
          </Flex>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            style={[gs.mv20]}>
            <Text
              style={[
                gs.fs13,
                {fontFamily: ts.secondaryregular, color: ts.secondarytext},
              ]}>
              Your Subscription Status:
            </Text>
            <Flex direction="row" alignItems="center">
              <AntIcons name="check" style={[gs.fs22, {color: ts.accent3}]} />
              <Text
                style={[
                  gs.fs17,
                  {color: ts.accent3, fontFamily: ts.secondarysemibold},
                ]}>
                Active
              </Text>
            </Flex>
          </Flex>

          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            style={[gs.mb10]}>
            <Text
              style={[
                gs.fs13,
                {fontFamily: ts.secondaryregular, color: ts.secondarytext},
              ]}>
              Subscription Remaining Days:
            </Text>
            <Text
              style={[
                gs.fs17,
                {color: theme, fontFamily: ts.secondarysemibold},
              ]}>
              235 Days
            </Text>
          </Flex>
          {/* =======STATUS BOARDS========== */}

          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            style={[gs.mv20]}>
            <Animatable.View
              animation="pulse"
              easing="ease-out"
              iterationCount="infinite"
              useNativeDriver={true}
              style={{
                ...styles.statuscontainer,
                width: width / 2.25,
                backgroundColor: theme,
                shadowColor:theme
              }}>
              <Flex direction="row" alignItems="center">
                <View
                  animation="pulse"
                  easing="ease-out"
                  iterationCount="infinite">
                  <AntIcons name="eye" style={[gs.fs24, {color: '#fff'}]} />
                </View>
                <Text
                  style={[
                    gs.fs14,
                    {fontFamily: ts.secondarysemibold, color: '#fff'},
                    gs.mh5,
                  ]}>
                  Total Views
                </Text>
              </Flex>
              <Flex justifyContent="flex-end" alignItems="flex-end">
                <Text
                  style={[
                    gs.fs17,
                    {color: '#fff', fontFamily: ts.primarymedium},
                  ]}>
                  6254
                </Text>
              </Flex>
            </Animatable.View>
            <Animatable.View
              animation="pulse"
              easing="ease-out"
              iterationCount="infinite"
              useNativeDriver={true}
              style={{
                ...styles.statuscontainer,
                width: width / 2.25,
                backgroundColor: theme,
                shadowColor:theme
              }}>
              <Flex direction="row" alignItems="center">
                <View
                  animation="pulse"
                  easing="ease-out"
                  iterationCount="infinite">
                  <MaterialIcons
                    name="calendar-month"
                    style={[gs.fs24, {color: '#fff'}]}
                  />
                </View>
                <Text
                  style={[
                    gs.fs14,
                    {fontFamily: ts.secondarysemibold, color: '#fff'},
                    gs.mh5,
                  ]}>
                  Expiry Date
                </Text>
              </Flex>
              <Flex justifyContent="flex-end" alignItems="flex-end">
                <Text
                  style={[
                    gs.fs17,
                    {color: '#fff', fontFamily: ts.primarymedium},
                  ]}>
                  23/05/2025
                </Text>
              </Flex>
            </Animatable.View>
          </Flex>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-between">
            <Animatable.View
              animation="pulse"
              easing="ease-out"
              iterationCount="infinite"
              useNativeDriver={true}
              style={{
                ...styles.statuscontainer,
                width: width / 2.25,
                backgroundColor: theme,
                shadowColor:theme
              }}>
              <Flex direction="row" alignItems="center">
                <View
                  animation="pulse"
                  easing="ease-out"
                  iterationCount="infinite">
                  <MaterialIcons
                    name="edit-note"
                    style={[gs.fs24, {color: '#fff'}]}
                  />
                </View>
                <Text
                  style={[
                    gs.fs14,
                    {fontFamily: ts.secondarysemibold, color: '#fff'},
                    gs.mh5,
                  ]}>
                  Total Inquiries
                </Text>
              </Flex>
              <Flex justifyContent="flex-end" alignItems="flex-end">
                <Text
                  style={[
                    gs.fs17,
                    {color: '#fff', fontFamily: ts.primarymedium},
                  ]}>
                  54
                </Text>
              </Flex>
            </Animatable.View>
            <Animatable.View
              animation="pulse"
              easing="ease-out"
              iterationCount="infinite"
              useNativeDriver={true}
              style={{
                ...styles.statuscontainer,
                width: width / 2.25,
                backgroundColor: theme,
                shadowColor:theme
              }}>
              <Flex direction="row" alignItems="center">
                <View
                  animation="pulse"
                  easing="ease-out"
                  iterationCount="infinite">
                  <MaterialIcons
                    name="verified"
                    style={[gs.fs24, {color: '#fff'}]}
                  />
                </View>
                <Text
                  style={[
                    gs.fs14,
                    {fontFamily: ts.secondarysemibold, color: '#fff'},
                    gs.mh5,
                  ]}>
                  Total Reviews
                </Text>
              </Flex>
              <Flex justifyContent="flex-end" alignItems="flex-end">
                <Text
                  style={[
                    gs.fs17,
                    {color: '#fff', fontFamily: ts.primarymedium},
                  ]}>
                  90
                </Text>
              </Flex>
            </Animatable.View>
          </Flex>
        </View>
      </ScreenWrapper>
    </>
  );
}
const styles = ScaledSheet.create({
  header: {
    paddingTop:
      Platform.OS === 'android' ? StatusBar.currentHeight + 15 : '10@ms',
    paddingBottom: '20@ms',
    paddingHorizontal: '20@ms',
  },
  brandedbtn: {
    height: '24@ms',
    width: '100@ms',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '15@ms',
    backgroundColor: ts.branded,
    borderRadius: 20,
  },
  statuscontainer: {
    height: '95@ms',
    borderRadius: '10@ms',
    padding: '10@ms',
    justifyContent: 'space-between',
    shadowOpacity:0.7,
    shadowRadius:3,
    shadowOffset:{x:0,y:1},
  },
});
