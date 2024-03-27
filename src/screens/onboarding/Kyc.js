import {View, Text, TouchableOpacity, useWindowDimensions} from 'react-native';
import React from 'react';
import OnboardCard from '../../components/OnboardCard';
import {ScaledSheet} from 'react-native-size-matters';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import {ts} from '../../../ThemeStyles';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import {gs} from '../../../GlobalStyles';
import {useSelector} from 'react-redux';
import {Center, Divider} from 'native-base';
import {TextInput} from 'react-native-paper';
import ThemeSepBtn from '../../components/ThemeSepBtn';
export default function Kyc({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const {height, width} = useWindowDimensions();
  return (
    <OnboardCard>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        showsVerticalScrollIndicator={false}
		>
        <Animatable.View style={styles.container} animation="fadeInUp">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}>
            <EntypoIcons
              name="chevron-small-left"
              style={[{color: theme}, gs.fs24, gs.h40]}
            />
          </TouchableOpacity>
          <Center>
            <Text style={[styles.heading]}>Add KYC & License Details</Text>
            <Divider style={[gs.mv15, {backgroundColor: theme}]} />
          </Center>
          <Text
            style={[
              gs.fs15,
              {fontFamily: ts.secondaryregular, color: ts.primarytext},
              gs.mb5,
            ]}>
            Aadhar Card Number *
          </Text>
          <TextInput
            mode="outlined"
            style={styles.input}
            outlineColor={'#999'}
            activeOutlineColor={theme}
            outlineStyle={gs.br7}
          />
          <Text
            style={[
              gs.fs15,
              {fontFamily: ts.secondaryregular, color: ts.primarytext},
              gs.mb5,
              gs.mt10,
            ]}>
            PAN Card Number *
          </Text>
          <TextInput
            mode="outlined"
            style={styles.input}
            outlineColor={'#999'}
            activeOutlineColor={theme}
            outlineStyle={gs.br7}
          />
          <Text
            style={[
              gs.fs15,
              {fontFamily: ts.secondaryregular, color: ts.primarytext},
              gs.mb5,
              gs.mt10,
            ]}>
            GSTIN Number
          </Text>
          <TextInput
            mode="outlined"
            style={styles.input}
            outlineColor={'#999'}
            activeOutlineColor={theme}
            outlineStyle={gs.br7}
          />
          <Text
            style={[
              gs.fs15,
              {fontFamily: ts.secondaryregular, color: ts.primarytext},
              gs.mb5,
              gs.mt10,
            ]}>
            FSSAI License Number
          </Text>
          <TextInput
            mode="outlined"
            style={styles.input}
            outlineColor={'#999'}
            activeOutlineColor={theme}
            outlineStyle={gs.br7}
          />
          <Center>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[gs.mt15]}
              onPress={() => {
                navigation.navigate('HomeStack');
              }}>
              <ThemeSepBtn
                themecolor={theme}
                height={height / 18}
                width={width / 2.5}
                btntxt="SUBMIT"
              />
            </TouchableOpacity>
          </Center>
        </Animatable.View>
      </KeyboardAwareScrollView>
    </OnboardCard>
  );
}
const styles = ScaledSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: '24@ms',
    color: ts.primarytext,
    fontFamily: ts.primarymedium,
  },
  subtxt: {
    fontSize: '12@ms',
    color: ts.secondarytext,
    fontFamily: ts.secondaryregular,
    marginVertical: '16@ms',
  },
  input: {
    height: '40@ms',
    backgroundColor: '#fff',
    fontSize: '13@ms',
    fontFamily: ts.secondaryregular,
    color: ts.primarytext,
    borderRadius: '12@ms',
    marginBottom: '10@ms',
  },
});
