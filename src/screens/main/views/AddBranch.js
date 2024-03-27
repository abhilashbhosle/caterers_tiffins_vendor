import {View, Text, useWindowDimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeader from '../../../components/ThemeHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {gs} from '../../../../GlobalStyles';
import {useSelector} from 'react-redux';
import {ts} from '../../../../ThemeStyles';
import {ScaledSheet} from 'react-native-size-matters';
import {TextInput} from 'react-native-paper';
import Updatebtn from '../../../components/Updatebtn';

export default function AddBranch({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const {height, width} = useWindowDimensions();
  return (
    <ScreenWrapper>
      <ThemeHeader
        lefttxt="Enter your New Branch Details"
        navigation={navigation}
      />
      <KeyboardAwareScrollView
        style={[{flex: 1, backgroundColor: '#fff'}, gs.ph20]}
        enableOnAndroid
		showsVerticalScrollIndicator={false}
		>
        <View style={[gs.mt20]}>
          <TextInput
            style={{...styles.input}}
            outlineColor={ts.secondarytext}
            activeOutlineColor={theme}
            mode="outlined"
            outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
            label="Catering Service Name"
          />
		   <TextInput
            style={{...styles.input}}
            outlineColor={ts.secondarytext}
            activeOutlineColor={theme}
            mode="outlined"
            outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
            label="Contact Person Name"
          />
		   <TextInput
            style={{...styles.input}}
            outlineColor={ts.secondarytext}
            activeOutlineColor={theme}
            mode="outlined"
            outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
            label="Phone Number"
          />
		   <TextInput
            style={{...styles.input}}
            outlineColor={ts.secondarytext}
            activeOutlineColor={theme}
            mode="outlined"
            outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
            label="Street Name"
          />
		    <TextInput
            style={{...styles.input}}
            outlineColor={ts.secondarytext}
            activeOutlineColor={theme}
            mode="outlined"
            outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
            label="Area"
          />
		   <TextInput
            style={{...styles.input}}
            outlineColor={ts.secondarytext}
            activeOutlineColor={theme}
            mode="outlined"
            outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
            label="City"
          />
		   <TextInput
            style={{...styles.input}}
            outlineColor={ts.secondarytext}
            activeOutlineColor={theme}
            mode="outlined"
            outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
            label="PinCode"
          />
		   <TextInput
            style={{...styles.input}}
            outlineColor={ts.secondarytext}
            activeOutlineColor={theme}
            mode="outlined"
            outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
            label="Map Location Link"
          />
		  <TouchableOpacity style={[gs.mt20]}>
			<Updatebtn btntxt='Submit'/>
		  </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  input: {
    color: ts.secondarytext,
    fontSize: '12@ms',
    fontFamily: ts.secondaryregular,
    height: '40@ms',
    backgroundColor: '#fff',
	marginBottom:'10@ms'
  },
});
