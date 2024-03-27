import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../../ThemeStyles';
import {TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {Center} from 'native-base';
import ThemeSepBtn from '../../components/ThemeSepBtn';
import {gs} from '../../../GlobalStyles';
import CredInputs from '../../components/CredInputs';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function Login() {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const {height, width} = Dimensions.get('screen');
  return (
    <View style={styles.container}>
      <Text style={[styles.heading]}>Welcome Back</Text>
      <Text style={styles.subtxt}>
        Fill out the information below in order to access your account.
      </Text>
      <CredInputs label="   Company ID" />
      <CredInputs
        style={styles.input}
        label="   Password"
        right={<TextInput.Icon icon={()=><FeatherIcon name='eye' style={styles.icon}/>} />}
      />
      <Center style={[gs.mt20]}>
        <ThemeSepBtn
          btntxt="Get Otp"
          themecolor={theme}
          height={gs.h45.height}
          width={width / 1.8}
          border={50}
        />
        <Text
          style={[
            gs.mv20,
            {fontFamily: ts.secondaryregular, color: ts.secondarytext},
            gs.fs13,
          ]}>
          resend otp in : 30
        </Text>
      </Center>
    </View>
  );
}
const styles = ScaledSheet.create({
  container: {
    marginVertical: '40@ms',
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
    backgroundColor: '#fff',
    height: '55@ms',
    fontSize: '15@ms',
    fontFamily: ts.secondaryregular,
    color: ts.secondarytext,
    marginTop: '15@ms',
  },
  icon:{
	fontSize:'18@ms',
	color:ts.secondarytext,
	top:'5@ms'
  }
});
