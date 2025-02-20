import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {gs} from '../../../../GlobalStyles';
import {Center, Flex} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../../../ThemeStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {TextInput} from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFlow} from '../../../redux/slicers/CommomSlicer';
import {getInquiry} from '../../controllers/InquiryController';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import InquirySkel from '../../../components/InquirySkel';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AntIcon from 'react-native-vector-icons/AntDesign';

export default function Inquiries({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [inquiries, setInquiries] = useState([]);
  const [showSkell, setShowSkell] = useState(false);
  const [date, setDate] = useState();
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(50);
  let {inquiry} = useSelector(state => state.inquiry);
  const [refreshing, setRefreshing] = useState(false);
  const [showCal, setShowCal] = useState(false);
  const [total, setTotal] = useState(-1);

  useEffect(() => {
    (async () => {
      let flow = await AsyncStorage.getItem('flow');
      dispatch(getFlow(flow));
    })();
    if (page == 1) {
      setShowSkell(true);
      setTimeout(() => {
        dispatch(
          getInquiry({
            limit,
            page,
            sort: 'newest_first',
            date: date ? moment(date).format('YYYY-MM-DD') : '',
            search,
          }),
        );
      }, 1000);
    } else if (page) {
      dispatch(
        getInquiry({
          limit,
          page,
          sort: 'newest_first',
          date: date ? moment(date).format('YYYY-MM-DD') : '',
          search,
        }),
      );
    }
  }, [page]);
  useEffect(() => {
    if (inquiry?.data?.length > 0 && inquiries?.length < inquiry?.total) {
      setInquiries([...inquiries, ...inquiry.data]);
      setRefreshing(false);
      setShowSkell(false);
      setTotal(inquiry?.total);
    }
    if (!inquiry?.data) {
      setShowSkell(false);
      setRefreshing(false);
      setTotal(0);
    }
  }, [inquiry]);
  // =========FETCH MORE DATA=========//
  const fetchMoreData = () => {
    if (inquiries.length < inquiry.total) {
      console.log('fetch more data called');
      setPage(page + 1);
    }
  };
  // =======LIST FOOTER COMPONENT=========//
  const renderFooter = () => {
    // return (
    //   inquiry?.loading && !refreshing && page>1 &&(
    //     <Center>
    //       {' '}
    //       <LottieView
    //         source={require('../../../assets/Loader/lottie1.json')}
    //         autoPlay
    //         loop
    //         style={{height: 30, width: 60, bottom: 10}}
    //       />
    //     </Center>
    //   )
    // );
  };
  // =======HANDLE REFRESH=========//
  handleRefresh = () => {
    setInquiries([]);
    setPage(0);
    setTimeout(() => {
      setPage(1);
    }, 1000);
    setTotal(-1);
  };
  // =======SROTING CHANGES=========//
  handleSortChange = item => {
    // setValue(item.value);
    // handleRefresh();
    // setIsFocus(false);
  };
  // =======PULL TO REFRESH========//
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      handleRefresh();
    }, 1000);
  };
  const handleSearch = () => {
    handleRefresh();
  };

  const hideDatePicker = () => {
    setShowCal(false);
  };
  const handleConfirm = dt => {
    setDate(dt);
    handleRefresh();
    hideDatePicker();
    setShowCal(false);
  };
  const renderItem = ({item}) => {
    return (
      <View style={{...styles.cardContainer, marginHorizontal: 3}}>
        <View style={{...styles.detailscontainer, borderLeftColor: theme}}>
          <Text
            style={[
              gs.fs17,
              {color: ts.primarytext, fontFamily: ts.secondarymedium},
            ]}>
            {item?.user_name}
          </Text>
          {
            item?.area?
            <Text
            style={[
              gs.fs13,
              {color: ts.secondarytext, fontFamily: ts.secondaryregular},
              gs.mv2,
            ]}>
            {item?.area}
          </Text>
          :
          null
          }
         
          {item?.cuisines?.length ? (
            <Text
              style={[
                gs.fs13,
                {color: ts.secondarytext, fontFamily: ts.secondaryregular},
                gs.mv2,
              ]}>
              {item?.cuisines.map(
                (e, i) =>
                  `${e.cuisine_name}${
                    i != item.cuisines?.length - 1 ? ',' : ''
                  } `,
              )}
            </Text>
          ) : null}
          {item?.occasions?.length ? (
            <Text
              style={[
                gs.fs13,
                {color: ts.secondarytext, fontFamily: ts.secondaryregular},
                gs.mv2,
              ]}>
              {item?.occasions.map(
                (e, i) =>
                  `${e.occasion_name}${
                    i != item.occasions?.length - 1 ? ',' : ''
                  } `,
              )}
            </Text>
          ) : null}
          {item?.service_types?.length ? (
            <Text
              style={[
                gs.fs13,
                {color: ts.secondarytext, fontFamily: ts.secondaryregular},
                gs.mv2,
              ]}>
              {item?.service_types.map(
                (e, i) =>
                  `${e.service_type_name}${
                    i != item.service_types?.length - 1 ? ',' : ''
                  } `,
              )}
            </Text>
          ) : null}
          <Text
            style={[
              gs.fs13,
              {color: ts.secondarytext, fontFamily: ts.secondaryregular},
            ]}>
            {moment(item?.enquiry_date).format('DD MMM, YYYY')}
          </Text>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-between">
            <Text
              style={[
                gs.fs13,
                {color: ts.secondarytext, fontFamily: ts.secondaryregular},
              ]}>
              {item?.user_phone_number}
            </Text>
            <TouchableOpacity
              style={styles.phonecontainer}
              onPress={() => {
                item?.user_phone_number
                  ? Linking.openURL(`tel:${item?.user_phone_number}`)
                  : Alert.alert('No Phone Number Found.');
              }}>
              <Flex direction="row" alignItems="center">
                <MaterialIcons
                  name="phone"
                  style={[gs.fs18, gs.mr5, {color: '#fff'}]}
                />

                <Text
                  style={[
                    gs.fs14,
                    {color: '#fff', fontFamily: ts.secondarymedium},
                  ]}>
                  Call Now
                </Text>
              </Flex>
            </TouchableOpacity>
          </Flex>
        </View>
      </View>
    );
  };
  return (
    <ScreenWrapper>
      {/* =====HEADER======== */}
      <ThemeHeaderWrapper
        lefttxt="Inquiries"
        navigation={navigation}
        notifyIcon={true}
      />
      <View style={[{flex: 1, backgroundColor: '#fff'}, gs.pt15]}>
        <View style={[gs.ph15]}>
          <Flex direction="row" justifyContent="space-between">
            <View>
              <Text
                style={[
                  gs.fs23,
                  {color: ts.primarytext, fontFamily: ts.primarymedium},
                ]}>
                Customer Inquiries
              </Text>
              <Text
                style={[
                  gs.fs13,
                  {fontFamily: ts.secondaryregular, color: ts.secondarytext},
                  gs.mv7,
                ]}>
                All customers details listed below
              </Text>
            </View>
            <Flex
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setShowCal(true);
                  setDate();
                }}>
                <MaterialIcons
                  name="calendar-month"
                  style={[gs.fs26, {color: theme}]}
                />
              </TouchableOpacity>
              <Flex direction="row" alignItems="center">
                <Text
                  style={[
                    gs.fs13,
                    {fontFamily: ts.secondaryregular, color: theme},
                    gs.mv7,
                  ]}>
                  {date ? moment(date)?.format('YYYY-MM-DD') : 'Select Date'}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            style={[gs.mv10]}>
            <TextInput
              mode="outlined"
              label="Search Customers"
              outlineStyle={{borderRadius: 10}}
              activeOutlineColor={theme}
              returnKeyLabel="done"
              left={
                <TextInput.Icon
                  icon={() => <EvilIcons name="search" style={styles.icon} />}
                />
              }
              style={styles.input}
              outlineColor="#999"
              value={search}
              onChangeText={text => {
                setSearch(text);
              }}
              textColor={ts.secondarytext}
            />
            <TouchableOpacity
              style={[
                {
                  width: '28%',
                  height: styles.input.height,
                  backgroundColor: theme,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                },
              ]}
              activeOpacity={0.7}
              onPress={handleSearch}>
              <Text
                style={[
                  gs.fs15,
                  {color: '#fff', fontFamily: ts.secondarymedium},
                ]}>
                Search
              </Text>
            </TouchableOpacity>
          </Flex>
        </View>
        {total == 0 && !showSkell && !inquiry?.loading ? (
          <Center>
            <View style={[gs.mt10]}>
              <Text
                style={[
                  gs.fs14,
                  {
                    color: ts.secondarytext,
                    fontFamily: ts.secondaryregular,
                  },
                ]}>
                No Inquiries
              </Text>
            </View>
          </Center>
        ) : null}
        {showSkell &&
          [1, 2, 3, 4, 5].map((e, i) => {
            return <InquirySkel key={i} />;
          })}
        <FlatList
          data={inquiries}
          keyExtractor={(item, index) => String(index)}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.6}
          onEndReached={fetchMoreData}
          ListFooterComponent={renderFooter}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />

        <DateTimePickerModal
          isVisible={showCal}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          display="spinner"
          date={date}
        />
      </View>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  icon: {
    fontSize: '24@ms',
    color: ts.secondarytext,
    top: '3@ms',
  },
  input: {
    width: '70%',
    color: ts.secondarytext,
    fontSize: '14@ms',
    height: '40@ms',
    backgroundColor: '#fff',
    bottom: 2.5,
  },
  cardContainer: {
    padding: '15@ms',
    backgroundColor: '#f9f9f9',
    marginVertical: '3@ms',
    borderColor: '#ccc',
    borderWidth: 0.5,
  },
  phonecontainer: {
    backgroundColor: ts.accent3,
    paddingHorizontal: '10@ms',
    paddingVertical: '5@ms',
    borderRadius: '10@ms',
  },
  detailscontainer: {
    borderLeftWidth: '4@ms',
    paddingLeft: '10@ms',
  },
});
