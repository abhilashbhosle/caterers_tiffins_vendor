import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Actionsheet} from 'native-base';
import {getQuickLink} from '../../services/QuickLinkService';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import CouponSheet from './CouponSheet';
import {useDispatch, useSelector} from 'react-redux';
import {getVendorDetails} from '../../services/AuthServices';

export default function QuickLink({theme}) {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(null);
  const [openCouponSheet, setOpenCouponSheet] = useState(false);
  const flow = useSelector(state => state.common.flow);
  const [vendor, setVendor] = useState(null);
  const dispatch=useDispatch();
  useEffect(() => {
    const getLink = async () => {
      let res = await getQuickLink();
      if (res.data?.data?.length > 0) {
        setDetails(res.data?.data);
        setOpen(true);
      }
    };
    getLink();
    (async () => {
      try {
        let vd = await getVendorDetails(dispatch);
        setVendor(vd?.data?.data);
      } catch (error) {
        throw error;
      }
    })();
  }, []);
  const handleGo = () => {
    setOpenCouponSheet(true);
  };
  return (
    <>
      <Actionsheet
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}>
        <Actionsheet.Content style={{backgroundColor: 'white', width: '100%'}}>
          <Text
            style={[
              gs.fs20,
              {
                color: ts.primarytext,
                fontFamily: ts.primarybold,
                width: '100%',
              },
            ]}>
            Customer Care Link
          </Text>
          <Text
            style={[
              gs.fs16,
              gs.mv10,
              {
                color: ts.primarytext,
                fontFamily: ts.primaryregular,
                width: '100%',
              },
            ]}>
            Click the <Text style={{fontFamily: ts.primarybold}}>'GO'</Text>{' '}
            button to proceed.
          </Text>
          <View
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                width: '100%',
              },
              gs.mb20,
            ]}>
            <TouchableOpacity
              style={[
                {
                  width: '28%',
                  height: 40,
                  backgroundColor: theme,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                },
              ]}
              activeOpacity={0.7}
              onPress={handleGo}>
              <Text
                style={[
                  gs.fs15,
                  {color: '#fff', fontFamily: ts.secondarymedium},
                ]}>
                Go
              </Text>
            </TouchableOpacity>
          </View>
        </Actionsheet.Content>
      </Actionsheet>
      <CouponSheet
        openCouponSheet={openCouponSheet}
        setOpenCouponSheet={setOpenCouponSheet}
        flow={flow}
        vendor={vendor}
        plan={details?.length?details[0]:null}
        planType={details?.subType == 'Yearly' ? 'Yearly' : 'Monthly'}
        details={details?.length?details[0]:null}
        setDetails={setDetails}
        hideCouponInput={true}
		setOpen={setOpen}
      />
    </>
  );
}
