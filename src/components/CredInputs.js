import {View, Text} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../ThemeStyles';
import {useSelector} from 'react-redux';
import {TextInput} from 'react-native-paper';

export default function CredInputs(props) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  return (
    <TextInput
      style={styles.input}
      mode="outlined"
      label={props.label}
      outlineStyle={{borderRadius: 40}}
      activeOutlineColor={theme}
      returnKeyLabel="done"
      right={props.right}
      keyboardType={props.keyboardType}
      value={props.value}
      onChangeText={props.onChangeText}
      defaultValue={props.defaultValue}
      maxLength={props.maxLength}
      onBlur={props.onBlur}
      name={props.name}
      secureTextEntry={props.secureTextEntry}
      textColor={ts.secondarytext}
    />
  );
}
const styles = ScaledSheet.create({
  input: {
    backgroundColor: '#fff',
    height: '55@ms',
    fontSize: '17@ms',
    fontFamily: ts.secondaryregular,
    marginTop: '10@ms',
  },
});
