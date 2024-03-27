import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { ScreenWrapper } from '../../../components/ScreenWrapper'
import ThemeHeader from '../../../components/ThemeHeader'
import { TextInput } from 'react-native-paper'
import { ScaledSheet } from 'react-native-size-matters'
import { ts } from '../../../../ThemeStyles'
import { useSelector } from 'react-redux'
import { gs } from '../../../../GlobalStyles'
import { Center } from 'native-base'
import ThemeSepBtn from '../../../components/ThemeSepBtn'

export default function HelpDesk({navigation}) {
	const flow = useSelector(state => state.common.flow);
	const theme = flow == 'catering' ? ts.secondary : ts.primary;
  return (
	<ScreenWrapper>
	 <ThemeHeader
        lefttxt="Helpdesk / Support"
        navigation={navigation}
      />
	    <View style={[gs.ph10,{flex:1,backgroundColor:'#fff'}]}>
          <Center>
            <Text
              style={[
                gs.fs21,
                {fontFamily: ts.primarymedium, color: ts.primarytext},
                gs.pv10,
              ]}>
              Raise a Ticket
            </Text>
          </Center>
          <TextInput
            placeholder="Issue"
            style={[{
              ...styles.issuecontainer,
            },gs.fs14,gs.br10]}
            placeholderTextColor="#777"
			activeOutlineColor={theme}
			mode='outlined'
			outlineColor='#999'
			outlineStyle={[gs.br12]}
          />
          <TextInput
            placeholder="Comments"
            style={[{
              ...styles.issuecontainer,
            },styles.comtcontainer,gs.fs14,gs.br10]}
            placeholderTextColor="#777"
            multiline
			textAlignVertical='top'
			numberOfLines={10}
			activeOutlineColor={theme}
			mode='outlined'
			outlineColor='#999'
			outlineStyle={[gs.br12]}
          />
		  <Center>
          <TouchableOpacity style={[gs.mt10,gs.h30]}>
            <ThemeSepBtn btntxt="Submit" themecolor={theme} height={'100%'} width={'30%'}/>
          </TouchableOpacity>
        </Center>
        </View>
	</ScreenWrapper>
  )
}
const styles=ScaledSheet.create({
	issuecontainer: {
		height: '45@ms',
		fontFamily: ts.secondarymedium,
		color: ts.primarytext,
		marginVertical: '5@ms',
		backgroundColor:'#fff'
	  },
	  comtcontainer:{
		height:'200@ms',
		textAlignVertical:'top'
	  }
})