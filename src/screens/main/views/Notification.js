import {View, Text,FlatList, Image} from 'react-native';
import React from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeader from '../../../components/ThemeHeader';
import { notifications } from '../../../constants/Constant';
import { gs } from '../../../../GlobalStyles';
import { useSelector } from 'react-redux';
import { ts } from '../../../../ThemeStyles';
import { ScaledSheet } from 'react-native-size-matters';
import { Flex } from 'native-base';
import { Divider } from 'react-native-paper';

export default function Notification({navigation}) {
	const flow = useSelector(state => state.common.flow);
	const theme = flow == 'catering' ? ts.secondary : ts.primary;
	const renderNotifications = ({item, index}) => {
		return (
		  <View style={[gs.mv10]}>
			<Flex
			  direction="row"
			  style={[{backgroundColor: (index == 0 || index == 1) && '#eee'},gs.p5]}>
			  <View>
				<Image source={item.img} style={styles.img} />
			  </View>
			  <View style={{width: '85%', marginLeft: 15}}>
				<Flex direction="row" justify="space-between">
				  <Text style={[styles.name, gs.fs15]}>{item.name}</Text>
				  <Text style={[styles.date, gs.fs11]}>{item.date}</Text>
				</Flex>
				<Text style={[{...styles.date, color: ts.secondary}, gs.fs11]}>
				  {item.username}
				</Text>
				<Text style={[{...styles.date}, gs.fs11]}>
				  {item.detail}
				</Text>
			  </View>
			</Flex>
			<Divider style={[gs.mt15]} />
		  </View>
		);
	  };
  return (
    <ScreenWrapper>
      <ThemeHeader lefttxt="Notifications" navigation={navigation} />
	  <View style={{flex:1,backgroundColor:'#fff'}}>
	  <FlatList
        data={notifications}
        renderItem={renderNotifications}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[gs.ph15, gs.mv15]}
      />
	  </View>
    </ScreenWrapper>
  );
}
const styles=ScaledSheet.create({
	img: {
		height: '35@ms',
		width: '35@ms',
		resizeMode: 'cover',
		borderRadius: '50@ms',
	  },
	  name: {
		fontFamily: ts.secondaryregular,
		lineHeight: '20@ms',
		color: ts.primarytext,
	  },
	  date: {
		fontFamily: ts.secondaryregular,
		lineHeight: '18@ms',
		color: ts.secondarytext,
	  },
})
