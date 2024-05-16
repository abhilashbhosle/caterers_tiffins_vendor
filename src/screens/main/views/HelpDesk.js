import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeader from '../../../components/ThemeHeader';
import {TextInput} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../../../ThemeStyles';
import {useDispatch, useSelector} from 'react-redux';
import {gs} from '../../../../GlobalStyles';
import {Center} from 'native-base';
import ThemeSepBtn from '../../../components/ThemeSepBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFlow} from '../../../redux/slicers/CommomSlicer';
import {submitTicketService} from '../../services/HelpDeskService';

export default function HelpDesk({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const [help, setHelp] = useState({
    issue: '',
    comments: '',
  });
  const {height,width}=Dimensions.get('screen')
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      let flow = await AsyncStorage.getItem('flow');
      dispatch(getFlow(flow));
    })();
  }, []);
  const handleSubmit = async () => {
    let res = await submitTicketService({
      issue: help.issue,
      comments: help.comments,
      dispatch,
    });
    if (res.data.status == 'success') {
      setHelp({issue: '', comments: ''});
    }
    // console.log(res.data)
  };
  return (
    <ScreenWrapper>
      <ThemeHeader lefttxt="Helpdesk / Support" navigation={navigation} />
      <View
        style={[
          gs.ph10,
          {flex: 1, backgroundColor: '#fff', justifyContent: 'space-between'},
        ]}>
        <View>
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
            style={[
              {
                ...styles.issuecontainer,
              },
              gs.fs14,
              gs.br10,
            ]}
            placeholderTextColor="#777"
            activeOutlineColor={theme}
            mode="outlined"
            outlineColor="#999"
            outlineStyle={[gs.br12]}
            value={help.issue}
            onChangeText={text => setHelp({...help, issue: text})}
            textColor={ts.secondarytext}
          />
          <TextInput
            placeholder="Comments"
            style={[
              {
                ...styles.issuecontainer,
              },
              styles.comtcontainer,
              gs.fs14,
              gs.br10,
            ]}
            placeholderTextColor="#777"
            multiline
            textAlignVertical="top"
            numberOfLines={10}
            activeOutlineColor={theme}
            mode="outlined"
            outlineColor="#999"
            outlineStyle={[gs.br12]}
            value={help.comments}
            onChangeText={text => setHelp({...help, comments: text})}
            textColor={ts.secondarytext}
          />
        </View>
        <Center style={[gs.mb20,gs.pb20]}>
          <TouchableOpacity
            style={[gs.mt10, gs.h30]}
            activeOpacity={0.7}
            onPress={handleSubmit}>
            <ThemeSepBtn
              btntxt="Submit"
              themecolor={theme}
              height={gs.h40.height}
              width={width-40}
            />
          </TouchableOpacity>
        </Center>
      </View>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  issuecontainer: {
    height: '45@ms',
    fontFamily: ts.secondarymedium,
    color: ts.primarytext,
    marginVertical: '5@ms',
    backgroundColor: '#fff',
  },
  comtcontainer: {
    height: '200@ms',
    textAlignVertical: 'top',
  },
});
