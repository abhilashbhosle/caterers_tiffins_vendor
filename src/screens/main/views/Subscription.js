import {
  View,
  Text,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {gs} from '../../../../GlobalStyles';
import {useSelector} from 'react-redux';
import {ts} from '../../../../ThemeStyles';
import {Center, Flex} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';
import {Card} from 'react-native-paper';
import {plan_data} from '../../../constants/Constant';
import Carousel from 'react-native-reanimated-carousel';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function Subscription({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const {height, width} = useWindowDimensions();
  const [activeIndex, setActiveindex] = useState(0);
  //========REFS========//
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={[gs.mh15]} onPress={()=>{scrollToIndex(index)}}>
        <Text
          style={[
            gs.fs16,
            {
              fontFamily: ts.secondaryregular,
              color: activeIndex === index ? ts.primarytext : '#999',
            },
			
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderPlans = ({item}) => {
    return (
      <View
        style={[
          {width: width, height: height, backgroundColor: '#fff'},
          gs.p10,
        ]}>
        <Card
          style={[
            {width: width - 23, height: height / 1.5, backgroundColor: '#fff'},
            gs.br20,
          ]}>
          <View style={[styles.header, {backgroundColor: item.color}]}>
            <Text style={[styles.headtxt]}>{item.name}</Text>
          </View>
          <Center>
            <Flex direction='row' alignItems='center' style={[gs.mv20]}>
              <MaterialIcons name='currency-rupee' style={[gs.fs22]}/>
              <Text style={[{color:ts.primarytext,fontFamily:ts.secondarymedium},gs.fs22]}>{item.price}</Text>
              <Text style={{...styles.heading,top:5}}>  month</Text>
            </Flex>
            <Text style={styles.heading}>{item.listing}</Text>
          </Center>
          <View style={[gs.mh20,gs.mt15]}>
          <Text style={[{...styles.heading,color:ts.primarytext},gs.mv3]}>Benifits:</Text>
          <Text style={[{...styles.heading,color:ts.primarytext},gs.mv3]}>- Gets clean dashboard</Text>
          <Text style={[{...styles.heading,color:ts.primarytext},gs.mv3]}>- Track your incomes</Text>
          <Text style={[{...styles.heading,color:ts.primarytext},gs.mv3]}>- Gets clean order PDF</Text>
          <Text style={[{...styles.heading,color:ts.primarytext},gs.mv3]}>- Includes calender feature so you never missout any info reading dates</Text>
          <Text style={[{...styles.heading,color:ts.primarytext},gs.mv3]}>- Gets notify via email, SMS, app notification</Text>
          <Text style={[{...styles.heading,color:ts.primarytext},gs.mv3]}>- Phone/chat feature with customers</Text>
          <Text style={[{...styles.heading,color:ts.primarytext},gs.mv3]}>- Data analysis/improvement recommendation</Text>
          </View>
          <Center>
            <TouchableOpacity style={{...styles.subscribebtn,backgroundColor:item.color}} activeOpacity={0.7}>
              <Text style={[gs.fs15,{color:'#fff',fontFamily:ts.secondarymedium}]}>Subscribe Now</Text>
            </TouchableOpacity>
          </Center>
        </Card>
      </View>
    );
  };
  const scrollToIndex = idx => {
    setActiveindex(idx);
    bottomRef.current.scrollTo({index: idx});
	if (idx * (width/2) > width / 2) {
		topRef.current.scrollToOffset({
		  offset: idx * (width/2) + width / 4 - width / 2,
		  animated: true,
		});
	  } else {
		topRef.current.scrollToOffset({
		  offset: idx,
		  animated: true,
		});
	  }
  };
  return (
    <ScreenWrapper>
      {/* =====HEADER======== */}
      <ThemeHeaderWrapper
        lefttxt="Subscription"
        navigation={navigation}
        notifyIcon={false}
      />
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <View style={[gs.m15]}>
          <Center>
            <Text
              style={[
                gs.fs20,
                {fontFamily: ts.primarymedium, color: ts.primarytext},
                gs.mb5,
              ]}
              numberOfLines={1}>
              Subscription Plans
            </Text>
            <Text style={styles.heading}>Choose your subscription types</Text>
          </Center>
        </View>
        <View>
          <FlatList
            ref={topRef}
            keyExtractor={(item, index) => String(index)}
            data={plan_data}
            renderItem={renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Carousel
          loop={false}
          ref={bottomRef}
          width={width}
          height={height}
          data={plan_data}
          onSnapToItem={index => scrollToIndex(index)}
          renderItem={renderPlans}
        />
      </View>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  heading: {
    fontSize: '13@ms',
    color: ts.secondarytext,
    fontFamily: ts.secondaryregular,
  },
  header: {
    height: '60@ms',
    borderTopLeftRadius: '20@ms',
    borderTopRightRadius: '20@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headtxt: {
    fontSize: '18@ms',
    color: '#fff',
    fontFamily: ts.secondaryregular,
  },
  subscribebtn:{
    height:'40@ms',
    width:'170@ms',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:'20@ms',
    marginTop:'50@ms'
  }
});
