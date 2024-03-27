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
import {useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInput} from 'react-native-paper';

export default function Profile({navigation}) {
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
          <TextInput
            label="Enter Your Name"
            mode="outlined"
            style={styles.input}
            outlineColor={'#999'}
            activeOutlineColor={theme}
            outlineStyle={gs.br7}
          />
          <TextInput
            label="Enter Catering Service Name / Display Name"
            mode="outlined"
            style={styles.input}
            outlineColor={'#999'}
            activeOutlineColor={theme}
            outlineStyle={gs.br7}
          />
          <TextInput
            label="Company Phone Number"
            mode="outlined"
            style={styles.input}
            outlineColor={'#999'}
            activeOutlineColor={theme}
            outlineStyle={gs.br7}
          />
          <TextInput
            label="Add Landline number (Optional)"
            mode="outlined"
            style={styles.input}
            outlineColor={'#999'}
            activeOutlineColor={theme}
            outlineStyle={gs.br7}
          />
          <TextInput
            label="Add Landline number (Optional)"
            mode="outlined"
            style={styles.input}
            outlineColor={'#999'}
            activeOutlineColor={theme}
            outlineStyle={gs.br7}
          />
          <Center>
            <TouchableOpacity activeOpacity={0.7} style={[gs.mt15]} onPress={()=>{navigation.navigate('Kyc')}}>
              <ThemeSepBtn
                themecolor={theme}
                height={height / 18}
                width={width / 2.5}
                btntxt="NEXT"
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
