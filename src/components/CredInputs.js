import {View, Text} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../ThemeStyles';
import {useSelector} from 'react-redux';
import { TextInput } from 'react-native-paper';

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
    />
  );
}
const styles = ScaledSheet.create({
  input: {
    backgroundColor: '#fff',
    height: '55@ms',
    fontSize: '17@ms',
    fontFamily: ts.secondaryregular,
    color: ts.secondarytext,
    marginTop: '10@ms',
  },
});
