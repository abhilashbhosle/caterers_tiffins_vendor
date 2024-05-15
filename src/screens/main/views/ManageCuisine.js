import {View, Text, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {ScaledSheet} from 'react-native-size-matters';
import {gs} from '../../../../GlobalStyles';
import {Center, Flex} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {ts} from '../../../../ThemeStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {cuisine_data, places} from '../../../constants/Constant';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Addbtn from '../../../components/Addbtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFlow} from '../../../redux/slicers/CommomSlicer';
import {getCuisine} from '../../controllers/CuisineController';
import {useFocusEffect} from '@react-navigation/native';

export default function ManageCuisine({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const dispatch = useDispatch();
  const cuisine = useSelector(state => state.cuisine?.cuisines);
  const [isEmpty, setIsEmpty] = useState(false);
  useFocusEffect(
    useCallback(() => {
      dispatch(getCuisine());
    }, []),
  );
  useEffect(() => {
    (async () => {
      let flow = await AsyncStorage.getItem('flow');
      dispatch(getFlow(flow));
    })();
  }, []);
  useEffect(() => {
    if (cuisine?.length) {
      let arr = [];
      cuisine.map((e, i) => {
        e.children.filter(item => {
          if (item.selected == 1) {
            arr.push(item);
          }
        });
      });
      if (arr?.length == 0) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }
    }
  }, [cuisine]);
  return (
    <ScreenWrapper>
      {/* =====HEADER======== */}
      <ThemeHeaderWrapper
        lefttxt="Cuisines"
        navigation={navigation}
        notifyIcon={false}
      />
      <View style={[{flex: 1, backgroundColor: '#fff'}, gs.ph15, gs.pv20]}>
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="space-between">
          <Text
            style={[
              gs.fs21,
              {color: ts.primarytext, fontFamily: ts.primarymedium},
            ]}>
            Cuisines You Cater
          </Text>
          {/* <MaterialIcons name="edit" style={[gs.fs24, {color: theme}]} /> */}
        </Flex>

        <ScrollView showsVerticalScrollIndicator={false}>
          {!isEmpty ? (
            <Flex
              direction="row"
              flexWrap="wrap"
              alignItems="center"
              style={[gs.mt20]}>
              {cuisine.map((e, i) =>
                e.children.map(
                  (item, index) =>
                    item.selected == 1 && (
                      <View
                        key={index}
                        style={{...styles.cuisinebtn, backgroundColor: theme}}>
                        <Text
                          style={[
                            gs.fs16,
                            {color: '#fff', fontFamily: ts.secondary},
                          ]}>
                          {item.name}
                        </Text>
                      </View>
                    ),
                ),
              )}
            </Flex>
          ) : (
            <Center>
              <Text style={[gs.fs14, {color: ts.secondarytext}, gs.mt20]}>
                You have no cuisines added.
              </Text>
            </Center>
          )}
        </ScrollView>
        <TouchableOpacity
          style={[gs.mb20]}
          onPress={() =>
            navigation.navigate('PageStack', {
              screen: 'AddCuisine',
            })
          }>
          <Addbtn btntxt="Add more Cuisines" />
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  cuisinebtn: {
    marginRight: '15@ms',
    marginVertical: '7.5@ms',
    height: '35@ms',
    paddingHorizontal: '15@ms',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {x: 0, y: 1},
    borderRadius: '10@ms',
  },
});
