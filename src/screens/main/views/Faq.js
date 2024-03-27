import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeader from '../../../components/ThemeHeader';
import EntypoIcons from 'react-native-vector-icons/Entypo'
import { ts } from '../../../../ThemeStyles';
import { gs } from '../../../../GlobalStyles';
import { Flex } from 'native-base';


export default function Faq({navigation}) {
const data=['How to book my Caterer ?','How to book my Tiffins ?','How to contact my Caterer ?','How to search for Branded ?','How to search for Popular ?']
  return (
    <ScreenWrapper>
      <ThemeHeader lefttxt="FAQ's" navigation={navigation} />
	  <View style={[{flex:1,backgroundColor:'#fff'},gs.ph20]}>
	  <View style={[gs.mv10]}>
          <Text
            style={[
              gs.fs15,
              {fontFamily: ts.secondaryregular, color: '#555'},
              gs.fs13,
            ]}>
            Click to view
          </Text>
        </View>
		{
			data.map((e,i)=>{
				return(
					<TouchableOpacity activeOpacity={0.7} style={styles.cardlayout} key={i}>
					<Flex
					  direction="row"
					  alignItems="center"
					  justifyContent="space-between">
					  <Flex direction="row" alignItems="center">
						<Text style={styles.cardtxt}>{e}</Text>
					  </Flex>
					  <EntypoIcons
						name="chevron-small-right"
						style={[gs.fs26, {color: ts.secondarytext}]}
					  />
					</Flex>
				  </TouchableOpacity>
				)
			})
		}
	  </View>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
	cardlayout: {
		height: '55@ms',
		borderColor: '#ddd',
		borderWidth: 1,
		borderRadius: 12,
		backgroundColor: '#fafafa',
		justifyContent: 'center',
		paddingHorizontal: '15@ms',
		marginTop: '10@ms',
	  },
	  cardtxt: {
		fontSize: '15@ms',
		marginLeft: '10@ms',
		fontFamily: ts.secondaryregular,
		color: ts.primarytext,
	  },
});
