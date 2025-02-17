import {View, Text, SafeAreaView, StatusBar,TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
import { gs } from '../../../../GlobalStyles';
import { ts } from '../../../../ThemeStyles';

export const Webview = ({navigation, route}) => {
  const {url} = route.params;
  return (
    <View style={{flex: 1,paddingTop:Platform.OS=='android'? StatusBar.currentHeight:40,backgroundColor:ts.secondary}}>
		<TouchableOpacity style={[gs.p10]} onPress={()=>navigation.goBack()}>
		<Text style={[gs.fs12,{color:'#fff',fontFamily:ts.jakartamedium}]}>{"<"} Back</Text>	
		</TouchableOpacity>	
      <WebView source={{uri: url}}  />
    </View>
  );
};
