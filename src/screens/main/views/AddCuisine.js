import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeader from '../../../components/ThemeHeader';
import {List, TextInput} from 'react-native-paper';
import {gs} from '../../../../GlobalStyles';
import {ScaledSheet} from 'react-native-size-matters';
import {useSelector, useDispatch} from 'react-redux';
import {ts} from '../../../../ThemeStyles';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {cuisine_data} from '../../../constants/Constant';
import {Center, Flex} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Addbtn from '../../../components/Addbtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFlow} from '../../../redux/slicers/CommomSlicer';
import {getCuisine} from '../../controllers/CuisineController';
import {updateCuisinesService} from '../../services/CuisineService';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function AddCuisine({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const cuisine = useSelector(state => state.cuisine?.cuisines);
  const [expanded, setExpanded] = useState(-1);
  const [cuisineData, setCuisineData] = useState([]);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  useEffect(() => {
    (async () => {
      let flow = await AsyncStorage.getItem('flow');
      dispatch(getFlow(flow));
      dispatch(getCuisine());
    })();
  }, []);
  useEffect(() => {
    if (cuisine.length) {
      setCuisineData(cuisine);
    }
  }, [cuisine]);

  // =======SEARCH CUISINE========//
  const handleSearch = text => {
    setSearch(text);
  };
  useEffect(()=>{
    let data = [...cuisine];
    if (search?.length > 0) {
      console.log('entered inside with',search)
      let finalData = data.filter((e, i) => {
        let c1 = e.name.startsWith(search);
        let c2 = e.children.filter(item => item.name.startsWith(search));
        if (c1 || c2.length > 0) {
          return e;
        }
      });
      setCuisineData(finalData);
    } else {
      setCuisineData(cuisine);
    }
    
  },[search])

  // =====SETTING PARENT CUISINES=======//
  const handleParentCuisines = index => {
    let data = [...cuisineData];
    const updatedData = data.map((item, i) => {
      if (i === index) {
        return {...item, selected: item.selected === '0' ? '1' : '0'};
      }
      return item;
    });
    const updatedChilds = data[index].children.map((item, i) => {
      return {
        ...item,
        selected: updatedData[index].selected === '1' ? '1' : '0',
      };
    });
    updatedData[index].children = updatedChilds;
    setCuisineData(updatedData);
  };
  // =====SETTING CHILDREN CUISINES=======//
  const handleChildrenCuisines = (pi, i) => {
    let data = [...cuisineData];
    let da = data[pi].children.map((e, ind) => {
      return {
        ...e,
        selected:
          i == ind
            ? data[pi].children[i].selected == '0'
              ? '1'
              : '0'
            : data[pi].children[ind].selected,
      };
    });
    let updated_data = data.map((e, ind) => {
      return {
        ...e,
        children: ind == pi ? da : data[ind].children,
      };
    });

    setCuisineData(updated_data);
    // setCuisineData(data)
    // ===IF SINGLE CHECKBOX IS CHECKED MARKING PARENT AS CHECKED IF SINGLE CHILD IS UNCHECKED MAKING PARENT AS UNCHECKED=======//
    let check = updated_data[pi].children.filter((e, i) => {
      return e.selected == '1';
    });
    if (check.length == updated_data[pi].children.length) {
      updated_data.map((e, i) => {
        if (i == pi) {
          e.selected = '1';
        }
      });
      setCuisineData(updated_data);
    } else {
      updated_data[pi].selected == '0';
      updated_data.map((e, i) => {
        if (i == pi) {
          e.selected = '0';
        }
      });
      setCuisineData(updated_data);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.labelcontainer}>
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="space-between">
          <Flex direction="row" align="center">
            <TouchableOpacity onPress={() => handleParentCuisines(index)}>
              <MaterialIcons
                name={
                  item.selected == 0 ? 'check-box-outline-blank' : 'check-box'
                }
                style={[
                  gs.fs22,
                  {
                    ...styles.checkicon,
                    color: item.selected == 0 ? ts.primarytext : theme,
                  },
                  gs.mr10,
                ]}
              />
            </TouchableOpacity>
            <Text style={styles.accordianTitle}>{item.name}</Text>
          </Flex>
          <TouchableOpacity
            style={[gs.p5]}
            onPress={() => {
              setExpanded(prev => (prev == index ? -1 : index));
            }}>
            <FeatherIcon
              name={index == expanded ? 'chevron-up' : 'chevron-down'}
              style={[gs.fs20, {color: ts.secondarytext}]}
            />
          </TouchableOpacity>
        </Flex>
        {index == expanded &&
          item?.children?.map((e, i) => {
            return (
              <View style={styles.accordianitem}>
                <Flex direction="row" alignItems="center" key={i}>
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      handleChildrenCuisines(index, i);
                    }}>
                    <Flex
                      direction="row"
                      alignItems="center"
                      style={[gs.ml20, gs.mt5]}>
                      <MaterialIcons
                        name={
                          e.selected == 0
                            ? 'check-box-outline-blank'
                            : 'check-box'
                        }
                        style={[
                          gs.fs22,
                          {
                            ...styles.checkicon,
                            color: e.selected == 0 ? ts.primarytext : theme,
                          },
                        ]}
                      />
                      <Text
                        style={[
                          gs.fs14,
                          {
                            color: ts.primarytext,
                            fontFamily: ts.secondaryregular,
                          },
                          gs.mt4,
                        ]}>
                        {e.name}
                      </Text>
                    </Flex>
                  </TouchableOpacity>
                </Flex>
              </View>
            );
          })}
      </View>
    );
  };
  const handleAddCuisine = () => {
    let finalData = [];
    cuisineData.map((e, i) => {
      finalData.push({cuisine_id: Number(e.id), selected: Number(e.selected)});
      e.children.map(item => {
        finalData.push({
          cuisine_id: Number(item.id),
          selected: Number(item.selected),
        });
      });
    });
    updateCuisinesService({finalData, dispatch, navigation});
  };
  return (
    <ScreenWrapper>
      <ThemeHeader
        lefttxt="Choose Cuisines from below"
        navigation={navigation}
      />
      <View style={[{flex: 1, backgroundColor: '#fff'}, gs.p20]}>
        <TextInput
          mode="outlined"
          placeholder="Search your cuisine..."
          style={styles.input}
          outlineColor="#999"
          value={search}
          activeOutlineColor={theme}
          outlineStyle={[gs.br12, styles.searchoutline]}
          left={
            <TextInput.Icon
              icon={() => (
                <View
                  style={[
                    {alignItems: 'center', justifyContent: 'center'},
                    gs.h25,
                  ]}>
                  <EvilIcons name="search" style={styles.icon} />
                </View>
              )}
            />
          }
          textColor={ts.primarytext}
          onChangeText={text => {
            handleSearch(text);
          }}
        />
      
        <FlatList
          keyExtractor={(item, index) => {
            String(index);
          }}
          data={cuisineData}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
        />

        <TouchableOpacity style={[gs.mb10]} onPress={handleAddCuisine}>
          <Addbtn btntxt="Add Cuisines" />
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  input: {
    color: ts.secondarytext,
    // fontSize: '14@ms',
    backgroundColor: '#fff',
  },
  icon: {
    fontSize: '24@ms',
    color: ts.secondarytext,
    bottom: '2@ms',
  },
  labelcontainer: {
    // height: '60@ms',
    borderRadius: '10@ms',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderWidth: 0.5,
    borderColor: '#999',
    marginVertical: '5@ms',
    padding: '15@ms',
  },
  accordianTitle: {
    fontFamily: ts.secondaryregular,
    color: ts.primarytext,
    fontSize: '15@ms',
    top: '2@ms',
  },
  accordianitem: {
    // padding: '10@ms',
    backgroundColor: '#f5f5f5',
    marginTop: '10@ms',
    borderBottomLeftRadius: '10@ms',
    borderBottomRightRadius: '10@ms',
    borderBottomColor: '#999',
    borderTopColor: 'transparent',
    borderLeftColor: '#999',
    borderRightColor: '#999',
    borderWidth: 0.5,
  },
  checkicon: {
    top: '2@ms',
    marginRight: '5@ms',
  },
  contentContainerStyle: {
    marginTop: '10@ms',
    paddingBottom: '70@ms',
    backgroundColor: '#fff',
  },
});
