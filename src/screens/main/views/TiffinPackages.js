import {View, Text, TouchableOpacity,Image} from 'react-native';
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
import { Center, Flex } from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

function TiffinPackages() {
  const [packs, setPacks] = useState({});
  const packageDetails = useSelector(state => state.package.packages);
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
  return (
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
                            e.food_type_name == 'Veg' ? ts.accent3 : ts.accent4,
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
                            color: e.selected == '1' ? theme : ts.secondarytext,
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
    </KeyboardAwareScrollView>
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
export default memo(TiffinPackages);
