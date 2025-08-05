import {View, Text, TouchableOpacity, useWindowDimensions} from 'react-native';
import React, { useCallback } from 'react';
import OnboardCard from '../../components/OnboardCard';
import {ScaledSheet} from 'react-native-size-matters';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import {ts} from '../../../ThemeStyles';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import {gs} from '../../../GlobalStyles';
import {useSelector, useDispatch} from 'react-redux';
import {Center, Divider} from 'native-base';
import {TextInput} from 'react-native-paper';
import ThemeSepBtn from '../../components/ThemeSepBtn';
import {Formik} from 'formik';
import {kycShema} from '../../components/Validations';
import {kycUpdate} from '../controllers/AuthControllers';
import { useFocusEffect } from '@react-navigation/native';
// import changeNavigationBarColor from 'react-native-navigation-bar-color';

export default function Kyc({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const dispatch = useDispatch();
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const {height, width} = useWindowDimensions();
  useFocusEffect(
    useCallback(() => {

        // changeNavigationBarColor('#000000', true); 
    }, [])
  );
  return (
    <OnboardCard>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        showsVerticalScrollIndicator={false}>
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
            <Text style={[styles.heading]}>Add License Details</Text>
            <Divider style={[gs.mv15, {backgroundColor: theme}]} />
          </Center>
          <Formik
            initialValues={{
              // aadharNo: '',
              // panNo: '',
              // gstinNo: '',
              fssaiNo: '',
            }}
            onSubmit={values => {
              dispatch(
                kycUpdate({
                  // aadharNo: values.aadharNo,
                  // panNo:values.panNo,
                  // gstinNo:values.gstinNo,
                  fssaiNo: values.fssaiNo,
                  navigation,
                }),
              );
            }}
            validationSchema={kycShema}>
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
                {/* <Text
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
                  name="aadharNo"
                  value={values.aadharNo}
                  onChangeText={handleChange('aadharNo')}
                  onBlur={handleBlur('aadharNo')}
                  maxLength={12}
                  keyboardType='numeric'
                  textColor={ts.primarytext}
                />
                {errors.aadharNo && touched.aadharNo && (
                  <Text style={[{color: 'red'}, gs.fs12, gs.mb5, gs.ml10]}>
                    {errors.aadharNo}
                  </Text>
                )} */}
                {/* <Text
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
                  name="panNo"
                  value={values.panNo}
                  onChangeText={handleChange('panNo')}
                  onBlur={handleBlur('panNo')}
                  maxLength={10}
                  textColor={ts.primarytext}
                />
                {errors.panNo && touched.panNo && (
                  <Text style={[{color: 'red'}, gs.fs12, gs.mb5, gs.ml10]}>
                    {errors.panNo}
                  </Text>
                )}
                <Text
                  style={[
                    gs.fs15,
                    {fontFamily: ts.secondaryregular, color: ts.primarytext},
                    gs.mb5,
                    gs.mt10,
                  ]}>
                  GSTIN Number (Optional)
                </Text>
                <TextInput
                  mode="outlined"
                  style={styles.input}
                  outlineColor={'#999'}
                  activeOutlineColor={theme}
                  outlineStyle={gs.br7}
                  name="gstinNo"
                  value={values.gstinNo}
                  onChangeText={handleChange('gstinNo')}
                  onBlur={handleBlur('gstinNo')}
                  maxLength={15}
                  textColor={ts.primarytext}
                />
                 {errors.gstinNo && touched.gstinNo && (
                  <Text style={[{color: 'red'}, gs.fs12, gs.mb5, gs.ml10]}>
                    {errors.gstinNo}
                  </Text>
                )} */}
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
                  name="fssaiNo"
                  value={values.fssaiNo}
                  onChangeText={handleChange('fssaiNo')}
                  onBlur={handleBlur('fssaiNo')}
                  textColor={ts.primarytext}
                  maxLength={14}
                  keyboardType="numeric"
                />
                {errors.fssaiNo && touched.fssaiNo && (
                  <Text style={[{color: 'red'}, gs.fs12, gs.mb5, gs.ml10]}>
                    {errors.fssaiNo}
                  </Text>
                )}
                <Center>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[gs.mt15]}
                    onPress={
                      handleSubmit
                      // () => {
                      // navigation.navigate('HomeStack');
                      // }
                    }>
                    <ThemeSepBtn
                      themecolor={theme}
                      height={height / 18}
                      width={width / 2.5}
                      btntxt="SUBMIT"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('HomeStack');
                    }}>
                    <Text style={[{...styles.subtxt, color: theme}, gs.fs15]}>
                      skip
                    </Text>
                  </TouchableOpacity>
                </Center>
              </>
            )}
          </Formik>
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
    // color: ts.primarytext,
    borderRadius: '12@ms',
    marginBottom: '10@ms',
  },
});
