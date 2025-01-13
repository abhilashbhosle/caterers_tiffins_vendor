import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {useDispatch, useSelector} from 'react-redux';
import {Center, Flex} from 'native-base';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import AntIcons from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {ScaledSheet} from 'react-native-size-matters';
import {cancelSubscription} from '../../controllers/SubscriptionController';

export default function SubscribedPlans({
  navigation,
  flow,
  setShowActivesubs,
  theme,
}) {
  let {queuedData} = useSelector(state => state.subscription);
  const dispatch = useDispatch();
  function calculateRemainingDays(startDate, endDate) {
    // Convert start and end dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the difference in time (in milliseconds)
    const timeDifference = end - start;

    // Convert time difference from milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  }

  const handleCancelSub = ({id}) => {
    dispatch(cancelSubscription({subscription_id: id}));
  };

  return (
    <ScreenWrapper>
      {/* =====HEADER======== */}
      <ThemeHeaderWrapper
        lefttxt="Subscription"
        navigation={navigation}
        notifyIcon={false}
      />

      <ScrollView style={[{flex: 1, backgroundColor: '#fff'}, gs.ph15]}>
        <Center>
          <Text
            style={[
              gs.fs17,
              {color: theme, fontFamily: ts.secondarysemibold},
              gs.mt10,
            ]}>
            Manage Your Subscriptions
          </Text>
        </Center>
        {queuedData?.activeSubscription?.id ? (
          <>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              style={[gs.mt20]}>
              <Text style={styles.keys}>Vendor Type</Text>
              <Text style={{...styles.values, color: theme,fontFamily:ts.secondarysemibold}}>
                {flow == 'catering' ? 'Catering Service' : 'Tiffin Service'}
              </Text>
            </Flex>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              style={[gs.mt10]}>
              <Text style={styles.keys}>Subscription Status</Text>
              <Flex direction="row" alignItems="center">
                <AntIcons name="check" style={[gs.fs22, {color: ts.accent3}]} />
                <Text
                  style={[
                    gs.fs17,
                    {color: ts.accent3, fontFamily: ts.secondarysemibold},
                  ]}>
                  Active
                </Text>
              </Flex>
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              style={[gs.mt10]}>
              <Text style={styles.keys}>Subscription Plan</Text>
              <Text
                style={[
                  {
                    ...styles.values,
                    backgroundColor:
                      queuedData?.activeSubscription?.display_color,
                    color: '#fff',
                  },
                  gs.ph10,
                  gs.br10,
                ]}>
                {queuedData?.activeSubscription?.subscription_display_name}
              </Text>
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              style={[gs.mt10]}>
              <Text style={styles.keys}>Subscription Type</Text>
              <Text style={styles.values}>
                {queuedData?.activeSubscription?.subscription_pattern }
              </Text>
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              style={[gs.mt10]}>
              <Text style={styles.keys}>Subscription Charges</Text>
              <Text style={styles.values}>
                {queuedData?.activeSubscription?.final_amount}
              </Text>
            </Flex>
            {/* <Flex
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              style={[gs.mt10]}>
              <Text style={styles.keys}>Discount Amount</Text>
              <Text style={styles.values}>
                {queuedData?.activeSubscription?.discount_amount}
              </Text>
            </Flex> */}
            <Flex
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              style={[gs.mt10]}>
              <Text style={styles.keys}>Subscription Start Date</Text>
              <Text style={styles.values}>
                {moment(queuedData?.activeSubscription?.start_date).format(
                  'DD-MMM-YYYY',
                )}
              </Text>
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              style={[gs.mt10]}>
              <Text style={styles.keys}>Subscription End Date</Text>
              <Text style={styles.values}>
                {moment(queuedData?.activeSubscription?.end_date).format(
                  'DD-MMM-YYYY',
                )}
              </Text>
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              style={[gs.mt10]}>
              <Text style={styles.keys}>Days Remaining</Text>
              <Text style={styles.values}>
              {queuedData?.activeSubscription?.remaining_days}
              </Text>
            </Flex>
            {queuedData?.activeSubscription?.subscription_pattern ==
            'subscription-yearly' || 
            queuedData?.activeSubscription?.subscription_pattern=="subscription-monthly"? (
              <Center>
                <TouchableOpacity
                  style={{
                    ...styles.subscribebtn,
                    backgroundColor: theme,
                  }}
                  activeOpacity={0.7}
                  onPress={() => {
                    queuedData?.activeSubscription?.razorpay_subscription_id &&
                      handleCancelSub({
                        id: queuedData?.activeSubscription
                          ?.razorpay_subscription_id,
                      });
                  }}>
                  <Text
                    style={[
                      gs.fs15,
                      {color: '#fff', fontFamily: ts.secondarymedium},
                    ]}>
                    Cancel Subscription
                  </Text>
                </TouchableOpacity>
              </Center>
            ) : (
              <Center>
                <TouchableOpacity
                  style={{
                    ...styles.subscribebtn,
                    backgroundColor: theme,
                  }}
                  activeOpacity={0.7}
                  onPress={() => {
                    setShowActivesubs(false);
                  }}>
                  <Text
                    style={[
                      gs.fs15,
                      {color: '#fff', fontFamily: ts.secondarymedium},
                    ]}>
                    Upgrade Subscription
                  </Text>
                </TouchableOpacity>
              </Center>
            )}
          </>
        ) : null}
        {/* =======QUEUED SUBSCRIPTIONS============ */}
        {queuedData?.queuedSubscriptions?.length
          ? queuedData?.queuedSubscriptions?.map((e, i) => (
              <View key={i} style={[gs.mv20]}>
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  style={[gs.mt20]}>
                  <Text style={styles.keys}>Subscription Status</Text>
                  <Flex direction="row" alignItems="center">
                    <AntIcons
                      name="check"
                      style={[gs.fs22, {color: ts.accent3}]}
                    />
                    <Text
                      style={[
                        gs.fs17,
                        {color: ts.accent3, fontFamily: ts.secondarysemibold},
                      ]}>
                      Queued
                    </Text>
                  </Flex>
                </Flex>
                {/* <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  style={[gs.mt10]}>
                  <Text style={styles.keys}>Vendor Type</Text>
                  <Text style={{...styles.values, color: theme}}>
                    {flow == 'catering' ? 'Catering Service' : 'Tiffin Service'}
                  </Text>
                </Flex> */}
               
                {/* <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  style={[gs.mt10]}>
                  <Text style={styles.keys}>Subscription Tyoe</Text>
                  <Text style={styles.values}>
                    {e?.subscription_pattern == 'one_time_yearly' || e?.subscription_pattern=="one_time_monthly"
                      ? 'One-Time'
                      : 'Reccuring'}
                  </Text>
                </Flex> */}
                {/* <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  style={[gs.mt10]}>
                  <Text style={styles.keys}>Subscription Charges</Text>
                  <Text style={styles.values}>{e?.final_amount}</Text>
                </Flex> */}
                {/* <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  style={[gs.mt10]}>
                  <Text style={styles.keys}>Discount Amount</Text>
                  <Text style={styles.values}>{e?.discount_amount}</Text>
                </Flex> */}
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  style={[gs.mt10]}>
                  <Text style={styles.keys}>Subscription Start Date</Text>
                  <Text style={styles.values}>
                    {moment(e?.start_date).format('MMMM DD, YYYY')}
                  </Text>
                </Flex>
                {/* <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  style={[gs.mt10]}>
                  <Text style={styles.keys}>Subscription End Date</Text>
                  <Text style={styles.values}>
                    {moment(e?.end_date).format('DD-MMM-YYYY')}
                  </Text>
                </Flex> */}
                 <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  style={[gs.mt10]}>
                  <Text style={styles.keys}>Subscription Plan</Text>
                  <Text
                    style={[
                      {
                        ...styles.values,
                        backgroundColor: e?.display_color,
                        color: '#fff',
                      },
                      gs.ph10,
                      gs.br10,
                    ]}>
                    {e?.subscription_display_name}
                  </Text>
                </Flex>
                  <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  style={[gs.mt10]}>
                  <Text style={styles.keys}>Subscription Type</Text>
                  <Text style={styles.values}>
                    {e?.subscription_pattern}
                  </Text>
                </Flex>
                {/* <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  style={[gs.mt10]}>
                  <Text style={styles.keys}>Days Remaining</Text>
                  <Text style={styles.values}>
                    {calculateRemainingDays(e?.start_date, e?.end_date)}
                  </Text>
                </Flex> */}
              </View>
            ))
          : null}
        {/* ========PENDING SUBSCRIPTIONS======= */}
        {queuedData?.pendingSubscriptions?.length
          ? queuedData?.pendingSubscriptions?.map((e, i) => (
              <View key={i} style={[gs.mv20]}>
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  style={[gs.mt20]}>
                  <Text style={styles.keys}>Subscription Status</Text>
                  <Flex direction="row" alignItems="center">
                    <AntIcons
                      name="check"
                      style={[gs.fs22, {color: ts.accent3}]}
                    />
                    <Text
                      style={[
                        gs.fs17,
                        {color: ts.accent3, fontFamily: ts.secondarysemibold},
                      ]}>
                      Pending
                    </Text>
                  </Flex>
                </Flex>
                {/* <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  style={[gs.mt10]}>
                  <Text style={styles.keys}>Vendor Type</Text>
                  <Text style={{...styles.values, color: theme}}>
                    {flow == 'catering' ? 'Catering Service' : 'Tiffin Service'}
                  </Text>
                </Flex> */}
                 <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  style={[gs.mt10]}>
                  <Text style={styles.keys}>Subscription Start Date</Text>
                  <Text style={styles.values}>
                  {moment(e?.start_date).format('MMMM DD, YYYY')}
                  </Text>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  style={[gs.mt10]}>
                  <Text style={styles.keys}>Subscription Plan</Text>
                  <Text
                    style={[
                      {
                        ...styles.values,
                        backgroundColor: e?.display_color,
                        color: '#fff',
                      },
                      gs.ph10,
                      gs.br10,
                    ]}>
                    {e?.subscription_display_name}
                  </Text>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  style={[gs.mt10]}>
                  <Text style={styles.keys}>Subscription Type</Text>
                  <Text style={styles.values}>
                    {e?.subscription_pattern}
                  </Text>
                </Flex>
                {/* <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  style={[gs.mt10]}>
                  <Text style={styles.keys}>Subscription Charges</Text>
                  <Text style={styles.values}>{e?.final_amount}</Text>
                </Flex> */}
                {/* <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  style={[gs.mt10]}>
                  <Text style={styles.keys}>Discount Amount</Text>
                  <Text style={styles.values}>{e?.discount_amount}</Text>
                </Flex> */}
               
                {/* <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  style={[gs.mt10]}>
                  <Text style={styles.keys}>Subscription End Date</Text>
                  <Text style={styles.values}>
                    {moment(e?.end_date).format('DD-MMM-YYYY')}
                  </Text>
                </Flex> */}
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  style={[gs.mt10]}>
                  <Text style={styles.keys}>Days Remaining</Text>
                  <Text style={styles.values}>
                    {/* {calculateRemainingDays(e?.start_date, e?.end_date)}
                     */}
                     {e?.remaining_days}
                  </Text>
                </Flex>
              </View>
            ))
          : null}
      </ScrollView>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  subscribebtn: {
    height: '40@ms',
    width: '190@ms',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20@ms',
    marginTop: '30@ms',
  },
  keys: {
    color: ts.primarytext,
    fontSize: '13@ms',
    fontFamily: ts.secondarymedium,
  },
  values: {
    color: ts.secondarytext,
    fontSize: '13@ms',
    fontFamily: ts.secondaryregular,
  },
});
