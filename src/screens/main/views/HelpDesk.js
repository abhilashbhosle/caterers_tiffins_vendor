import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeader from '../../../components/ThemeHeader';
import {Card, TextInput} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../../../ThemeStyles';
import {useDispatch, useSelector} from 'react-redux';
import {gs} from '../../../../GlobalStyles';
import {Center, Flex} from 'native-base';
import ThemeSepBtn from '../../../components/ThemeSepBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFlow} from '../../../redux/slicers/CommomSlicer';
import {
  getTicketsService,
  submitTicketService,
} from '../../services/HelpDeskService';
import moment from 'moment';

export default function HelpDesk({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const [help, setHelp] = useState({
    issue: '',
    comments: '',
  });
  const {height, width} = Dimensions.get('screen');
  const dispatch = useDispatch();
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    (async () => {
      let flow = await AsyncStorage.getItem('flow');
      dispatch(getFlow(flow));
      getTickets();
    })();
  }, []);
  let getTickets = async () => {
    try {
      let res = await getTicketsService({dispatch});
      console.log('ticket service', res.data);
      setTickets(res.data.data);
    } catch (error) {
      console.log('error in get tickets');
    }
  };
  const handleSubmit = async () => {
    let res = await submitTicketService({
      issue: help.issue,
      comments: help.comments,
      dispatch,
    });
    if (res.data.status == 'success') {
      setTimeout(()=>{
        getTickets();
      },500)
      setHelp({issue: '', comments: ''});
    }

    // console.log(res.data)
  };
  return (
    <ScreenWrapper>
      <ThemeHeader lefttxt="Helpdesk / Support" navigation={navigation} />
      <ScrollView style={[gs.ph10, {flex: 1, backgroundColor: '#fff'}]}>
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
        <Center style={[gs.mb20, gs.pb20]}>
          <TouchableOpacity
            style={[gs.mt10, gs.h30]}
            activeOpacity={0.7}
            onPress={handleSubmit}>
            <ThemeSepBtn
              btntxt="Submit"
              themecolor={theme}
              height={gs.h40.height}
              width={width - 40}
            />
          </TouchableOpacity>
        </Center>
        <Center>
          {
            tickets?.length &&
            <Text
            style={[
              gs.fs21,
              {fontFamily: ts.primarymedium, color: ts.primarytext},
              gs.pv10,
            ]}>
            My Tickets
          </Text>
          }
          
        </Center>
        {tickets?.map((e, i) => {
          return (
            <Card key={i} style={[{backgroundColor:'#fff'},gs.mv10,gs.mh5]}>
              <Card.Content>
              <Flex direction='row' justifyContent='space-between' align='center'>
              <Text style={[gs.fs18,{color:ts.primarytext,fontFamily:ts.primarymedium}]}>{e?.issue}</Text>
              <View style={styles.statusbtn}>
                <Text style={[gs.fs16,{color:'#0288d1',fontFamily:ts.primarymedium}]}>{e.status}</Text>
              </View>
              </Flex>
              <Text style={[gs.fs16,{color:ts.secondarytext,fontFamily:ts.primaryregular},gs.mv5]}>{e?.comments}</Text>
              <Text style={[gs.fs14,{color:ts.secondarytext,fontFamily:ts.primaryregular},gs.mt10]}>{moment(e?.raised_on).format("DD/MM/YYYY, hh:mm:ss")}</Text>
              </Card.Content>
            </Card>
          );
        })}
      </ScrollView>
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
  statusbtn:{
    height:'35@ms',
    width:'80@ms',
    borderWidth:1,
    borderColor:'#0288d1',
    borderRadius:'15@ms',
    justifyContent:'center',
    alignItems:'center'
  }
});
