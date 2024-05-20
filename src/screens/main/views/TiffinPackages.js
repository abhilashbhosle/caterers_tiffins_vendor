import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {gs} from '../../../../GlobalStyles';
import {Card} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../../../ThemeStyles';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFlow} from '../../../redux/slicers/CommomSlicer';
import {getPackage} from '../../controllers/PackageController';
import {Center, Flex} from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {
  getMealService,
  packageTiffinUpdateService,
  packageUpdateService,
} from '../../services/PackageService';
import Updatebtn from '../../../components/Updatebtn';

function TiffinPackages() {
  const [packs, setPacks] = useState({});
  const packageDetails = useSelector(state => state.package.packages);
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;

  const [values, setValues] = useState({
    miniPlatesCap: '',
    maxPlatesCap: '',
    minPrice: '',
  });
  const dispatch = useDispatch();
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
  // ======SERVICE TYPES=======//
  const handleServiceType = index => {
    const updatedFoodTypes = packs?.serviceTypes.map((food, i) =>
      i === index
        ? {...food, selected: food.selected === '1' ? '0' : '1'}
        : food,
    );
    setPacks({...packs, serviceTypes: updatedFoodTypes});
  };
  // =======MEAL TIME TOGGLE======//
  const handleMealTime = index => {
    const updatedFoodTypes = packs?.mealTimes.map((food, i) =>
      i === index
        ? {...food, selected: food.selected === '1' ? '0' : '1'}
        : food,
    );
    setPacks({...packs, mealTimes: updatedFoodTypes});
  };
  // =======KITCHEN TYPES TOGGLE======//
  const handleKitchenTypes = index => {
    const updatedFoodTypes = packs?.kitchenTypes.map((food, i) =>
      i === index
        ? {...food, selected: food.selected === '1' ? '0' : '1'}
        : food,
    );
    setPacks({...packs, kitchenTypes: updatedFoodTypes});
  };
  const handleUpdate = () => {
    const serviceTypes = packs.serviceTypes.map((e, i) => {
      return {id: Number(e.id), selected: Number(e.selected)};
    });
    const MealTypes = packs.mealTimes.map((e, i) => {
      return {id: Number(e.id), selected: Number(e.selected)};
    });
    const foodTypes = packs.foodTypes.map((e, i) => {
      return {id: Number(e.id), selected: Number(e.selected)};
    });
    const kitchenTypes = packs.kitchenTypes.map((e, i) => {
      return {id: Number(e.id), selected: Number(e.selected)};
    });
    const body = {
      foodTypes: JSON.stringify(foodTypes),
      serviceTypes: JSON.stringify(serviceTypes),
      mealTimes: JSON.stringify(MealTypes),
      kitchenTypes: JSON.stringify(kitchenTypes),
    };
    packageTiffinUpdateService({body, dispatch});
  };
  return (
    packs?.foodTypes && (
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
              {packs?.foodTypes?.map(
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
                          name={e.selected == '1' ? 'toggle-on' : 'toggle-off'}
                          style={[
                            gs.ml10,
                            {
                              ...styles.toggleicon,
                              color:
                                e.selected == '1' && e.food_type_name == 'Veg'
                                  ? ts.accent3
                                  : e.selected == '1' &&
                                    e.food_type_name == 'Non Veg'
                                  ? ts.accent4
                                  : ts.secondarytext,
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
        {/* =====CHOOSE SERVICE TYPE========= */}
        <Card style={[gs.p15, {backgroundColor: '#fff'}, gs.mv10, gs.mh10]}>
          <Center>
            <Text style={styles.title}>Choose your Service type below</Text>
            <Flex
              // direction="row"s
              // alignItems="center"
              // justifyContent="space-around"
              width={'95%'}
              style={[gs.mt15]}>
              <Flex direction="row" alignItems="center">
                <Image
                  source={require('../../../assets/Packages/delivery.png')}
                  style={styles.serviceicon}
                />
                <Text
                  style={[
                    gs.fs14,
                    {
                      color: theme,
                      fontFamily: ts.secondaryregular,
                      width: '30%',
                    },
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

              <Flex direction="row" alignItems="center">
                <Image
                  source={require('../../../assets/Packages/takeaway.png')}
                  style={styles.serviceicon}
                />
                <Text
                  style={[
                    gs.fs14,
                    {
                      color: theme,
                      fontFamily: ts.secondaryregular,
                      width: '30%',
                    },
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

              <Flex direction="row" alignItems="center">
                <Image
                  source={require('../../../assets/Packages/takeaway.png')}
                  style={styles.serviceicon}
                />
                <Text
                  style={[
                    gs.fs14,
                    {
                      color: theme,
                      fontFamily: ts.secondaryregular,
                      width: '30%',
                    },
                  ]}>
                  {packs?.serviceTypes[2]?.service_type_name}
                </Text>
                <TouchableOpacity onPress={() => handleServiceType(2)}>
                  <FontAwesomeIcon
                    name={
                      packs?.serviceTypes[2].selected == '0'
                        ? 'toggle-off'
                        : 'toggle-on'
                    }
                    style={[
                      gs.ml10,
                      {
                        ...styles.toggleicon,
                        color:
                          packs?.serviceTypes[2].selected == '1'
                            ? theme
                            : ts.secondarytext,
                      },
                    ]}
                  />
                </TouchableOpacity>
              </Flex>
            </Flex>
          </Center>
        </Card>
        {/* ======CHOOSE MEAL TIME========= */}
        <Card style={[gs.p15, {backgroundColor: '#fff'}, gs.mv10, gs.mh10]}>
          <Center>
            <Text style={styles.title}>Choose your Meal Time type below</Text>
            <Flex
              // direction="row"
              // alignItems="center"
              justifyContent="space-around"
              width={'80%'}
              style={[gs.mt15]}>
              {packs?.mealTimes?.map(
                (e, i) =>
                  e.meal_time_name !== 'Vegan' && (
                    <Flex direction="row" alignItems="center" key={i}>
                      <Text
                        style={[
                          gs.fs14,
                          gs.mv10,
                          {
                            color: theme,
                            fontFamily: ts.secondaryregular,
                            width: '40%',
                          },
                        ]}>
                        {e.meal_time_name}
                      </Text>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          handleMealTime(i);
                        }}>
                        <FontAwesomeIcon
                          name={e.selected == '1' ? 'toggle-on' : 'toggle-off'}
                          style={[
                            gs.ml10,
                            gs.mv10,
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
        {/* ======CHOOSE MEAL TIME========= */}
        <Card style={[gs.p15, {backgroundColor: '#fff'}, gs.mv10, gs.mh10]}>
          <Center>
            <Text style={styles.title}>Choose your Kitchen Type below</Text>
            <Flex
              // direction="row"
              // alignItems="center"
              justifyContent="space-around"
              width={'80%'}
              style={[gs.mt15]}>
              {packs?.kitchenTypes?.map(
                (e, i) =>
                  e.kitchen_type_name !== 'Vegan' && (
                    <Flex direction="row" alignItems="center" key={i}>
                      <Text
                        style={[
                          gs.fs14,
                          gs.mv10,
                          {
                            color: theme,
                            fontFamily: ts.secondaryregular,
                            width: '40%',
                          },
                        ]}>
                        {e.kitchen_type_name}
                      </Text>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          handleKitchenTypes(i);
                        }}>
                        <FontAwesomeIcon
                          name={e.selected == '1' ? 'toggle-on' : 'toggle-off'}
                          style={[
                            gs.ml10,
                            gs.mv10,
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
        <TouchableOpacity
          style={[styles.updatebtncontainer, gs.mh10]}
          onPress={handleUpdate}>
          <Updatebtn btntxt="Update" />
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    )
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
    marginRight: '10@ms',
  },
  updatebtncontainer: {
    marginBottom: '60@ms',
    marginTop: '10@ms',
  },
});
export default memo(TiffinPackages);
