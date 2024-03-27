import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import OnboardCard from '../../components/OnboardCard';
import {ScaledSheet} from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';
import {ts} from '../../../ThemeStyles';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import {gs} from '../../../GlobalStyles';
import {useSelector} from 'react-redux';
import {TextInput} from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default function ManualLocation({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const {height, width} = useWindowDimensions();
  return (
    <OnboardCard>
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
        <Text style={[styles.heading]}>Enter your area or address</Text>
        <TextInput
          label="Try A2B, Mg road, Bangalore, etc."
          mode="outlined"
          style={styles.input}
          outlineColor="#999"
          activeOutlineColor={theme}
          outlineStyle={{borderRadius: 8}}
          left={
            <TextInput.Icon
              icon={() => <EvilIcons name="search" style={styles.icon} />}
            />
          }
        />
      </Animatable.View>
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
    marginVertical: '10@ms',
  },
  icon:{
	fontSize:'22@ms',
	top:'2@ms'
  }
});
