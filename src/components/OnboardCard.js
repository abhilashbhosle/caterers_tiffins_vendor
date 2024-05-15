import {View, Text, useWindowDimensions, Platform} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';
import {Center} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';
import {gs} from '../../GlobalStyles';
import * as Animatable from 'react-native-animatable';

export default function OnboardCard(props) {
  const {width, height} = useWindowDimensions('screen');
  return (
    <View style={{...styles.container, height: height, width}}>
      <Center>
        <Animatable.View animation="slideInUp">
          <Card
            style={[
              {
                height:Platform.OS=='ios'?height/1.45: height / 1.3,
                backgroundColor: '#fff',
                width: width - 30,
              },
              gs.br12,
            ]}>
            {props.children}
          </Card>
        </Animatable.View>
      </Center>
    </View>
  );
}
const styles = ScaledSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#fff',
    marginBottom: '10@ms',
  },
});
