import {View, Text} from 'react-native';
import React from 'react';
import { ts } from '../../ThemeStyles';
import { gs } from '../../GlobalStyles';
import { ScaledSheet } from 'react-native-size-matters';

export default function WhiteCoverBtn(props) {
  return (
    <View
      style={styles.btncontainer}>
      <Text style={[{
		fontFamily:'ReadexPro-Medium',
		color:props.color?props.color:ts.primary,
		},gs.fs15]}>{props.btntxt}</Text>
    </View>
  );
}
const styles=ScaledSheet.create({
  btncontainer:{
    height: '43@ms',
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '12@ms',
  }
})
