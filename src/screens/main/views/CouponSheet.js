import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {memo} from 'react';
import {Actionsheet, Center, Flex, Modal, theme} from 'native-base';
import {ts} from '../../../../ThemeStyles';
import {gs} from '../../../../GlobalStyles';
import {ScaledSheet} from 'react-native-size-matters';
import FontIcons from 'react-native-vector-icons/FontAwesome6';

function CouponSheet({openCouponSheet, setOpenCouponSheet, flow}) {
  const {height, width} = Dimensions.get('screen');
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
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
          <View style={[{width: '100%'},gs.p15]}>
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
            <Text style={[gs.fs14, gs.mt10, gs.mb5, {color: ts.secondarytext}]}>
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
              />
              <TouchableOpacity
                style={{
                  ...styles.subscribebtn,
                  backgroundColor: theme,
                  width: width / 2.5,
                }}
                activeOpacity={0.7}>
                <Text
                  style={[
                    gs.fs15,
                    {color: '#fff', fontFamily: ts.secondarymedium},
                  ]}>
                  APPLY
                </Text>
              </TouchableOpacity>
            </Flex>
            <Center style={{marginTop: 50}}>
              <TouchableOpacity>
                <Flex direction="row" alignItems="center">
                  <Text
                    style={[
                      gs.fs14,
                      {color: theme, fontFamily: ts.secondarymedium},
                    ]}>
                    Continue without coupon code
                  </Text>
                  <FontIcons
                    name="arrow-right-long"
                    style={[gs.fs16, gs.ml5, {color: theme}]}
                  />
                </Flex>
              </TouchableOpacity>
            </Center>
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
});
export default memo(CouponSheet);
