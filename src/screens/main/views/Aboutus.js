import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeader from '../../../components/ThemeHeader';
import {gs} from '../../../../GlobalStyles';
import {ts} from '../../../../ThemeStyles';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import {Flex} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';

export default function Aboutus({navigation}) {
  const data = [
    'About',
    'Cancellation & Refund Policy',
    'Privacy Policy',
    'Security Policy',
    'Terms & Conditions',
    'Disclaimer'
  ];
  return (
    <ScreenWrapper>
      <ThemeHeader lefttxt="About Us" navigation={navigation} />
      <ScrollView style={[gs.ph20, {flex: 1, backgroundColor: '#fff'}]}>
        <View style={[gs.mv10]}>
          <Text
            style={[
              gs.fs15,
              {fontFamily: ts.secondaryregular, color: '#555'},
              gs.fs13,
            ]}>
            Click to view
          </Text>
        </View>
        {data.map((e, i) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.cardlayout}
              key={i}
              onPress={() => {
                if (e == 'About') {
                  navigation.navigate('WebView', {
                    url: 'https://www.cateringsandtiffins.com/about',
                  });
                } else if (e == 'Privacy Policy') {
                  navigation.navigate('WebView', {
                    url: 'https://www.cateringsandtiffins.com/privacy-policy',
                  });
                } else if (e == 'Security Policy') {
                  navigation.navigate('WebView', {
                    url: 'https://www.cateringsandtiffins.com/security-policy',
                  });
                } else if (e == 'Terms & Conditions') {
                  navigation.navigate('WebView', {
                    url: 'https://www.cateringsandtiffins.com/terms-and-conditions',
                  });
                } else if (e == 'Disclaimer') {
                  navigation.navigate('WebView', {
                    url: 'https://www.cateringsandtiffins.com/disclaimer',
                  });
                }
                else if (e == 'Cancellation & Refund Policy') {
                  navigation.navigate('WebView', {
                    url: 'https://www.cateringsandtiffins.com/disclaimer',
                  });
                }
              }}>
              <Flex
                direction="row"
                alignItems="center"
                justifyContent="space-between">
                <Flex direction="row" alignItems="center">
                  <Text style={styles.cardtxt}>{e}</Text>
                </Flex>
                <EntypoIcons
                  name="chevron-small-right"
                  style={[gs.fs26, {color: ts.secondarytext}]}
                />
              </Flex>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  cardlayout: {
    height: '55@ms',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    paddingHorizontal: '15@ms',
    marginTop: '10@ms',
  },
  cardtxt: {
    fontSize: '15@ms',
    marginLeft: '10@ms',
    fontFamily: ts.secondaryregular,
    color: ts.primarytext,
  },
});
