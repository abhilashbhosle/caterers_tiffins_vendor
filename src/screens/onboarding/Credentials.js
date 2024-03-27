import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import OnboardCard from '../../components/OnboardCard';
import {ts} from '../../../ThemeStyles';
import {Flex} from 'native-base';
import {gs} from '../../../GlobalStyles';
import {useSelector} from 'react-redux';
import Register from './Register';
import Login from './Login';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';

export default function Credentials() {
  const {width, height} = useWindowDimensions('screen');
  const [selection, setSelection] = useState('register');
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;

  return (
    <OnboardCard>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        // enableAutomaticScroll={Platform.OS === 'ios'}
		enableAutomaticScroll={true}
        style={[gs.p20]}
        showsVerticalScrollIndicator={false}>
        <View>
          <Flex direction="row" align="center" justifyContent="space-around">
            <TouchableOpacity
              style={
                selection == 'register' && {
                  ...styles.underline,
                  borderBottomColor: theme,
                }
              }
              onPress={() => {
                setSelection('register');
              }}>
              <Text
                style={[
                  gs.fs16,
                  gs.pb9,
                  {
                    fontFamily: ts.primaryregular,
                    color: selection == 'register' ? ts.primarytext : 'grey',
                    textAlign: 'center',
                    width: width / 2.6,
                  },
                ]}>
                Register
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              TouchableOpacity
              style={
                selection == 'login' && {
                  ...styles.underline,
                  borderBottomColor: theme,
                }
              }
              onPress={() => {
                setSelection('login');
              }}>
              <Text
                style={[
                  gs.fs16,
                  gs.pb9,
                  {
                    fontFamily: ts.primaryregular,
                    color: selection == 'login' ? ts.primarytext : 'grey',
                    textAlign: 'center',
                    width: width / 2.6,
                  },
                ]}>
                Log In
              </Text>
            </TouchableOpacity>
          </Flex>
          {selection === 'register' ? (
            <Animatable.View animation="fadeInUp" useNativeDriver={true}>
              <Register />
            </Animatable.View>
          ) : (
            <Animatable.View animation="slideInUp" useNativeDriver={true}>
              <Login />
            </Animatable.View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </OnboardCard>
  );
}
const styles = ScaledSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#fff',
    marginBottom: '10@ms',
  },
  title: {
    fontFamily: ts.secondaryregular,
    fontSize: '15@ms',
  },
  underline: {
    borderBottomWidth: '2.5@ms',
  },
});
