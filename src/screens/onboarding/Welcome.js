import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
  StatusBar,
  Platform,
  Easing,
} from 'react-native';
import React from 'react';
import {ScreenWrapper} from '../../components/ScreenWrapper';
import ThemeWrapper from '../../components/ThemeWrapper';
import {ScaledSheet} from 'react-native-size-matters';
import {gs} from '../../../GlobalStyles';
import {ts} from '../../../ThemeStyles';
import {Card} from 'react-native-paper';
import {Center, Divider} from 'native-base';
import ThemeSepBtn from '../../components/ThemeSepBtn';
import * as Animatable from 'react-native-animatable';
import { setFlow } from '../controllers/WelcomeController';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Welcome({navigation}) {
  const {height, width} = Dimensions.get('screen');
  const dispatch=useDispatch()
  const fadeIn = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };
  return (
    <ScreenWrapper>
      <ThemeWrapper>
        <SafeAreaView>
          <View
            style={[
              {
                ...styles.container,
                height,
                marginTop: Platform.OS == 'android' && StatusBar.currentHeight,
              },
              gs.ph15,
            ]}>
            <View>
              <Animatable.Text
                style={[
                  styles.heading,
                  {fontFamily: ts.primaryregular, color: '#fff'},
                  gs.mt20,
                ]}
                animation={fadeIn}>
                Caterings & Tiffins
              </Animatable.Text>
            </View>
            <Animatable.View animation="fadeInUp" duration={1000}>
              <Card style={[styles.bottomcard, gs.p20]}>
                <Center>
                  <Text
                    style={[
                      gs.pv20,
                      gs.fs21,
                      {fontFamily: ts.primarymedium, color: ts.primarytext},
                    ]}>
                    Welcome to Caterings & Tiffins
                  </Text>
                  <Divider />
                  <Text
                    style={[
                      gs.fs14,
                      gs.pb15,
                      gs.pt20,
                      {color: ts.primarytext, fontFamily: ts.secondaryregular},
                    ]}>
                    Please choose your service
                  </Text>
                  <TouchableWithoutFeedback onPress={()=>{
                    setFlow('catering',dispatch,navigation)
                    AsyncStorage.setItem('flow','catering')
                    }}>
                    <View style={[gs.mv15]}>
                      <ThemeSepBtn
                        btntxt="Catering Service"
                        themecolor={ts.secondary}
                        width={width / 2}
                        height={height / 17}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={()=>{
                    setFlow('tiffin',dispatch,navigation)
                    AsyncStorage.setItem('flow','tiffin')
                    }}>
                    <View style={[gs.mb20]}>
                      <ThemeSepBtn
                        btntxt="Tiffin Service"
                        themecolor={ts.primary}
                        width={width / 2}
                        height={height / 17}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </Center>
              </Card>
            </Animatable.View>
          </View>
        </SafeAreaView>
      </ThemeWrapper>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: '60@ms',
  },
  bottomcard: {
    marginBottom: '120@ms',
    backgroundColor:'#fff'
  },
});
