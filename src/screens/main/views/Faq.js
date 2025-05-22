import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeader from '../../../components/ThemeHeader';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import {ts} from '../../../../ThemeStyles';
import {gs} from '../../../../GlobalStyles';
import {Flex} from 'native-base';
import {getFaqServices} from '../../services/FaqServices';
import { useDispatch, useSelector } from 'react-redux';

export default function Faq({navigation}) {
  const [faq, setFaq] = useState();
  const [extIndex, setExtIndex] = useState(-1);
  const dispatch=useDispatch()
   const flow = useSelector(state => state.common.flow);
  useEffect(() => {
    (async () => {
      try {
        let res = await getFaqServices(dispatch,flow=="catering"?"vendor-caterer":"vendor-tiffin");
        setFaq(res?.data?.data);
      } catch (err) {
        console.log('error in getfaq', err);
      }
    })();
  }, []);
  return (
    <ScreenWrapper>
      <ThemeHeader lefttxt="FAQ's" navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[{flex: 1, backgroundColor: '#fff'}, gs.ph20]}>
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
          {faq?.map((e, i) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.cardlayout}
                key={i}
                onPress={() => {
                  setExtIndex(prev=>prev==i?-1:i);
                }}>
                <Flex
                //   direction="row"
                //   alignItems="center"
                >
                  <Flex
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between">
                    <Text style={styles.cardtxt}>{e.question_text}</Text>
                    <EntypoIcons
                      name= {i==extIndex?"chevron-small-up":"chevron-small-down"}
                      style={[gs.fs26, {color: ts.secondarytext}]}
                    />
                  </Flex>

                  {extIndex == i ? (
                    <Text style={{...styles.cardtxt,color:ts.secondarytext,fontFamily:ts.secondaryregular}}>{e.answer_text}</Text>
                  ) : null}
                </Flex>
              </TouchableOpacity>
            );
          })}
          <View style={{height: 20}}></View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  cardlayout: {
    // height: '55@ms',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    padding: '15@ms',
    marginTop: '10@ms',
  },
  cardtxt: {
    fontSize: '15@ms',
    // marginLeft: '10@ms',
    fontFamily: ts.secondaryregular,
    color: ts.primarytext,
  },
});
