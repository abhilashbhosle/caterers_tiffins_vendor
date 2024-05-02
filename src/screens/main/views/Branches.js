import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {gs} from '../../../../GlobalStyles';
import {branch_data} from '../../../constants/Constant';
import {ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {ts} from '../../../../ThemeStyles';
import {Card} from 'react-native-paper';
import {Flex} from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Addbtn from '../../../components/Addbtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFlow} from '../../../redux/slicers/CommomSlicer';
import {getBranch} from '../../controllers/BranchController';
import {useFocusEffect} from '@react-navigation/native';
import {updateStatusService} from '../../services/BranchService';

export default function Branches({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const {height, width} = useWindowDimensions();
  const dispatch = useDispatch();
  const branch = useSelector(state => state.branch.branch);
  const [branches, setBranches] = useState(branch);
  // console.log(branch)
  useFocusEffect(
    useCallback(() => {
      dispatch(getBranch());
    }, []),
  );
  useEffect(() => {
    (async () => {
      let flow = await AsyncStorage.getItem('flow');
      dispatch(getFlow(flow));
    })();
  }, []);
  useEffect(() => {
    if (branch?.length > 0) {
      setBranches(branch);
      
    }
  }, [branch]);
  const handleToggle = item => {
    let id = item.id;
    let status = item?.status == 'active' || item.status== 1 ? 0 : 1;
    // console.log(status)
    updateStatusService({id, status, dispatch});
  };
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
                    color:
                      item.status == 'active' ||item.status== 1 ? ts.accent3 : ts.accent4,
                  },
                ]}>
                {item?.status == 'active' || item.status==1 ? 'Active' : 'InActive'}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleToggle(item)}>
                <FontAwesomeIcon
                  name={
                    item?.status === 'active' || item.status==1  ? 'toggle-on' : 'toggle-off'
                  }
                  style={[
                    gs.ml10,
                    {
                      ...styles.toggleIcon,
                      color:
                        item?.status === 'active' || item.status==1 
                          ? ts.accent3
                          : ts.accent4,
                    },
                  ]}
                />
              </TouchableOpacity>
            </Flex>
            <TouchableOpacity activeOpacity={0.7} onPress={() =>
                navigation.navigate('PageStack', {
                  screen: 'AddBranch',
                  params:{editData:item}
                })
              }
            >
            <MaterialIcons name="edit" style={[gs.fs24, {color: theme}]} />
            </TouchableOpacity>
          </Flex>
          <Text
            style={[
              gs.fs22,
              {color: ts.primarytext, fontFamily: ts.primarymedium},
              gs.mv10,
            ]}>
            {item.catering_service_name}
          </Text>
          <Text
            style={[
              gs.fs15,
              {color: ts.primarytext, fontFamily: ts.secondaryregular},
              gs.mb7,
            ]}>
            {item.point_of_contact_name}
          </Text>
          <Text
            style={[
              gs.fs15,
              {color: ts.primarytext, fontFamily: ts.secondaryregular},
              gs.mb7,
            ]}>
            {item.phone_number}
          </Text>
          <Text
            style={[
              gs.fs13,
              {
                color: ts.primarytext,
                fontFamily: ts.secondaryregular,
                lineHeight: gs.mb20.marginBottom,
              },
              gs.mb5,
            ]}>
            {item.formatted_address}
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
          data={branches}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity
          style={[gs.mb20, gs.ph20]}
          onPress={() =>
            navigation.navigate('PageStack', {
              screen: 'AddBranch',
            })
          }>
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
