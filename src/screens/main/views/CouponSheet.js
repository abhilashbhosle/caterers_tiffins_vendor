import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {Actionsheet, Center, Flex, Modal, theme} from 'native-base';
import {ts} from '../../../../ThemeStyles';
import {gs} from '../../../../GlobalStyles';
import {ScaledSheet} from 'react-native-size-matters';
import FontIcons from 'react-native-vector-icons/FontAwesome6';
import {RAZORPAY_KEY} from '@env';
import RazorpayCheckout from 'react-native-razorpay';
import {
  calculatePayService,
  handlePayService,
  handleSubscriptionService,
} from '../../services/SubscriptionService';
import {useDispatch} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {color} from 'native-base/lib/typescript/theme/styled-system';
import { getQueuedSubscription } from '../../controllers/SubscriptionController';

function CouponSheet({
  openCouponSheet,
  setOpenCouponSheet,
  flow,
  vendor,
  plan,
  planType,
  details,
  setDetails,
}) {
  const {height, width} = Dimensions.get('screen');
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState('');
  const [subscribe, setSubscribed] = useState(true);

  const handleCalculatePay = async () => {
    setOpenCouponSheet(false);
    let body = {
      subscriptionTypeId: plan?.subscriptionTypeId,
      subscriptionDuration: planType == 'Yearly' ? 'yearly' : 'monthly',
      couponCode: couponCode,
    };
    try {
      let res = await calculatePayService({body, dispatch});
      setDetails(res);
    } catch (error) {
    } finally {
      setOpenCouponSheet(true);
    }
  };
  const handlePay = async () => {
    setOpenCouponSheet(false);
    let body = {
      subscriptionTypeId: plan?.subscriptionTypeId,
      subscriptionDuration: planType == 'Yearly' ? 'yearly' : 'monthly',
      couponCode: couponCode,
    };
    try {
      let res = await handlePayService({body, dispatch});
      if (res?.order.id) {
        handlePayment({order_id:res.order?.id,order_amount:res?.order?.amount});
      }
    } catch (error) {
    } finally {
      setOpenCouponSheet(true);
    }
  };
  const handlePayment = ({order_id,order_amount}) => {
    var options = {
      // description: 'Credits towards consultation',
      // image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: RAZORPAY_KEY,
      amount: order_amount,
      name: vendor?.vendor_service_name,
      prefill: {
        // email: 'void@razorpay.com',
        contact: vendor?.phone_number,
        name: vendor?.vendor_service_name,
      },
      theme: {color: '#F37254'},
      order_id:!subscribe?order_id:"",
      subscription_id:subscribe?order_id:"",
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
        setOpenCouponSheet(false);
        dispatch(getQueuedSubscription())
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.description}`);
      });
  };
  // =======CREATE SUBSCRIPTION========//
  const handleSubscription = async () => {
    setOpenCouponSheet(false);
    let body = {
      subscription_type_id: plan?.subscriptionTypeId,
      subscription_duration: planType == 'Yearly' ? 'yearly' : 'monthly',
      plan_id: planType == 'Yearly' ? plan?.plans[0]?.id : plan?.plans[1]?.id,
    };
    try {
      let res = await handleSubscriptionService({body, dispatch});
      if (res) {
        handlePayment({order_id:res.id,order_amount:details?.finalAmount});
      }
    } catch (error) {
    } finally {
      setOpenCouponSheet(true);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <Actionsheet
        isOpen={openCouponSheet}
        onClose={() => {
          setOpenCouponSheet(false);
        }}>
        <Actionsheet.Content
          style={[
            {
              backgroundColor: '#fff',
              height: height - 250,
            },
          ]}>
          <View style={[{width: '100%'}, gs.p15]}>
            {!subscribe ? (
              <>
                <Text
                  style={[
                    gs.fs20,
                    {
                      color: ts.primarytext,
                      fontFamily: ts.secondarymedium,
                    },
                  ]}>
                  Do you have coupon code?
                </Text>
                <Text
                  style={[gs.fs14, gs.mt10, gs.mb5, {color: ts.secondarytext}]}>
                  Enter coupon code
                </Text>
                <Flex
                  direction="row"
                  align="center"
                  //   justifyContent={'center'}
                  mt={3}
                  width={'100%'}>
                  <TextInput
                    style={{...styles.input, width: width / 2.5}}
                    placeholder="CANDT50"
                    placeholderTextColor={ts.secondarytext}
                    value={couponCode}
                    onChangeText={text => setCouponCode(text)}
                  />
                  <TouchableOpacity
                    style={{
                      ...styles.subscribebtn,
                      backgroundColor: theme,
                      width: width / 2.5,
                    }}
                    activeOpacity={0.7}
                    onPress={handleCalculatePay}>
                    <Text
                      style={[
                        gs.fs15,
                        {color: '#fff', fontFamily: ts.secondarymedium},
                      ]}>
                      APPLY
                    </Text>
                  </TouchableOpacity>
                </Flex>
              </>
            ) : null}
            <Text
              style={[
                gs.fs16,
                {
                  color:theme,
                  fontFamily: ts.secondarymedium,
                },
                gs.mt10
              ]}>
              Plan Details
            </Text>
            <Flex style={[gs.mt10]} direction="row" alignItems="center">
              <Flex>
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between">
                  <Text
                    style={[
                      gs.fs14,
                      {color: ts.primarytext, fontFamily: ts.secondarymedium},
                    ]}>
                    Plan Name
                  </Text>
                  <Text
                    style={[
                      gs.fs14,
                      {
                        color: ts.secondarytext,
                        fontFamily: ts.secondaryregular,
                      },
                    ]}>
                    {plan?.subscriptionTypeDisplayName}
                  </Text>
                </Flex>
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between">
                  <Text
                    style={[
                      gs.fs14,
                      {color: ts.primarytext, fontFamily: ts.secondarymedium},
                    ]}>
                    Plan Type
                  </Text>
                  <Text
                    style={[
                      gs.fs14,
                      {
                        color: ts.secondarytext,
                        fontFamily: ts.secondaryregular,
                      },
                    ]}>
                    {planType}
                  </Text>
                </Flex>
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between">
                  <Text
                    style={[
                      gs.fs14,
                      {color: ts.primarytext, fontFamily: ts.secondarymedium},
                    ]}>
                    Price
                  </Text>
                  <Text
                    style={[
                      gs.fs14,
                      {
                        color: ts.secondarytext,
                        fontFamily: ts.secondaryregular,
                      },
                    ]}>
                    {details?.finalAmount}/-
                  </Text>
                </Flex>
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between">
                  <Text
                    style={[
                      gs.fs14,
                      {color: ts.primarytext, fontFamily: ts.secondarymedium},
                    ]}>
                    Discount Price
                  </Text>
                  <Text
                    style={[
                      gs.fs14,
                      {
                        color: ts.secondarytext,
                        fontFamily: ts.secondaryregular,
                      },
                    ]}>
                    {details?.discountAmount}
                  </Text>
                </Flex>
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between">
                  <Text
                    style={[
                      gs.fs14,
                      {color: ts.primarytext, fontFamily: ts.secondarymedium},
                    ]}>
                    Start Date
                  </Text>
                  <Text
                    style={[
                      gs.fs14,
                      {
                        color: ts.secondarytext,
                        fontFamily: ts.secondaryregular,
                      },
                    ]}>
                    {details?.startDate}
                  </Text>
                </Flex>
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between">
                  <Text
                    style={[
                      gs.fs14,
                      {color: ts.primarytext, fontFamily: ts.secondarymedium},
                    ]}>
                    End Date
                  </Text>
                  <Text
                    style={[
                      gs.fs14,
                      {
                        color: ts.secondarytext,
                        fontFamily: ts.secondaryregular,
                      },
                    ]}>
                    {details?.expiryDate}
                  </Text>
                </Flex>
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between">
                  <Text
                    style={[
                      gs.fs14,
                      {color: ts.primarytext, fontFamily: ts.secondarymedium},
                    ]}>
                    Due Date
                  </Text>
                  <Text
                    style={[
                      gs.fs14,
                      gs.ml10,
                      {
                        color: ts.secondarytext,
                        fontFamily: ts.secondaryregular,
                      },
                    ]}>
                    {details?.paymentTerms}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Center style={[gs.mt15]}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setSubscribed(!subscribe);
                }}>
                <Flex direction="row" alignItems="center">
                  <Text
                    style={[
                      gs.fs14,
                      {color: ts.primarytext, fontFamily: ts.secondarymedium},
                    ]}>
                    Subscribe
                  </Text>
                  {subscribe ? (
                    <MaterialIcons
                      name="check-box"
                      style={{...styles.checkbox, color: theme}}
                    />
                  ) : (
                    <MaterialIcons
                      name="check-box-outline-blank"
                      style={{...styles.checkbox, color: theme}}
                    />
                  )}
                </Flex>
              </TouchableOpacity>
            </Center>
            {/* =======PAY BUTTON======= */}
            <TouchableOpacity
              onPress={subscribe ? handleSubscription : handlePay}>
              <Center style={{marginTop: 50}}>
                <Flex direction="row" alignItems="center">
                  <Text
                    style={[
                      gs.fs14,
                      {color: theme, fontFamily: ts.secondarymedium},
                    ]}>
                    Continue to payment{' '}
                  </Text>
                  <FontIcons
                    name="arrow-right-long"
                    style={[gs.fs16, gs.ml5, {color: theme}]}
                  />
                </Flex>
              </Center>
            </TouchableOpacity>
          </View>
        </Actionsheet.Content>
      </Actionsheet>
    </TouchableWithoutFeedback>
  );
}
const styles = ScaledSheet.create({
  input: {
    height: '40@ms',
    borderWidth: 1,
    borderColor: ts.primarytext,
    padding: '10@ms',
    borderRadius: '10@ms',
    fontSize: '16@ms',
    marginRight: '10@ms',
    color: ts.primarytext,
  },
  subscribebtn: {
    height: '40@ms',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10@ms',
  },
  checkbox: {
    fontSize: '22@ms',
    marginLeft: '5@ms',
  },
});
export default memo(CouponSheet);
