import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {gs} from '../../../../GlobalStyles';
import {Flex} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';
import {ts} from '../../../../ThemeStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {TextInput} from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import ThemeSepBtn from '../../../components/ThemeSepBtn';
import {inquiryData} from '../../../constants/Constant';

export default function Inquiries({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const renderItem = ({item}) => {
    return (
      <View style={{...styles.cardContainer,marginHorizontal:3}}>
        <View style={{...styles.detailscontainer,borderLeftColor:theme}}>
          <Text
            style={[
              gs.fs17,
              {color: ts.primarytext, fontFamily: ts.secondarymedium},
            ]}>
            {item.name}
          </Text>
          <Text
            style={[
              gs.fs13,
              {color: ts.secondarytext, fontFamily: ts.secondaryregular},
              gs.mv10,
            ]}>
            {item.detail}
          </Text>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-between">
            <Text
              style={[
                gs.fs13,
                {color: ts.secondarytext, fontFamily: ts.secondaryregular},
              ]}>
              {item.timing}
            </Text>
            <TouchableOpacity style={styles.phonecontainer}>
              <Flex direction="row" alignItems="center">
                <MaterialIcons name="phone" style={[gs.fs18,gs.mr5,{color:'#fff'}]}/>
                <Text
                  style={[
                    gs.fs14,
                    {color: '#fff', fontFamily: ts.secondarymedium},
                  ]}>
                  Call Now
                </Text>
              </Flex>
            </TouchableOpacity>
          </Flex>
        </View>
      </View>
    );
  };
  return (
    <ScreenWrapper>
      {/* =====HEADER======== */}
      <ThemeHeaderWrapper
        lefttxt="Inquiries"
        navigation={navigation}
        notifyIcon={false}
      />
      <View style={[{flex: 1, backgroundColor: '#fff'}, gs.pt15]}>
        <View style={[gs.ph15]}>
          <Flex direction="row" justifyContent="space-between">
            <View>
              <Text
                style={[
                  gs.fs23,
                  {color: ts.primarytext, fontFamily: ts.primarymedium},
                ]}>
                Customer Inquiries
              </Text>
              <Text
                style={[
                  gs.fs13,
                  {fontFamily: ts.secondaryregular, color: ts.secondarytext},
                  gs.mv7,
                ]}>
                All customers details listed below
              </Text>
            </View>
            <MaterialIcons
              name="calendar-month"
              style={[gs.fs26, {color: theme}]}
            />
          </Flex>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            style={[gs.mv10]}>
            <TextInput
              mode="outlined"
              label="Search Customers"
              outlineStyle={{borderRadius: 10}}
              activeOutlineColor={theme}
              returnKeyLabel="done"
              left={
                <TextInput.Icon
                  icon={() => <EvilIcons name="search" style={styles.icon} />}
                />
              }
              style={styles.input}
              outlineColor="#999"
            />
            <ThemeSepBtn
              width="28%"
              themecolor={theme}
              btntxt="Search"
              height={styles.input.height}
            />
          </Flex>
        </View>
        <FlatList
          keyExtractor={(item, index) => String(index)}
          data={inquiryData}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  icon: {
    fontSize: '24@ms',
    color: ts.secondarytext,
    top: '3@ms',
  },
  input: {
    width: '70%',
    color: ts.secondarytext,
    fontSize: '14@ms',
    height: '40@ms',
    backgroundColor:'#fff'
  },
  cardContainer: {
    padding: '15@ms',
    backgroundColor: '#f9f9f9',
    marginVertical: '3@ms',
    borderColor:'#ccc',
    borderWidth:0.5,
  },
  phonecontainer: {
    backgroundColor: ts.accent3,
    paddingHorizontal: '10@ms',
    paddingVertical: '5@ms',
    borderRadius: '10@ms',
  },
  detailscontainer:{
    borderLeftWidth:'4@ms',
    paddingLeft:'10@ms'
  }
});
