import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../../ThemeStyles';
import {TextInput} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {Center} from 'native-base';
import ThemeSepBtn from '../../components/ThemeSepBtn';
import {gs} from '../../../GlobalStyles';
import CredInputs from '../../components/CredInputs';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {loginSchema} from '../../components/Validations';
import {
  getLoginOtp,
  resendLoginOtp,
  verifyLoginOtp,
} from '../controllers/AuthControllers';
import {resendLoginOtpService} from '../services/AuthServices';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

export default function Login() {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const {height, width} = Dimensions.get('screen');
  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const [hidepw, setHidepw] = useState(true);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [enableSubmitOtp, setEnableSubmitOtp] = useState(false);
  const navigation = useNavigation();
  const [timer, setTimer] = useState(30);
  const {getLoginOtpData} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      changeNavigationBarColor('#ffffff', true);
      return () => {
        changeNavigationBarColor('#ffffff', false);
      };
    }, []),
  );

  useEffect(() => {
    if (getLoginOtpData?.status == 'success') {
      setEnableSubmitOtp(true);
    }
  }, [getLoginOtpData]);

  useEffect(() => {
    let time;
    if (enableSubmitOtp) {
      time = setInterval(() => {
        setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(time);
  }, [enableSubmitOtp]);

  const handleResendOtp = values => {
    setTimer(30);
    setValue('');
    dispatch(
      resendLoginOtp({companyId: values.companyId, password: values.password}),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.heading]}>Welcome Back</Text>
      <Text style={styles.subtxt}>
        Fill out the information below in order to access your account.
      </Text>
      <Formik
        initialValues={{companyId: '', password: ''}}
        onSubmit={values => {
          dispatch(
            getLoginOtp({
              companyId: values.companyId,
              password: values.password,
              vendor_type: flow == 'catering' ? 'Caterer' : 'Tiffin',
            }),
          );
        }}
        validationSchema={loginSchema}>
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
              label="   Company ID"
              name="companyId"
              value={values.companyId}
              onChangeText={handleChange('companyId')}
              onBlur={handleBlur('companyId')}
            />
            {errors.companyId && touched.companyId && (
              <Text style={[{color: 'red'}, gs.fs12, gs.mv5, gs.ml10]}>
                {errors.companyId}
              </Text>
            )}
            <CredInputs
              style={styles.input}
              label="   Password"
              right={
                <TextInput.Icon
                  icon={() => (
                    <TouchableOpacity
                      onPress={() => {
                        setHidepw(!hidepw);
                      }}
                      activeOpacity={0.7}>
                      <FeatherIcon
                        name={hidepw ? 'eye-off' : 'eye'}
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  )}
                />
              }
              secureTextEntry={hidepw}
              name="password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
            />
            {errors.password && touched.password && (
              <Text style={[{color: 'red'}, gs.fs12, gs.mv5, gs.ml10]}>
                {errors.password}
              </Text>
            )}
            {enableSubmitOtp ? (
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
            ) : (
              <View style={[gs.mt20]}></View>
            )}

            <Center>
              {!enableSubmitOtp ? (
                <TouchableOpacity onPress={handleSubmit} activeOpacity={0.7}>
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
                      verifyLoginOtp({
                        companyId: values.companyId,
                        otp: value,
                        navigation,
                        setEnableSubmitOtp,
                        vendor_type: flow == 'catering' ? 'Caterer' : 'Tiffin',
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
    fontSize: '15@ms',
    fontFamily: ts.secondaryregular,
    color: ts.secondarytext,
    marginTop: '15@ms',
  },
  icon: {
    fontSize: '18@ms',
    color: ts.secondarytext,
    top: '5@ms',
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
