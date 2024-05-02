import {View, Text, ScrollView, Image, useWindowDimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {gs} from '../../../../GlobalStyles';
import {Card, TextInput} from 'react-native-paper';
import {Center, Flex} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../../../ThemeStyles';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Updatebtn from '../../../components/Updatebtn';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getFlow} from '../../../redux/slicers/CommomSlicer';
import {getPackage, packageUpdate} from '../../controllers/PackageController';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { packageUpdateService } from '../../services/PackageService';

export default function Packages({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const {height, width} = useWindowDimensions();
  const dispatch = useDispatch();
  const [packs, setPacks] = useState({});
  const packageDetails = useSelector(state => state.package.packages);
  const [values, setValues] = useState({
    miniPlatesCap: '',
    maxPlatesCap: '',
    minPrice: '',
  });
  useEffect(() => {
    (async () => {
      let flow = await AsyncStorage.getItem('flow');
      dispatch(getFlow(flow));
      dispatch(getPackage());
    })();
  }, []);
  useEffect(() => {
    if (packageDetails?.foodTypes) {
      setPacks(packageDetails);
      setValues({
        ...values,
        miniPlatesCap: packageDetails.minimum_capacity,
        maxPlatesCap: packageDetails.maximum_capacity,
        minPrice: packageDetails.start_price,
      });
    }
  }, [packageDetails]);
  // =======FOODTYPES TOGGLE======//
  const handleFoodType = index => {
    const updatedFoodTypes = packs?.foodTypes.map((food, i) =>
      i === index
        ? {...food, selected: food.selected === '1' ? '0' : '1'}
        : food,
    );
    setPacks({...packs, foodTypes: updatedFoodTypes});
  };
  // ======CATERING TYPES=======//
  handleCateringType = index => {
    const updatedFoodTypes = packs?.servingTypes.map((food, i) =>
      i === index
        ? {...food, selected: food.selected === '1' ? '0' : '1'}
        : food,
    );
    setPacks({...packs, servingTypes: updatedFoodTypes});
  };
  // ======SERVICE TYPES=======//
  const handleServiceType = index => {
    const updatedFoodTypes = packs?.serviceTypes.map((food, i) =>
      i === index
        ? {...food, selected: food.selected === '1' ? '0' : '1'}
        : food,
    );
    setPacks({...packs, serviceTypes: updatedFoodTypes});
  };
  const handleUpdate=()=>{
    const serviceTypes=packs.serviceTypes.map((e,i)=>{
      return {id:Number(e.id),selected:Number(e.selected)}
    })
    const servingTypes=packs.servingTypes.map((e,i)=>{
      return {id:Number(e.id),selected:Number(e.selected)}
    })
    const foodTypes=packs.serviceTypes.map((e,i)=>{
      return {id:Number(e.id),selected:Number(e.selected)}
    })
    const body={
      foodTypes:JSON.stringify(foodTypes),
      servingTypes:JSON.stringify(servingTypes),
      serviceTypes:JSON.stringify(serviceTypes),
      maximumCapacity:values.maxPlatesCap,
      minimumCapacity:values.miniPlatesCap,
      startPrice:values.minPrice
    }
    packageUpdateService({body,dispatch})
  }
console.log(values)
  return (
    <ScreenWrapper>
      {/* =====HEADER======== */}
      <ThemeHeaderWrapper
        lefttxt="My Packages"
        navigation={navigation}
        notifyIcon={false}
      />
      {packs?.foodTypes && (
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          showsVerticalScrollIndicator={false}
          style={[{flex: 1, backgroundColor: '#fff'}, gs.pt15]}>
          {/* =======CHOOSE TYPE========= */}
          <Card style={[gs.p15, {backgroundColor: '#fff'}, gs.mb10, gs.mh10]}>
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
                {packs?.foodTypes.map(
                  (e, i) =>
                    e.food_type_name !== 'Vegan' && (
                      <Flex direction="row" alignItems="center" key={i}>
                        <Text
                          style={[
                            gs.fs14,
                            {
                              color:
                                e.food_type_name == 'Veg'
                                  ? ts.accent3
                                  : ts.accent4,
                              fontFamily: ts.secondaryregular,
                            },
                          ]}>
                          {e.food_type_name}
                        </Text>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => {
                            handleFoodType(i);
                          }}>
                          <FontAwesomeIcon
                            name={
                              e.selected == '1' ? 'toggle-on' : 'toggle-off'
                            }
                            style={[
                              gs.ml10,
                              {
                                ...styles.toggleicon,
                                color:
                                  e.selected == '1' ? theme : ts.secondarytext,
                              },
                            ]}
                          />
                        </TouchableOpacity>
                      </Flex>
                    ),
                )}
              </Flex>
            </Center>
          </Card>
          {/* =======CHOOSE YOUR CATERING TYPE========= */}
          <Card style={[gs.p15, {backgroundColor: '#fff'}, gs.mv10, gs.mh10]}>
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
                {packs?.servingTypes?.map((e, i) => (
                  <Flex direction="row" alignItems="center" key={i}>
                    <Text
                      style={[
                        gs.fs14,
                        {color: theme, fontFamily: ts.secondaryregular},
                      ]}>
                      {e.serving_type_name == 'Buffet Service'
                        ? 'Buffet'
                        : e.serving_type_name}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        handleCateringType(i);
                      }}>
                      <FontAwesomeIcon
                        name={e.selected == '0' ? 'toggle-off' : 'toggle-on'}
                        style={[
                          gs.ml10,
                          {
                            ...styles.toggleicon,
                            color: e.selected == '1' ? theme : ts.secondarytext,
                          },
                        ]}
                      />
                    </TouchableOpacity>
                  </Flex>
                ))}
              </Flex>
            </Center>
          </Card>
          {/* =====ENTER CATERING CAPACITY========= */}
          <Card style={[gs.p15, {backgroundColor: '#fff'}, gs.mv10, gs.mh10]}>
            <Center>
              <Text style={styles.title}>
                Enter your Catering Capacity below
              </Text>
              <View
                style={[
                  {justifyContent: 'center', alignItems: 'center'},
                  gs.mt10,
                ]}>
                <Text style={styles.subtitke}>Minimum Capacity</Text>
                <TextInput
                  style={{...styles.input, width: width - 80}}
                  placeholder="Enter Minimum Capacity - Eg: 100 plates"
                  outlineColor={ts?.secondarytext}
                  activeOutlineColor={theme}
                  value={values?.miniPlatesCap?.toString()}
                  onChangeText={text => {
                    setValues({...values, miniPlatesCap: text});
                  }}
                  mode="outlined"
                  keyboardType="numeric"
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
                  value={values?.maxPlatesCap?.toString()}
                  onChangeText={text => {
                    setValues({...values, maxPlatesCap: text});
                  }}
                  keyboardType="numeric"
                />
              </View>
            </Center>
          </Card>
          {/* =====CHOOSE SERVICE TYPE========= */}
          <Card style={[gs.p15, {backgroundColor: '#fff'}, gs.mv10, gs.mh10]}>
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
                      {packs?.serviceTypes[0]?.service_type_name}
                    </Text>
                    <TouchableOpacity onPress={() => handleServiceType(0)}>
                      <FontAwesomeIcon
                        name={
                          packs?.serviceTypes[0].selected == '0'
                            ? 'toggle-off'
                            : 'toggle-on'
                        }
                        style={[
                          gs.ml10,
                          {
                            ...styles.toggleicon,
                            color:
                              packs?.serviceTypes[0].selected == '1'
                                ? theme
                                : ts.secondarytext,
                          },
                        ]}
                      />
                    </TouchableOpacity>
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
                      {packs?.serviceTypes[1]?.service_type_name}
                    </Text>
                    <TouchableOpacity onPress={() => handleServiceType(1)}>
                    <FontAwesomeIcon
                        name={
                          packs?.serviceTypes[1].selected == '0'
                            ? 'toggle-off'
                            : 'toggle-on'
                        }
                        style={[
                          gs.ml10,
                          {
                            ...styles.toggleicon,
                            color:
                              packs?.serviceTypes[1].selected == '1'
                                ? theme
                                : ts.secondarytext,
                          },
                        ]}
                      />
                    </TouchableOpacity>
                  </Flex>
                </Flex>
              </Flex>
            </Center>
          </Card>
          {/* =====ENTER STARTING PRICE / PLATE========= */}
          <Card
            style={[
              gs.p15,
              {backgroundColor: '#fff'},
              gs.mt10,
              gs.mb20,
              gs.mh10,
            ]}>
            <Center>
              <Text style={styles.title}>Enter Starting price / plate</Text>
              {/* <View
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
              </View> */}
              <View
                style={[
                  {justifyContent: 'center', alignItems: 'center'},
                  gs.mt20,
                ]}>
                <Text style={styles.subtitke}>
                  Enter Starting price / plate
                </Text>
                <TextInput
                  style={{...styles.input, width: width - 80}}
                  placeholder="Eg: 350"
                  outlineColor={ts.secondarytext}
                  activeOutlineColor={theme}
                  mode="outlined"
                  value={values?.minPrice}
                  onChangeText={text => {
                    setValues({...values, minPrice: text});
                  }}
                  keyboardType="numeric"
                />
              </View>
            </Center>
          </Card>
          <TouchableOpacity style={[styles.updatebtncontainer, gs.mh10]} onPress={handleUpdate}>
            <Updatebtn btntxt="Update" />
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      )}
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
  updatebtncontainer: {
    marginBottom: '60@ms',
    marginTop: '10@ms',
  },
});
