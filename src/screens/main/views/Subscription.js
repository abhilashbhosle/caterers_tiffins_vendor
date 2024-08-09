import {
  View,
  Text,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {gs} from '../../../../GlobalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {ts} from '../../../../ThemeStyles';
import {Center, Flex} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';
import {Card} from 'react-native-paper';
import {plan_data} from '../../../constants/Constant';
import Carousel from 'react-native-reanimated-carousel';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {getFlow} from '../../../redux/slicers/CommomSlicer';
import {getSubscriptionList} from '../../controllers/SubscriptionController';
import CouponSheet from './CouponSheet';

export default function Subscription({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const {height, width} = useWindowDimensions();
  const [activeIndex, setActiveindex] = useState(0);
  const [monthly, setMonthly] = useState(false);
  const dispatch = useDispatch();
  let {subListData, subListError, subListLoading} = useSelector(
    state => state.subscription,
  );
  const [openCouponSheet, setOpenCouponSheet] = useState('');

  console.log(monthly);

  useEffect(() => {
    dispatch(getFlow(flow));
    let params = {
      vendor_type: flow == 'catering' ? 'Caterer' : 'Tiffin',
    };
    dispatch(getSubscriptionList({params}));
  }, [flow]);

  //========REFS========//
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[gs.mh15]}
        onPress={() => {
          scrollToIndex(index);
        }}>
        <Text
          style={[
            gs.fs16,
            {
              fontFamily: ts.secondaryregular,
              color: activeIndex === index ? ts.primarytext : '#999',
            },
          ]}>
          {item?.subscriptionType?.slice(0, 1)?.toUpperCase()}
          {item?.subscriptionType?.slice(1)}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderPlans = ({item}) => {
    return (
      <View
        style={[
          {
            width: width,
            height: height,
            backgroundColor: '#fff',
            alignItems: 'center',
          },
          gs.p10,
        ]}>
        <Card
          style={[
            {width: width - 100, height: height / 1.5, backgroundColor: '#fff'},
            gs.br20,
          ]}>
          <View
            style={[
              styles.header,
              {
                backgroundColor:
                  item?.subscriptionType == 'popular'
                    ? '#459412'
                    : item?.subscriptionType == 'branded'
                    ? '#8e11a5'
                    : theme,
              },
            ]}>
            <Text style={[styles.headtxt]}>
              {item?.subscriptionType?.slice(0, 1)?.toUpperCase()}
              {item?.subscriptionType?.slice(1)}
            </Text>
          </View>
          <Center>
            <Flex direction="row" alignItems="center" style={[gs.mv20]}>
              <MaterialIcons name="currency-rupee" style={[gs.fs22]} />
              <Text
                style={[
                  {color: ts.primarytext, fontFamily: ts.secondarymedium},
                  gs.fs22,
                ]}>
                {monthly ? item.monthlyCharges : item?.yearlyCharges}/
              </Text>
              <Text style={{...styles.heading, top: 5}}>
                {monthly ? 'month' : 'year'}
              </Text>
            </Flex>
            {/* <Text style={styles.heading}>{item.listing}</Text> */}
          </Center>
          <View style={[gs.mh20, gs.mt10]}>
            <Text style={[{...styles.heading, color: ts.primarytext}, gs.mv3]}>
              Benifits:
            </Text>
            {item?.benefits?.slice(0, 6)?.map((e, i) => (
              <Text
                style={[{...styles.heading, color: ts.primarytext}, gs.mv3]}
                numberOfLines={1}
                key={i}>
                - {e}
              </Text>
            ))}
          </View>
          {item?.benefits?.length > 6 ? (
            <Center>
              <TouchableOpacity activeOpacity={0.7}>
                <Text
                  style={[
                    {
                      ...styles.heading,
                      color:
                        item?.subscriptionType == 'popular'
                          ? '#459412'
                          : item?.subscriptionType == 'branded'
                          ? '#8e11a5'
                          : theme,
                    },
                    gs.mv3,
                  ]}>
                  View more
                </Text>
              </TouchableOpacity>
            </Center>
          ) : null}

          <Center>
            <TouchableOpacity
              style={{
                ...styles.subscribebtn,
                backgroundColor:
                  item?.subscriptionType == 'popular'
                    ? '#459412'
                    : item?.subscriptionType == 'branded'
                    ? '#8e11a5'
                    : theme,
              }}
              activeOpacity={0.7}
              onPress={() => setOpenCouponSheet(true)}>
              <Text
                style={[
                  gs.fs15,
                  {color: '#fff', fontFamily: ts.secondarymedium},
                ]}>
                Subscribe Now
              </Text>
            </TouchableOpacity>
          </Center>
        </Card>
      </View>
    );
  };
  const scrollToIndex = idx => {
    setActiveindex(idx);
    bottomRef.current.scrollTo({index: idx});
    if (idx * (width / 2) > width / 2) {
      topRef.current.scrollToOffset({
        offset: idx * (width / 2) + width / 4 - width / 2,
        animated: true,
      });
    } else {
      topRef.current.scrollToOffset({
        offset: idx,
        animated: true,
      });
    }
  };
  return (
    <ScreenWrapper>
      {/* =====HEADER======== */}
      <ThemeHeaderWrapper
        lefttxt="Subscription"
        navigation={navigation}
        notifyIcon={false}
      />
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <View style={[gs.m15]}>
          <Flex direction="row" justify="space-between" align="center">
            <Text style={styles.heading}>Choose your subscription types</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setMonthly(!monthly);
              }}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesomeIcon
                name={!monthly ? 'toggle-on' : 'toggle-off'}
                style={[
                  // gs.ml10,
                  {
                    ...styles.toggleicon,
                    color: !monthly ? theme : ts.secondarytext,
                  },
                ]}
              />
              <Text style={styles.heading}>
                {!monthly ? 'Monthly' : 'Yearly'}
              </Text>
            </TouchableOpacity>
          </Flex>
        </View>
        <Center>
          <FlatList
            ref={topRef}
            keyExtractor={(item, index) => String(index)}
            data={subListData}
            renderItem={renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </Center>
        <Carousel
          loop={false}
          ref={bottomRef}
          width={width}
          height={height}
          data={subListData}
          onSnapToItem={index => scrollToIndex(index)}
          renderItem={renderPlans}
          style={[gs.mt10]}
        />
      </View>
      <CouponSheet
        openCouponSheet={openCouponSheet}
        setOpenCouponSheet={setOpenCouponSheet}
        flow={flow}
      />
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  heading: {
    fontSize: '13@ms',
    color: ts.secondarytext,
    fontFamily: ts.secondaryregular,
  },
  header: {
    height: '60@ms',
    borderTopLeftRadius: '20@ms',
    borderTopRightRadius: '20@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headtxt: {
    fontSize: '18@ms',
    color: '#fff',
    fontFamily: ts.secondaryregular,
  },
  subscribebtn: {
    height: '40@ms',
    width: '170@ms',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20@ms',
    marginTop: '30@ms',
  },
  toggleicon: {
    fontSize: '35@ms',
    color: ts.secondarytext,
  },
});
