import {View, Text, FlatList, Image} from 'react-native';
import React, {useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {Flex} from 'native-base';
import {gs} from '../../../../GlobalStyles';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {ts} from '../../../../ThemeStyles';
import {review_data} from '../../../constants/Constant';

export default function Reviews({navigation}) {
  const data = [
    {label: 'Most relevant', value: 'Most relevant'},
    {label: 'Newest first', value: 'Newest first'},
    {label: 'Oldest first', value: 'Oldest first'},
  ];
  const [value, setValue] = useState(data[0].value);
  const [isFocus, setIsFocus] = useState(false);
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;

  const renderReviews = ({item}) => {
    return (
      <View style={styles.reviewcontainer}>
        <Flex direction="row" width={'100%'}>
          {/* ====PROFILE======= */}
          <View width={'10%'}>
            <Image source={item.img} style={styles.profileimg} alt="profile" />
          </View>
          <View width={'85%'} style={[gs.ml10]}>
            <Flex
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Text
                style={[
                  gs.fs15,
                  {color: ts.teritary, fontFamily: ts.secondaryregular},
                ]}>
                {item.name}
              </Text>
              <Text style={[gs.fs11,{color:theme,fontFamily:ts.secondaryregular}]}>{item.date}</Text>
            </Flex>
            <View style={[gs.mt10]}>
              <Text style={[gs.fs11,{color:ts.secondarytext,fontFamily:ts.secondaryregular}]}>{item.review}</Text>
            </View>
          </View>
        </Flex>
      </View>
    );
  };
  return (
    <ScreenWrapper>
      {/* =====HEADER======== */}
      <ThemeHeaderWrapper
        lefttxt="Customer Reviews"
        navigation={navigation}
        notifyIcon={false}
      />
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={[gs.mv20, gs.ph20]}>
          <Flex direction="row" alignItems="center">
            <Text
              style={[
                gs.fs13,
                {color: theme, fontFamily: ts.secondaryregular},
              ]}>
              Sort reviews by:
            </Text>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: theme}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select item' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </Flex>
        </View>
        <FlatList
          data={review_data}
          keyExtractor={(item, index) => String(index)}
          showsVerticalScrollIndicator={false}
          renderItem={renderReviews}
        />
      </View>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  container: {
    backgroundColor: 'white',
    padding: '16@ms',
  },
  dropdown: {
    height: '50@ms',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: '8@ms',
    paddingHorizontal: '8@ms',
    width: '180@ms',
    marginHorizontal: '15@ms',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: '22@ms',
    top: '8@ms',
    zIndex: '999@ms',
    paddingHorizontal: '8@ms',
    fontSize: '14@ms',
  },
  placeholderStyle: {
    fontSize: '16@ms',
  },
  selectedTextStyle: {
    fontSize: '14@ms',
    fontFamily: ts.secondaryregular,
    color: ts.primarytext,
  },
  iconStyle: {
    width: '20@ms',
    height: '20@ms',
  },
  inputSearchStyle: {
    height: '40@ms',
    fontSize: '16@ms',
  },
  profileimg: {
    height: '30@ms',
    width: '30@ms',
    borderRadius: 50,
    resizeMode: 'cover',
  },
  reviewcontainer: {
    paddingHorizontal: '20@ms',
    borderTopColor: '#eee',
    borderTopWidth: 1,
    paddingVertical: '15@ms',
  },
});
