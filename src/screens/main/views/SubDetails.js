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
import React, {memo} from 'react';
import {Actionsheet, Center, Flex, Modal, theme} from 'native-base';
import {ts} from '../../../../ThemeStyles';
import {gs} from '../../../../GlobalStyles';
import {ScaledSheet} from 'react-native-size-matters';
import FontIcons from 'react-native-vector-icons/FontAwesome6';
import {RAZORPAY_KEY} from '@env';
import RazorpayCheckout from 'react-native-razorpay';

function SubDetails({viewDetails, setViewDetails, plan, flow}) {
  const {height, width} = Dimensions.get('screen');
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  console.log(plan);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <Actionsheet
        isOpen={viewDetails}
        onClose={() => {
          setViewDetails(false);
        }}>
        <Actionsheet.Content
          style={[
            {
              backgroundColor: '#fff',
              height: height - 250,
            },
          ]}>
          <ScrollView style={{flex: 1}}>
            <View style={[gs.mh20, gs.mt10]}>
              <Text
                style={[{...styles.heading, color: ts.primarytext}, gs.mv3]}>
                Benifits:
              </Text>
              {plan?.benefits?.map((e, i) => (
                <Text
                  style={[{...styles.heading, color: ts.primarytext}, gs.mv3]}
                  key={i}>
                  - {e}
                </Text>
              ))}
            </View>
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </TouchableWithoutFeedback>
  );
}
const styles = ScaledSheet.create({
	heading: {
		fontSize: '13@ms',
		color: ts.secondarytext,
		fontFamily: ts.secondaryregular,
	  },
});
export default memo(SubDetails);
