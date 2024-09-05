import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {useSelector} from 'react-redux';
import {Center, Flex} from 'native-base';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import AntIcons from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {ScaledSheet} from 'react-native-size-matters';

export default function SubscribedPlans({
  navigation,
  flow,
  setShowActivesubs,
  theme,
}) {
  let {queuedData} = useSelector(state => state.subscription);
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
  return (
    <ScreenWrapper>
      {/* =====HEADER======== */}
      <ThemeHeaderWrapper
        lefttxt="Subscription"
        navigation={navigation}
        notifyIcon={false}
      />
      <ScrollView style={[{flex: 1, backgroundColor: '#fff'}, gs.ph15]}>
        {queuedData?.activeSubscription?.id ? (
          <>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              style={[gs.mt20]}>
              <Text style={styles.keys}>Your Subscription Status</Text>
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
              <Text style={styles.keys}>Vendor Type</Text>
              <Text style={styles.values}>
                {flow == 'catering' ? 'Catering Service' : 'Tiffin Service'}
              </Text>
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              style={[gs.mt10]}>
              <Text style={styles.keys}>Subscription Plan</Text>
              <Text style={styles.values}>
                {queuedData?.activeSubscription?.subscription_display_name}
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
            <Flex
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              style={[gs.mt10]}>
              <Text style={styles.keys}>Discount Amount</Text>
              <Text style={styles.values}>
                {queuedData?.activeSubscription?.discount_amount}
              </Text>
            </Flex>
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
                {calculateRemainingDays(
                  queuedData?.activeSubscription?.start_date,
                  queuedData?.activeSubscription?.end_date,
                )}
              </Text>
            </Flex>
           
          </>
        ) : null}
        {queuedData?.queuedSubscriptions?.length
          ? queuedData?.queuedSubscriptions?.map((e, i) => (
              <View key={i} style={[gs.mv20]}>
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  style={[gs.mt20]}>
                  <Text style={styles.keys}>Your Subscription Status</Text>
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
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  style={[gs.mt10]}>
                  <Text style={styles.keys}>Vendor Type</Text>
                  <Text style={styles.values}>
                    {flow == 'catering' ? 'Catering Service' : 'Tiffin Service'}
                  </Text>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  style={[gs.mt10]}>
                  <Text style={styles.keys}>Subscription Plan</Text>
                  <Text style={styles.values}>
                    {e?.subscription_display_name}
                  </Text>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  style={[gs.mt10]}>
                  <Text style={styles.keys}>Subscription Charges</Text>
                  <Text style={styles.values}>{e?.final_amount}</Text>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  style={[gs.mt10]}>
                  <Text style={styles.keys}>Discount Amount</Text>
                  <Text style={styles.values}>{e?.discount_amount}</Text>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  style={[gs.mt10]}>
                  <Text style={styles.keys}>Subscription Start Date</Text>
                  <Text style={styles.values}>
                    {moment(e?.start_date).format('DD-MMM-YYYY')}
                  </Text>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  style={[gs.mt10]}>
                  <Text style={styles.keys}>Subscription End Date</Text>
                  <Text style={styles.values}>
                    {moment(e?.end_date).format('DD-MMM-YYYY')}
                  </Text>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  style={[gs.mt10]}>
                  <Text style={styles.keys}>Days Remaining</Text>
                  <Text style={styles.values}>
                    {calculateRemainingDays(e?.start_date, e?.end_date)}
                  </Text>
                </Flex>
              </View>
            ))
          : null}
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
