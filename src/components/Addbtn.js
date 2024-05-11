import {View, Text} from 'react-native';
import React from 'react';
import {Center, Flex} from 'native-base';
import {ts} from '../../ThemeStyles';
import {gs} from '../../GlobalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Addbtn(props) {
  return (
    <Center>
      <View
        style={[
          {
            backgroundColor: ts.accent3,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {x: 0, y: 1},
            shadowOpacity: 0.5,
            shadowRadius: 2,
          },
          gs.pv10,
          gs.br10,
        ]}>
        <Flex direction="row" alignItems="center">
          <MaterialIcons
            name="add"
            style={[gs.fs24, {color: '#fff'}, gs.mr10]}
          />
          <Text
            style={[gs.fs15, {color: '#fff', fontFamily: ts.secondarymedium}]}>
            {props.btntxt}
          </Text>
        </Flex>
      </View>
    </Center>
  );
}
