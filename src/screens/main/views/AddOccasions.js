import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeader from '../../../components/ThemeHeader';
import {ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {ts} from '../../../../ThemeStyles';
import {gs} from '../../../../GlobalStyles';
import {occasion_data} from '../../../constants/Constant';
import {Flex} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Addbtn from '../../../components/Addbtn';

export default function AddOccasions({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity activeOpacity={0.7} style={styles.labelcontainer}>
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="space-between">
          <Flex direction="row" alignItems="center">
            <Image source={item.img} style={styles.img} resizeMode="cover" />
            <Text
              style={[
                gs.ml10,
                gs.fs15,
                {color: ts.primarytext, fontFamily: ts.secondaryregular},
              ]}>
              {item.name}
            </Text>
          </Flex>
          <MaterialIcons
            name="check-box"
            style={[gs.fs22, {...styles.checkicon, color: theme}]}
          />
        </Flex>
      </TouchableOpacity>
    );
  };
  return (
    <ScreenWrapper>
      <ThemeHeader
        lefttxt="Choose Occasions from below"
        navigation={navigation}
      />
      <View style={[{flex: 1, backgroundColor: '#fff'}, gs.pt10, gs.ph15]}>
        <FlatList
          keyExtractor={(item, index) => String(index)}
          data={occasion_data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[gs.mb20]}
        />
        <TouchableOpacity style={[gs.mb20]}>
          <Addbtn btntxt="Add Occasions" />
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  labelcontainer: {
    height: '60@ms',
    borderRadius: '10@ms',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderWidth: 0.5,
    borderColor: '#999',
    marginVertical: '5@ms',
    paddingHorizontal: '5@ms',
  },
  img: {
    height: '50@ms',
    width: '50@ms',
    borderRadius: '10@ms',
  },
  checkicon: {
    top: '2@ms',
    marginRight: '10@ms',
  },
});
