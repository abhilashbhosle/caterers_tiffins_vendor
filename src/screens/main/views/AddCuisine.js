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
import {Flex} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Addbtn from '../../../components/Addbtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFlow} from '../../../redux/slicers/CommomSlicer';
import {getCuisine} from '../../controllers/CuisineController';
import { updateCuisinesService } from '../../services/CuisineService';

export default function AddCuisine({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const cuisine = useSelector(state => state.cuisine?.cuisines);
  const [expanded, setExpanded] = useState(-1);
  const [cuisineData, setCuisineData] = useState([]);
  const dispatch = useDispatch();
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

  // =====SETTING PARENT CUISINES=======//
  const handleParentCuisines = index => {
    let data = [...cuisineData];
    setExpanded(index);
    const updatedData = data.map((item, i) => {
      if (i === index) {
        return {...item, selected: item.selected === '0' ? '1' : '0'};
      }
      return item;
    });
    const updatedChilds = data[index].children.map((item, i) => {
      return {...item, selected:updatedData[index].selected === '1' ? '1' : '0'};
    });
    updatedData[index].children = updatedChilds;
    setCuisineData(updatedData);
  };
  // =====SETTING CHILDREN CUISINES=======//
  const handleChildrenCuisines = (pi, i) => {
    const data = [...cuisineData];
    if (data[pi].children[i].selected === '0') {
      data[pi].children[i].selected = '1';
    } else {
      data[pi].children[i].selected = '0';
    }
    setCuisineData(data);
   let check= data[pi].children.filter((e,i)=>{
    return e.selected=="1"
    })
    // ===IF SINGLE CHECKBOX IS CHECKED MARKING PARENT AS CHECKED IF SINGLE CHILD IS UNCHECKED MAKING PARENT AS UNCHECKED=======//
    if(check.length==data[pi].children.length){
      data.map((e,i)=>{
        if(i==pi){
          e.selected="1"
        }
      })
      setCuisineData(data)
    }else{
      data[pi].selected=="0"
      data.map((e,i)=>{
        if(i==pi){
          e.selected="0"
        }
      })
      setCuisineData(data)
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <List.Accordion
        key={index}
        onPress={() => {
          handleParentCuisines(index);
        }}
        expanded={expanded==index?true:false}
        title={
          <Flex direction="row" alignItems="center">
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
              ]}
            />
            <Text style={styles.accordianTitle}>{item.name}</Text>
          </Flex>
        }
        id={String(index)}
        style={styles.labelcontainer}
        titleStyle={styles.accordianTitle}>
        <View style={styles.accordianitem}>
          {item.children.map((e, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                handleChildrenCuisines(index, i);
              }}>
              <Flex
                direction="row"
                alignItems="center"
                style={[gs.mb15, gs.ml20]}>
                <MaterialIcons
                  name={
                    e.selected == 0 ? 'check-box-outline-blank' : 'check-box'
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
                  ]}>
                  {e.name}
                </Text>
              </Flex>
            </TouchableOpacity>
          ))}
        </View>
      </List.Accordion>
    );
  };
  const handleAddCuisine=()=>{
    let finalData=[]
    cuisineData.map((e,i)=>{
      finalData.push({cuisine_id:Number(e.id),selected:Number(e.selected)})
      e.children.map((item)=>{
        finalData.push({cuisine_id:Number(item.id),selected:Number(item.selected)})
      })
    })
    updateCuisinesService({finalData,dispatch,navigation})
  }
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
          activeOutlineColor={theme}
          outlineStyle={[gs.br12, styles.searchoutline]}
          left={
            <TextInput.Icon
              icon={() => <EvilIcons name="search" style={styles.icon} />}
            />
          }
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
    fontSize: '14@ms',
  },
  icon: {
    fontSize: '24@ms',
    color: ts.secondarytext,
    // top: '3@ms',
  },
  labelcontainer: {
    height: '60@ms',
    borderRadius: '10@ms',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderWidth: 0.5,
    borderColor: '#999',
    marginVertical: '5@ms',
  },
  accordianTitle: {
    fontFamily: ts.secondaryregular,
    color: ts.primarytext,
    fontSize: '15@ms',
    top: '2@ms',
  },
  accordianitem: {
    padding: '10@ms',
    backgroundColor: '#f5f5f5',
    marginTop: '-10@ms',
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
    backgroundColor:'#fff'
  },
});

