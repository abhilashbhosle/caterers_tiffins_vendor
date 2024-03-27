import {View, Text, FlatList, useWindowDimensions,TouchableOpacity} from 'react-native';
import React from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {gs} from '../../../../GlobalStyles';
import {branch_data} from '../../../constants/Constant';
import {ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {ts} from '../../../../ThemeStyles';
import {Card} from 'react-native-paper';
import {Flex} from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Addbtn from '../../../components/Addbtn';

export default function Branches({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const {height, width} = useWindowDimensions();
  const renderItem = ({item}) => {
    return (
      <Card style={styles.cardItem}>
        <Card.Content>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            style={[gs.mb10]}>
            <Flex direction="row" alignItems="center">
              <Text
                style={[
                  gs.fs14,
                  {
                    fontFamily: ts.secondaryregular,
                    color: item.status == 'Active' ? ts.accent3 : ts.accent4,
                  },
                ]}>
                {item.status}
              </Text>
              <FontAwesomeIcon
                name="toggle-on"
                style={[
                  gs.ml10,
                  {
                    ...styles.toggleIcon,
                    color: item.status === 'Active' ? ts.accent3 : ts.accent4,
                  },
                ]}
              />
            </Flex>
            <MaterialIcons name="edit" style={[gs.fs24, {color: theme}]} />
          </Flex>
          <Text
            style={[
              gs.fs22,
              {color: ts.primarytext, fontFamily: ts.primarymedium},
              gs.mv10,
            ]}>
            {item.title}
          </Text>
          <Text
            style={[
              gs.fs15,
              {color: ts.primarytext, fontFamily: ts.secondaryregular},
              gs.mb7,
            ]}>
            {item.name}
          </Text>
          <Text
            style={[
              gs.fs15,
              {color: ts.primarytext, fontFamily: ts.secondaryregular},
              gs.mb7,
            ]}>
            {item.phone}
          </Text>
          <Text
            style={[
              gs.fs13,
              {color: ts.primarytext, fontFamily: ts.secondaryregular,lineHeight:gs.mb20.marginBottom},
              gs.mb5,
            ]}>
            {item.address}
          </Text>
        </Card.Content>
      </Card>
    );
  };
  return (
    <ScreenWrapper>
      {/* =====HEADER======== */}
      <ThemeHeaderWrapper
        lefttxt="Branches"
        navigation={navigation}
        notifyIcon={false}
      />
      <View style={[{flex: 1, backgroundColor: '#fff'}, gs.pt20]}>
        <FlatList
          keyExtractor={(item, index) => String(index)}
          data={branch_data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity style={[gs.mb20,gs.ph20]}  onPress={()=>navigation.navigate('PageStack', {
            screen: 'AddBranch',
          })}>
        <Addbtn btntxt="Add New Branch" />
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  cardItem: {
    backgroundColor: '#fff',
    marginBottom: '15@ms',
    marginHorizontal: '10@ms',
  },
  toggleIcon: {
    fontSize: '40@ms',
  },
});
