import {View, Text, TouchableOpacity, useWindowDimensions} from 'react-native';
import React from 'react';
import OnboardCard from '../../components/OnboardCard';
import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../../ThemeStyles';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import ThemeSepBtn from '../../components/ThemeSepBtn';
import {Center} from 'native-base';
import {gs} from '../../../GlobalStyles';
import {useSelector, useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import {profileSchema} from '../../components/Validations';
import {profileUpdate} from '../controllers/AuthControllers';

export default function Profile({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const {height, width} = useWindowDimensions();
  const dispatch = useDispatch();
  return (
    <OnboardCard>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        showsVerticalScrollIndicator={false}>
        <Animatable.View
          style={styles.container}
          animation="fadeInUp"
          useNativeDriver={true}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}>
            <EntypoIcons
              name="chevron-small-left"
              style={[{color: theme}, gs.fs24, gs.h40]}
            />
          </TouchableOpacity>
          <Text style={[styles.heading]}>Profile Update</Text>
          <Text style={styles.subtxt}>
            Let's get started by filling out the form below.
          </Text>
          <Formik
            initialValues={{
              name: '',
              serviceName: '',
              companyPhone: '',
              landline1: '',
              landline2: '',
            }}
            onSubmit={values => {
              dispatch(
                profileUpdate({
                  serviceName: values.serviceName,
                  name: values.name,
                  companyPhone: values.companyPhone,
                  landline1: values.landline1,
                  landline2: values.landline2,
                  navigation,
                }),
              );
            }}
            validationSchema={profileSchema}>
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
                <TextInput
                  label="Enter Your Name"
                  mode="outlined"
                  style={styles.input}
                  outlineColor={'#999'}
                  activeOutlineColor={theme}
                  outlineStyle={gs.br7}
                  name="name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                />
                {errors.name && touched.name && (
                  <Text style={[{color: 'red'}, gs.fs12, gs.mb5, gs.ml10]}>
                    {errors.name}
                  </Text>
                )}
                <TextInput
                  label="Enter Catering Service Name / Display Name"
                  mode="outlined"
                  style={styles.input}
                  outlineColor={'#999'}
                  activeOutlineColor={theme}
                  outlineStyle={gs.br7}
                  name="serviceName"
                  value={values.serviceName}
                  onChangeText={handleChange('serviceName')}
                  onBlur={handleBlur('serviceName')}
                />
                {errors.serviceName && touched.serviceName && (
                  <Text style={[{color: 'red'}, gs.fs12, gs.mb5, gs.ml10]}>
                    {errors.serviceName}
                  </Text>
                )}
                <TextInput
                  label="Company Phone Number"
                  mode="outlined"
                  style={styles.input}
                  outlineColor={'#999'}
                  activeOutlineColor={theme}
                  outlineStyle={gs.br7}
                  keyboardType="numeric"
                  maxLength={10}
                  name="companyPhone"
                  value={values.companyPhone}
                  onChangeText={handleChange('companyPhone')}
                  onBlur={handleBlur('companyPhone')}
                />
                {errors.companyPhone && touched.companyPhone && (
                  <Text style={[{color: 'red'}, gs.fs12, gs.mb5, gs.ml10]}>
                    {errors.companyPhone}
                  </Text>
                )}
                <TextInput
                  label="Add Landline number (Optional)"
                  mode="outlined"
                  style={styles.input}
                  outlineColor={'#999'}
                  activeOutlineColor={theme}
                  outlineStyle={gs.br7}
                  keyboardType="numeric"
                  name="landline1"
                  value={values.landline1}
                  onChangeText={handleChange('landline1')}
                  onBlur={handleBlur('landline1')}
                />
                <TextInput
                  label="Add Whatsapp Business No. (Optional)"
                  mode="outlined"
                  style={styles.input}
                  outlineColor={'#999'}
                  activeOutlineColor={theme}
                  outlineStyle={gs.br7}
                  keyboardType="numeric"
                  name="landline2"
                  value={values.landline2}
                  onChangeText={handleChange('landline2')}
                  onBlur={handleBlur('landline2')}
                />
                <Center>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[gs.mt15]}
                    onPress={
                      //   () => {
                      //   navigation.navigate('Kyc');
                      // }
                      handleSubmit
                    }>
                    <ThemeSepBtn
                      themecolor={theme}
                      height={height / 18}
                      width={width / 2.5}
                      btntxt="NEXT"
                    />
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
    color: ts.primarytext,
    borderRadius: '12@ms',
    marginBottom: '10@ms',
  },
});
