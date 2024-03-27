import {View, Text, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeader from '../../../components/ThemeHeader';
import {List, TextInput} from 'react-native-paper';
import {gs} from '../../../../GlobalStyles';
import {ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {ts} from '../../../../ThemeStyles';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {cuisine_data} from '../../../constants/Constant';
import {Flex} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Addbtn from '../../../components/Addbtn';

export default function AddCuisine({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const renderItem = ({item, index}) => {
    return (
      <List.AccordionGroup>
        <List.Accordion
          title={
            <Flex direction="row" alignItems="center">
              <MaterialIcons
                name="check-box-outline-blank"
                style={[gs.fs22, {...styles.checkicon, color: ts.primarytext}]}
              />
              <Text style={styles.accordianTitle}>{item.type}</Text>
            </Flex>
          }
          id={String(index)}
          style={styles.labelcontainer}
          titleStyle={styles.accordianTitle}>
          <View style={styles.accordianitem}>
            {item.subtype.map((e, i) => (
              <TouchableOpacity key={i}>
                <Flex direction="row" alignItems="center" style={[gs.mb15,gs.ml20]}>
                  <MaterialIcons
                    name="check-box-outline-blank"
                    style={[
                      gs.fs22,
                      {...styles.checkicon, color: ts.primarytext},
                    ]}
                  />
                  <Text
                    style={[
                      gs.fs14,
                      {color: ts.primarytext, fontFamily: ts.secondaryregular},
                    ]}>
                    {e.type}
                  </Text>
                </Flex>
              </TouchableOpacity>
            ))}
          </View>
        </List.Accordion>
      </List.AccordionGroup>
    );
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
          data={cuisine_data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[gs.mt10]}
        />
		<TouchableOpacity style={[gs.mb10]}>
		<Addbtn btntxt='Add Cuisines'/>
		</TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  input: {
    color: ts.secondarytext,
    fontSize: '14@ms',
    backgroundColor: '#fff',
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
});
