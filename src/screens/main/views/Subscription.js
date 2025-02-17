import {
  View,
  Text,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {gs} from '../../../../GlobalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {ts} from '../../../../ThemeStyles';
import {Actionsheet, Center, Flex, Spinner} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';
import {Card} from 'react-native-paper';
import {plan_data} from '../../../constants/Constant';
import Carousel from 'react-native-reanimated-carousel';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {getFlow} from '../../../redux/slicers/CommomSlicer';
import {
  cancelChange,
  createOneTimeSub,
  getQueuedSubscription,
  getSubscriptionList,
} from '../../controllers/SubscriptionController';
import CouponSheet from './CouponSheet';
import {getVendorDetails} from '../../services/AuthServices';
import SubDetails from './SubDetails';
import {
  calculatePayService,
  createOneTimeSubService,
} from '../../services/SubscriptionService';
import SubscribedPlans from './SubscribedPlans';

export default function Subscription({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const {height, width} = useWindowDimensions();
  const [activeIndex, setActiveindex] = useState(0);
  const [monthly, setMonthly] = useState(false);
  const [vendor, setVendor] = useState(null);
  const dispatch = useDispatch();
  let {subListData, subListError, subListLoading, queuedData, canceltriggered} =
    useSelector(state => state.subscription);
  const [openCouponSheet, setOpenCouponSheet] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [viewDetails, setViewDetails] = useState(false);
  const [details, setDetails] = useState(null);
  const [showActiveSubs, setShowActivesubs] = useState(false);
  const [activeSheet, setActiveSheet] = useState(false);
  const [activeDetails, setActiveDetails] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let vd = await getVendorDetails(dispatch);
        setVendor(vd?.data?.data);
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  useMemo(() => {
    dispatch(getFlow(flow));
    let params = {
      vendor_type: flow == 'catering' ? 'Caterer' : 'Tiffin',
      mode:"test"
    };
    dispatch(getSubscriptionList({params}));
    dispatch(getQueuedSubscription());
  }, [flow]);

  useMemo(() => {
    if (
      queuedData?.activeSubscription?.id ||
      queuedData?.queuedSubscriptions?.length ||
      queuedData?.pendingSubscriptions?.length
    ) {
      setShowActivesubs(true);
    }
  }, [queuedData]);

  useEffect(() => {
    if (canceltriggered) {
      setShowActivesubs(false);
      dispatch(cancelChange(true));
    }
  }, [canceltriggered]);
  //========REFS========//
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const handleCalculatePay = async item => {
    let body = {
      subscriptionTypeId: item?.subscriptionTypeId,
      subscriptionDuration: monthly ? 'monthly' : 'yearly',
    };
    try {
      let res = await calculatePayService({body, dispatch});
      setDetails(res);
      setOpenCouponSheet(true);
      setSelectedPlan(item);
    } catch (error) {}
  };

  const handleViewDetails = ({details}) => {
    setActiveSheet(true);
    setActiveDetails(details);
  };

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
  // console.log(subListData)
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
            {width: width - 100, height: height / 1.7, backgroundColor: '#fff'},
            gs.br20,
          ]}>
          <View
            style={[
              styles.header,
              {
                backgroundColor:item?.subscriptionTypeDisplayColor
              },
            ]}>
            <Text style={[styles.headtxt]}>
              {item?.subscriptionType?.slice(0, 1)?.toUpperCase()}
              {item?.subscriptionType?.slice(1)}
            </Text>
          </View>
          <Center>
            <Flex direction="row" alignItems="center" style={[gs.mt20]}>
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
              Benefits:
            </Text>
            {/* {item?.benefits?.slice(0, 4)?.map((e, i) => (
              <Text
                style={[{...styles.heading, color: ts.primarytext}, gs.mv3]}
                numberOfLines={1}
                key={i}>
                - {e}
              </Text>
            ))} */}
            <View
              style={{
                height: Platform.OS == 'android' ? height / 3.9 : height / 3.5,
              }}>
              {item?.benefits &&
                Object.entries(item.benefits)
                  .slice(0, Platform.OS == 'ios' ? 8 : 4)
                  .map(([key, benefit], index) => (
                    <Text
                      key={key}
                      style={[
                        {...styles.heading, color: ts.primarytext},
                        gs.mv3,
                      ]}>
                      - {benefit}
                    </Text>
                  ))}
            </View>
            <Center>
              {item?.benefits &&
              Object.entries(item.benefits)?.length > Platform.OS == 'ios' ? (
                8
              ) : 5 ? (
                <TouchableOpacity
                  style={[gs.pb10]}
                  activeOpacity={0.7}
                  onPress={() => {
                    handleViewDetails({
                      details: item.benefits,
                    });
                  }}>
                  <Text style={[{color: ts.secondarytext}, gs.fs14]}>
                    view details{' '}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </Center>
          </View>

          <Center>
            <TouchableOpacity
              style={{
                ...styles.subscribebtn,
                backgroundColor:item?.subscriptionTypeDisplayColor
              }}
              activeOpacity={0.7}
              onPress={() => {
                handleCalculatePay(item);
              }}>
              <Text
                style={[
                  gs.fs15,
                  {color: '#fff', fontFamily: ts.secondarymedium},
                ]}>
                {queuedData?.activeSubscription?.id ||
                queuedData?.queuedSubscriptions?.length
                  ? 'Upgrade Subscription'
                  : 'Subscribe Now'}
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
  if (showActiveSubs) {
    return (
      <SubscribedPlans
        navigation={navigation}
        flow={flow}
        setShowActivesubs={setShowActivesubs}
        theme={theme}
      />
    );
  }
  return (
    <ScreenWrapper>
      {/* =====HEADER======== */}
      <ThemeHeaderWrapper
        lefttxt="Subscription"
        navigation={navigation}
        notifyIcon={true}
      />
      <ScrollView style={{backgroundColor: '#fff', flex: 1}}>
        <View>
          <View style={[gs.m15]}>
            <View>
              {queuedData?.activeSubscription?.id ||
              queuedData?.queuedSubscriptions?.length ? (
                <TouchableOpacity
                  onPress={() => {
                    setShowActivesubs(true);
                  }}
                  activeOpacity={0.7}>
                  <Flex direction="row" alignItems="center">
                    <MaterialIcons
                      name="arrow-back"
                      style={[gs.fs20, {color: theme}]}
                    />
                    <Text
                      style={[
                        {color: theme, fontFamily: ts.secondarymedium},
                        gs.fs12,
                        gs.ml10,
                      ]}>
                      View Active / Queued Subscriptions
                    </Text>
                  </Flex>
                </TouchableOpacity>
              ) : null}
            </View>
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
                  {!monthly ? 'Yearly' : 'Monthly'}
                </Text>
              </TouchableOpacity>
            </Flex>
          </View>
          <Center>
            {
              subListData &&
              <FlatList
              ref={topRef}
              keyExtractor={(item, index) => String(index)}
              data={subListData}
              renderItem={renderItem}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
            }
           
          </Center>
          {subListLoading ? (
            <Spinner color={theme} />
          ) : (
            subListData &&
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
          )}
        </View>
      </ScrollView>
      <Actionsheet
        isOpen={activeSheet}
        onClose={() => {
          setActiveSheet(false);
        }}>
        <Actionsheet.Content style={{backgroundColor: '#fff', width: '100%'}}>
          <ScrollView>
            {activeDetails &&
              Object.entries(activeDetails).map(([key, benefit], index) => (
                <Text
                  key={key}
                  style={[{...styles.heading, color: ts.primarytext}, gs.mv3]}>
                  - {benefit}
                </Text>
              ))}
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
      <CouponSheet
        openCouponSheet={openCouponSheet}
        setOpenCouponSheet={setOpenCouponSheet}
        flow={flow}
        vendor={vendor}
        plan={selectedPlan}
        planType={monthly ? 'Monthly' : 'Yearly'}
        details={details}
        setDetails={setDetails}
      />
      <SubDetails
        viewDetails={viewDetails}
        setViewDetails={setViewDetails}
        plan={selectedPlan}
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
    width: '190@ms',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20@ms',
    marginTop: '5@ms',
  },
  toggleicon: {
    fontSize: '35@ms',
    color: ts.secondarytext,
  },
});
