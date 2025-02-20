import {
  View,
  Text,
  useWindowDimensions,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {useDispatch, useSelector} from 'react-redux';
import {ts} from '../../../../ThemeStyles';
import {Center, Flex} from 'native-base';
import {gs} from '../../../../GlobalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ScaledSheet} from 'react-native-size-matters';
import {Card} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Addbtn from '../../../components/Addbtn';
import {getOccasions} from '../../controllers/OccassionController';
import {getFlow} from '../../../redux/slicers/CommomSlicer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

export default function ManageOccasions({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const {height, width} = useWindowDimensions();
  const dispatch = useDispatch();
  const occassions = useSelector(state => state.occassion?.occassions);
  const [refreshing, setRefreshing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  useFocusEffect(
    useCallback(() => {
      dispatch(getOccasions());
    }, []),
  );
  useEffect(() => {
    (async () => {
      let flow = await AsyncStorage.getItem('flow');
      dispatch(getFlow(flow));
    })();
  }, []);
  const renderItem = ({item}) => {
    return (
      <Card style={[{backgroundColor: '#fff'}, gs.mb10, gs.mh5]}>
        <ImageBackground
          source={{uri: item.file_name.large || item.file_name.medium}}
          style={[
            {...styles.img, width: width / 2.2, justifyContent: 'flex-end'},
          ]}
          imageStyle={[gs.br12]}
          alt={item.name}>
          <LinearGradient
            colors={['#000', 'transparent']}
            start={{x: 0.0, y: 1.2}}
            end={{x: 0.0, y: 0.0}}
            style={[
              {
                ...styles.overlay,
              },
              gs.br12,
            ]}>
            <Text style={[gs.fs14, styles.title, gs.ml15, gs.mb8, gs.h25]}>
              {item.name}
            </Text>
          </LinearGradient>
        </ImageBackground>
      </Card>
    );
  };
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getOccasions());
    setTimeout(() => {
      setRefreshing(false)
    }, 1000);
  };
  return (
    <ScreenWrapper>
      {/* =====HEADER======== */}
      <ThemeHeaderWrapper
        lefttxt="Occasions"
        navigation={navigation}
        notifyIcon={true}
      />
      <View
        style={[
          {flex: 1, backgroundColor: '#fff', justifyContent: 'space-between'},
          gs.pv20,
        ]}>
        <View>
          <View style={[gs.ph15]}>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between">
              <Text
                style={[
                  gs.fs21,
                  {color: ts.primarytext, fontFamily: ts.primarymedium},
                ]}>
                Occasions You Cater
              </Text>
              {/* <MaterialIcons name="edit" style={[gs.fs24, {color: theme}]} /> */}
            </Flex>
          </View>
          <Center width={width}>
            <FlatList
              data={occassions.filter((e, i) => e.selected == 1)}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => String(index)}
              contentContainerStyle={styles.contentContainerStyle}
              numColumns={2}
              ListEmptyComponent={() => {
                return (
                  <Text style={[gs.fs14, {color: ts.secondarytext}, gs.mt15]}>
                    You have no Occasions added.
                  </Text>
                );
              }}
                 refreshing={refreshing}
                        onRefresh={onRefresh}
            />
          </Center>
        </View>
        <TouchableOpacity
          style={[
            gs.ph15,
            gs.mb15,
            {position: 'absolute', width: '100%', bottom: gs.mb15.marginBottom},
          ]}
          onPress={() =>
            navigation.navigate('PageStack', {
              screen: 'AddOccasions',
            })
          }>
          {occassions.filter((e, i) => e.selected == 1)?.length? (
            <Addbtn btntxt="Edit Occasions" />
          ) : (
            <Addbtn btntxt="Add more Occasions" />
          )}
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  contentContainerStyle: {
    paddingBottom: '120@ms',
    paddingTop: '15@ms',
    position: 'relative',
  },
  img: {
    height: '150@ms',
    resizeMode: 'cover',
  },
  title: {
    fontFamily: ts.secondarymedium,
    color: '#fff',
    paddingTop: '2@ms',
  },
});
