import {View, Text, ScrollView, Image, useWindowDimensions} from 'react-native';
import React from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {gs} from '../../../../GlobalStyles';
import {Card, TextInput} from 'react-native-paper';
import {Center, Flex} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../../../ThemeStyles';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Updatebtn from '../../../components/Updatebtn';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Packages({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const {height, width} = useWindowDimensions();
  return (
    <ScreenWrapper>
      {/* =====HEADER======== */}
      <ThemeHeaderWrapper
        lefttxt="My Packages"
        navigation={navigation}
        notifyIcon={false}
      />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
		showsVerticalScrollIndicator={false}
        style={[{flex: 1, backgroundColor: '#fff'}, gs.pt15]}>
        {/* =======CHOOSE TYPE========= */}
        <Card style={[gs.p15, {backgroundColor: '#fff'}, gs.mb10,gs.mh10]}>
          <Center>
            <Text style={styles.title}>Choose your food type below</Text>
            <Text style={styles.subtitke}>
              If you provide both Veg & Non-Veg, check both checkboxes.
            </Text>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-around"
              width={'80%'}
              style={[gs.mt15]}>
              <Flex direction="row" alignItems="center">
                <Text
                  style={[
                    gs.fs14,
                    {color: ts.accent3, fontFamily: ts.secondaryregular},
                  ]}>
                  Veg
                </Text>
                <FontAwesomeIcon
                  name="toggle-off"
                  style={[gs.ml10, styles.toggleicon]}
                />
              </Flex>
              <Flex direction="row" alignItems="center">
                <Text
                  style={[
                    gs.fs14,
                    {color: ts.accent4, fontFamily: ts.secondaryregular},
                  ]}>
                  Non-Veg
                </Text>
                <FontAwesomeIcon
                  name="toggle-off"
                  style={[gs.ml10, styles.toggleicon]}
                />
              </Flex>
            </Flex>
          </Center>
        </Card>
        {/* =======CHOOSE YOUR CATERING TYPE========= */}
        <Card style={[gs.p15, {backgroundColor: '#fff'}, gs.mv10,gs.mh10]}>
          <Center>
            <Text style={styles.title}>Choose your Catering type below</Text>
            <Text style={styles.subtitke}>
              If you provide both table & buffet service, check both.
            </Text>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-around"
              width={'80%'}
              style={[gs.mt15]}>
              <Flex direction="row" alignItems="center">
                <Text
                  style={[
                    gs.fs14,
                    {color: theme, fontFamily: ts.secondaryregular},
                  ]}>
                  Table Service
                </Text>
                <FontAwesomeIcon
                  name="toggle-off"
                  style={[gs.ml10, styles.toggleicon]}
                />
              </Flex>
              <Flex direction="row" alignItems="center">
                <Text
                  style={[
                    gs.fs14,
                    {color: theme, fontFamily: ts.secondaryregular},
                  ]}>
                  Buffet
                </Text>
                <FontAwesomeIcon
                  name="toggle-off"
                  style={[gs.ml10, styles.toggleicon]}
                />
              </Flex>
            </Flex>
          </Center>
        </Card>
        {/* =====ENTER CATERING CAPACITY========= */}
        <Card style={[gs.p15, {backgroundColor: '#fff'}, gs.mv10,gs.mh10]}>
          <Center>
            <Text style={styles.title}>Enter your Catering Capacity below</Text>
            <View
              style={[
                {justifyContent: 'center', alignItems: 'center'},
                gs.mt10,
              ]}>
              <Text style={styles.subtitke}>Minimum Capacity</Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                placeholder="Enter Minimum Capacity - Eg: 100 plates"
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
              />
            </View>
            <View
              style={[
                {justifyContent: 'center', alignItems: 'center'},
                gs.mt20,
              ]}>
              <Text style={styles.subtitke}>Maximum Capacity</Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                placeholder="Enter Maximum Capacity - Eg: 700 plates"
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
              />
            </View>
          </Center>
        </Card>
        {/* =====CHOOSE SERVICE TYPE========= */}
        <Card style={[gs.p15, {backgroundColor: '#fff'}, gs.mv10,gs.mh10]}>
          <Center>
            <Text style={styles.title}>Choose your Service type below</Text>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-around"
              width={'95%'}
              style={[gs.mt15]}>
              <Flex alignItems="center">
                <Image
                  source={require('../../../assets/Packages/delivery.png')}
                  style={styles.serviceicon}
                />
                <Flex direction="row" alignItems="center">
                  <Text
                    style={[
                      gs.fs14,
                      {color: theme, fontFamily: ts.secondaryregular},
                    ]}>
                    Delivery
                  </Text>
                  <FontAwesomeIcon
                    name="toggle-off"
                    style={[gs.ml10, styles.toggleicon]}
                  />
                </Flex>
              </Flex>
              <Flex alignItems="center">
                <Image
                  source={require('../../../assets/Packages/takeaway.png')}
                  style={styles.serviceicon}
                />
                <Flex direction="row" alignItems="center">
                  <Text
                    style={[
                      gs.fs14,
                      {color: theme, fontFamily: ts.secondaryregular},
                    ]}>
                    Takeaway
                  </Text>
                  <FontAwesomeIcon
                    name="toggle-off"
                    style={[gs.ml10, styles.toggleicon]}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Center>
        </Card>
        {/* =====ENTER STARTING PRICE / PLATE========= */}
        <Card style={[gs.p15, {backgroundColor: '#fff'}, gs.mt10, gs.mb20,gs.mh10]}>
          <Center>
            <Text style={styles.title}>Enter Veg Starting price / plate</Text>
            <View
              style={[
                {justifyContent: 'center', alignItems: 'center'},
                gs.mt10,
              ]}>
              <Text style={styles.subtitke}>Minimum Capacity</Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                placeholder="Eg: 250"
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
              />
            </View>
            <View
              style={[
                {justifyContent: 'center', alignItems: 'center'},
                gs.mt20,
              ]}>
              <Text style={styles.subtitke}>
                Enter Non - Veg Starting price / plate
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                placeholder="Eg: 350"
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
              />
            </View>
          </Center>
        </Card>
        <TouchableOpacity style={[styles.updatebtncontainer,gs.mh10]}>
          <Updatebtn btntxt="Update" />
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  title: {
    color: ts.primarytext,
    fontSize: '16@ms',
    fontFamily: ts.secondaryregular,
    marginBottom: '10@ms',
  },
  subtitke: {
    color: ts.secondarytext,
    fontSize: '12@ms',
    fontFamily: ts.secondaryregular,
    marginBottom: '10@ms',
    lineHeight: '18@ms',
  },
  toggleicon: {
    fontSize: '35@ms',
    color: ts.secondarytext,
  },
  input: {
    color: ts.secondarytext,
    fontSize: '12@ms',
    fontFamily: ts.secondaryregular,
    height: '40@ms',
    backgroundColor: '#fff',
  },
  serviceicon: {
    height: '35@ms',
    width: '35@ms',
    marginBottom: '10@ms',
  },
  updatebtncontainer:{
	marginBottom:'60@ms',
	marginTop:'10@ms'
  }
});
