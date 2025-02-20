import {View, Text, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {Center, Flex, Skeleton} from 'native-base';
import {gs} from '../../../../GlobalStyles';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {ts} from '../../../../ThemeStyles';
import {getFlow} from '../../../redux/slicers/CommomSlicer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getReviews} from '../../controllers/ReviewController';
import LottieView from 'lottie-react-native';
import ReviewSkel from '../../../components/ReviewSkel';
import moment from 'moment';
import EntypoIcon from 'react-native-vector-icons/Entypo';

export default function Reviews({navigation}) {
  const data = [
    {label: 'Most relevant', value: 'Most relevant'},
    {label: 'Newest first', value: 'Newest first'},
    {label: 'Oldest first', value: 'Oldest first'},
  ];
  const dispatch = useDispatch();
  const [value, setValue] = useState(data[1].value);
  const [isFocus, setIsFocus] = useState(false);
  const flow = useSelector(state => state.common.flow);
  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState([]);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  let {review, loading} = useSelector(state => state.review);
  const [refreshing, setRefreshing] = useState(false);
  const [showSkell, setShowSkell] = useState(false);
  const [total, setTotal] = useState(-1);

  useEffect(() => {
    (async () => {
      let flow = await AsyncStorage.getItem('flow');
      dispatch(getFlow(flow));
    })();
    if (page == 1) {
      setShowSkell(true);
    }
    if (page == 1) {
      setTimeout(() => {
        dispatch(
          getReviews({
            limit,
            page,
            sort: value == 'Newest First' ? 'newest_first' : 'oldest_first',
          }),
        );
      }, 1000);
    } else if (page) {
      dispatch(
        getReviews({
          limit,
          page,
          sort: value == 'Newest First' ? 'newest_first' : 'oldest_first',
        }),
      );
    }
  }, [page]);
  useEffect(() => {
    if (review?.data?.length > 0 && reviews.length < review.total) {
      setReviews([...reviews, ...review.data]);
      setRefreshing(false);
      setShowSkell(false);
      setTotal(review?.total);
    }
    if (review?.data?.length == 0) {
      setShowSkell(false);
      setRefreshing(false);
      setTotal(0);
    }
  }, [review]);
  // =========FETCH MORE DATA=========//
  const fetchMoreData = () => {
    if (reviews.length < review.total) {
      setPage(page + 1);
    }
  };
  // =======LIST FOOTER COMPONENT=========//
  const renderFooter = () => {
    // return (
    //   review?.loading && !refreshing && page>1 && !showSkell &&(
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
    setPage(0);
    setTimeout(() => {
      setPage(1);
    }, 1000);
    setReviews([]);
    setTotal(-1);
  };
  // =======SROTING CHANGES=========//
  handleSortChange = item => {
    setValue(item.value);
    handleRefresh();
    setIsFocus(false);
  };
  // =======PULL TO REFRESH========//
  const onRefresh = () => {
    setRefreshing(true);
    handleRefresh();
  };
  const renderReviews = ({item}) => {
    return (
      <View style={styles.reviewcontainer}>
        <Flex direction="row" width={'100%'}>
          {/* ====PROFILE======= */}
          <View width={'10%'}>
            <View style={{...styles.profileimg, backgroundColor: theme}}>
              <Text
                style={[
                  {color: '#fff', fontFamily: ts.primarymedium},
                  gs.fs16,
                ]}>
                {item?.username?.slice(0, 1)}
              </Text>
            </View>
          </View>
          <View width={'85%'} style={[gs.ml10,gs.mt5]}>
            <Flex
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Flex direction="row" alignItems='center' >
                <Text
                  style={[
                    gs.fs15,
                    {color: ts.teritary, fontFamily: ts.secondaryregular},
                  ]}>
                  {item?.username}
                </Text>
                <EntypoIcon name='star' style={[{color:ts.accent3},gs.fs18,gs.mh5]}/>
                <Text style={[gs.fs14,{color:'#000',fontFamily:ts.primaryregular}]}>{item?.rating?.slice(0,3)}</Text>
              </Flex>
              <Text
                style={[
                  gs.fs11,
                  {color: theme, fontFamily: ts.secondaryregular},
                ]}>
                {/* Jan 28th, 4:30pm */}
                {moment(item?.review_date).format('YYYY-MM-DD')}
              </Text>
            </Flex>
            <View style={[gs.mt10]}>
              <Text
                style={[
                  gs.fs11,
                  {color: ts.secondarytext, fontFamily: ts.secondaryregular},
                ]}>
                {item.review_text}
              </Text>
            </View>
          </View>
        </Flex>
      </View>
    );
  };
  return (
    <ScreenWrapper>
      {/* =====HEADER======== */}
      <ThemeHeaderWrapper
        lefttxt="Customer Reviews"
        navigation={navigation}
        notifyIcon={true}
      />
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={[gs.mv20, gs.ph20]}>
          <Flex direction="row" alignItems="center">
            <Text
              style={[
                gs.fs13,
                {color: theme, fontFamily: ts.secondaryregular},
              ]}>
              Sort reviews by:
            </Text>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: theme}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select item' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                handleSortChange(item);
                // setValue(item.value);
                // setIsFocus(false);
              }}
              itemTextStyle={{color: ts.primarytext}}
            />
          </Flex>
        </View>
        {total == 0 && !showSkell && !review.loading ? (
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
                No reviews
              </Text>
            </View>
          </Center>
        ) : null}
        {showSkell &&
          [1, 2, 3, 4, 5].map((e, i) => {
            return <ReviewSkel key={i} />;
          })}

        <FlatList
          data={reviews}
          keyExtractor={(item, index) => String(index)}
          showsVerticalScrollIndicator={false}
          renderItem={renderReviews}
          onEndReachedThreshold={0.6}
          onEndReached={fetchMoreData}
          ListFooterComponent={renderFooter}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </View>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  container: {
    backgroundColor: 'white',
    padding: '16@ms',
  },
  dropdown: {
    height: '50@ms',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: '8@ms',
    paddingHorizontal: '8@ms',
    width: '180@ms',
    marginHorizontal: '15@ms',
    color: ts.primarytext,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: '22@ms',
    top: '8@ms',
    zIndex: '999@ms',
    paddingHorizontal: '8@ms',
    fontSize: '14@ms',
    color: ts.primarytext,
  },
  placeholderStyle: {
    fontSize: '16@ms',
    color: ts.secondarytext,
  },
  selectedTextStyle: {
    fontSize: '14@ms',
    fontFamily: ts.secondaryregular,
    color: ts.primarytext,
  },
  iconStyle: {
    width: '20@ms',
    height: '20@ms',
  },
  inputSearchStyle: {
    height: '40@ms',
    fontSize: '16@ms',
    color: ts.primarytext,
  },
  profileimg: {
    height: '35@ms',
    width: '35@ms',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewcontainer: {
    paddingHorizontal: '20@ms',
    borderTopColor: '#eee',
    borderTopWidth: 1,
    paddingVertical: '15@ms',
  },
});
