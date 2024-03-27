import {
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {memo} from 'react';
import {ts} from '../../ThemeStyles';
import {gs} from '../../GlobalStyles';
import {Flex} from 'native-base';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function ThemeHeaderWrapper(props) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  return (
    <View style={{backgroundColor: theme}}>
      <SafeAreaView>
        <View style={styles.header}>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-between">
            <Flex direction="row" alignItems="center">
              <TouchableOpacity
                onPress={() => {
                  props.navigation.openDrawer();
                }}>
                <IonIcons name="menu" style={[gs.fs26, {color: '#fff'}]} />
              </TouchableOpacity>
              <Text
                style={[
                  gs.fs22,
                  {color: '#fff', fontFamily: ts.primaryregular},
                  gs.ml10,
                ]}>
                {props.lefttxt}
              </Text>
            </Flex>
            {props.notifyIcon && (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('PageStack', {
                    screen: 'Notification',
                  })
                }>
                <MaterialIcons
                  name="notifications-none"
                  style={[gs.fs26, {color: '#fff'}]}
                />
              </TouchableOpacity>
            )}
          </Flex>
        </View>
      </SafeAreaView>
    </View>
  );
}
export default memo(ThemeHeaderWrapper);
const styles = ScaledSheet.create({
  header: {
    paddingTop:
      Platform.OS === 'android' ? StatusBar.currentHeight + 15 : '10@ms',
    paddingBottom: '20@ms',
    paddingHorizontal: '20@ms',
  },
});
