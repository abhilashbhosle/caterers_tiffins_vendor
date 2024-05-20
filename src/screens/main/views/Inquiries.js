import {View, Text, FlatList, TouchableOpacity} from 'react-native';
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
export default function Inquiries({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [inquiries, setInquiries] = useState([]);
  const [showSkell, setShowSkell] = useState(false);
  const [date, setDate] = useState('2024-04-02');
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(10);
  let {inquiry} = useSelector(state => state.inquiry);
  const [refreshing, setRefreshing] = useState(false);

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
            date,
            search,
          }),
        );
      }, 1000);
    } else if(page) {
      dispatch(
        getInquiry({
          limit,
          page,
          sort: 'newest_first',
          date,
          search,
        }),
      );
    }
  }, [page]);
  useEffect(() => {
    if (inquiry?.data?.length > 0) {
      setInquiries([...inquiries, ...inquiry.data]);
      setRefreshing(false);
      setShowSkell(false);
    } 
    if(inquiry?.data?.length==0) {
      setShowSkell(false);
      setRefreshing(false);
    }
  }, [inquiry]);
  // =========FETCH MORE DATA=========//
  const fetchMoreData = () => {
    // console.log('fetch more data called');
    if (inquiries.length < inquiry.total) {
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
    setPage(0)
    setTimeout(()=>{
      setPage(1)
    },1000)
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
    setTimeout(()=>{
      handleRefresh();
    },1000)
  };
  const handleSearch = () => {
      handleRefresh()
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
          <Text
            style={[
              gs.fs13,
              {color: ts.secondarytext, fontFamily: ts.secondaryregular},
              gs.mv10,
            ]}>
            {item?.description}
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
              {moment(item?.enquiry_date).format('MMM DD, hh:mm A')}
            </Text>
            <TouchableOpacity style={styles.phonecontainer}>
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
        notifyIcon={false}
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
            <MaterialIcons
              name="calendar-month"
              style={[gs.fs26, {color: theme}]}
            />
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
          ListEmptyComponent={() => {
            return (
              inquiries?.length==0 &&
              !showSkell && (
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
              )
            );
          }}
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
