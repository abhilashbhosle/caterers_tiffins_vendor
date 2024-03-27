import {View, Text, ScrollView, Dimensions, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {gs} from '../../../GlobalStyles';
import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../../ThemeStyles';
import {TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Center} from 'native-base';
import ThemeSepBtn from '../../components/ThemeSepBtn';
import CredInputs from '../../components/CredInputs';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const {height, width} = Dimensions.get('screen');
  const navigation=useNavigation()

  return (
    <View style={styles.container}>
      <Text style={[styles.heading]}>Create Account</Text>
      <Text style={styles.subtxt}>
        Let's get started by filling out the form below.
      </Text>
      <CredInputs
        label="   Enter your Phone Number"
      />
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
      <Center>
        <TouchableOpacity onPress={()=>navigation.navigate('Location')} activeOpacity={0.7}>
        <ThemeSepBtn
          btntxt="Get Otp"
          themecolor={theme}
          height={gs.h45.height}
          width={width / 1.8}
          border={50}
        />
        </TouchableOpacity>
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
