import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {gs} from '../../../GlobalStyles';
import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../../ThemeStyles';
import {TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Center} from 'native-base';
import ThemeSepBtn from '../../components/ThemeSepBtn';
import CredInputs from '../../components/CredInputs';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  GetOtp,
  getOtp,
  resendOtp,
  verifyOtp,
} from '../controllers/AuthControllers';
import {Formik} from 'formik';
import {registrationScheme} from '../../components/Validations';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
export default function Register() {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const type = flow == 'catering' ? 'Caterer' : 'Tiffin';
  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const dispatch = useDispatch();
  const {height, width} = Dimensions.get('screen');
  const [enableSubmitOtp, setEnableSubmitOtp] = useState(false);
  const navigation = useNavigation();
  const [timer, setTimer] = useState(30);
  const {getOtpData} = useSelector(state => state.auth);
  useFocusEffect(
    useCallback(() => {
      changeNavigationBarColor('#ffffff', true);
      return () => {
        changeNavigationBarColor('#ffffff', false);
      };
    }, []),
  );
  useEffect(() => {
    if (getOtpData?.status == 'success') {
      setEnableSubmitOtp(true);
    }
  }, [getOtpData]);

  useEffect(() => {
    let time;
    if (enableSubmitOtp) {
      time = setInterval(() => {
        setTimer(prevTimer => prevTimer > 0 ? prevTimer - 1 : 0);
      }, 1000);
    }
    return () => clearInterval(time);
  }, [enableSubmitOtp]);

  const handleResendOtp = values => {
    setTimer(30);
    setValue('');
    dispatch(resendOtp({phoneNumber: values.phoneNumber, type}));
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.heading]}>Create Account</Text>
      <Text style={styles.subtxt}>
        Let's get started by filling out the form below.
      </Text>
      <Formik
        initialValues={{name: '', phoneNumber: ''}}
        onSubmit={values => {
          dispatch(
            getOtp({name: values.name, phoneNumber: values.phoneNumber, type}),
          );
        }}
        validationSchema={registrationScheme}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          touched,
        }) => (
          <>
            <CredInputs
              name="name"
              label="   Enter your Name *"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
            />
            {errors.name && touched.name && (
              <Text style={[{color: 'red'}, gs.fs12, gs.mv5, gs.ml10]}>
                {errors.name}
              </Text>
            )}
            <CredInputs
              name="phoneNumber"
              label="   Enter your Phone Number *"
              keyboardType="numeric"
              maxLength={10}
              value={values.phoneNumber}
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
            />
            {errors.phoneNumber && touched.phoneNumber && (
              <Text style={[{color: 'red'}, gs.fs12, gs.mv5, gs.ml10]}>
                {errors.phoneNumber}
              </Text>
            )}
            {
              enableSubmitOtp &&
              <CodeField
              ref={ref}
              {...props}
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[
                    styles.cell,
                    isFocused && {...styles.focusCell, borderColor: theme},
                    index !== 5 && gs.mr10,
                  ]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
            }
            
            <Center>
              {!enableSubmitOtp ? (
                <TouchableOpacity onPress={handleSubmit} activeOpacity={0.7} style={[gs.mt20]}>
                  <ThemeSepBtn
                    btntxt="Get Otp"
                    themecolor={theme}
                    height={gs.h45.height}
                    width={width / 1.8}
                    border={50}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(
                      verifyOtp({
                        phoneNumber: values.phoneNumber,
                        otp: value,
                        type,
                        navigation,
                        setEnableSubmitOtp
                      }),
                    );
                  }}
                  activeOpacity={0.7}>
                  <ThemeSepBtn
                    btntxt="Verify Otp"
                    themecolor={theme}
                    height={gs.h45.height}
                    width={width / 1.8}
                    border={50}
                  />
                </TouchableOpacity>
              )}
              {enableSubmitOtp && timer > 0 && (
                <Text
                  style={[
                    gs.mv20,
                    {fontFamily: ts.secondaryregular, color: ts.secondarytext},
                    gs.fs13,
                  ]}>
                  resend otp in : {timer}
                </Text>
              )}
              {timer == 0 && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    handleResendOtp(values);
                  }}>
                  <Text
                    style={[
                      gs.mv20,
                      {
                        fontFamily: ts.secondaryregular,
                        color: theme,
                      },
                      gs.fs13,
                    ]}>
                    Resend Otp
                  </Text>
                </TouchableOpacity>
              )}
            </Center>
          </>
        )}
      </Formik>
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
    fontSize: '17@ms',
    fontFamily: ts.secondaryregular,
    color: ts.secondarytext,
    marginTop: '10@ms',
  },
  codeFieldRoot: {
    marginVertical: '25@ms',
  },
  cell: {
    width: '40@ms',
    height: '40@ms',
    lineHeight: '38@ms',
    fontSize: '24@ms',
    borderWidth: 1.5,
    borderColor: '#999',
    textAlign: 'center',
    color: ts.primarytext,
    borderRadius: 10,
  },
  focusCell: {
    borderWidth: 2,
  },
});
