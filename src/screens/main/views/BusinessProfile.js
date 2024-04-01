import {View, Text, useWindowDimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {gs} from '../../../../GlobalStyles';
import {useSelector} from 'react-redux';
import {ts} from '../../../../ThemeStyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Center} from 'native-base';
import {Card, TextInput} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import Updatebtn from '../../../components/Updatebtn';

export default function BusinessProfile({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const {height, width} = useWindowDimensions();
  return (
    <ScreenWrapper>
      {/* =====HEADER======== */}
      <ThemeHeaderWrapper
        lefttxt="Business Profile"
        navigation={navigation}
        notifyIcon={false}
      />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        style={[{flex: 1, backgroundColor: '#fff'}, gs.pt15]}>
        <Center>
          <Text
            style={[
              gs.fs21,
              {color: ts.primarytext, fontFamily: ts.primarymedium},
            ]}>
            Business Information
          </Text>
        </Center>
        <Card style={[gs.p15, {backgroundColor: '#fff'}, gs.mv10, gs.mh10]}>
          <Center>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: theme}}>
                Catering Name
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                placeholder="Enter your Catering Service Name"
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
              />
            </View>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: theme}}>
                Contact person Name
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                placeholder="Enter your Catering Service Name"
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
              />
            </View>
          </Center>
        </Card>
        {/* ======ADDRESS======= */}
        <Card style={[gs.p15, {backgroundColor: '#fff'}, gs.mv10, gs.mh10]}>
          <Center>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: theme}}>
                Street Name
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                placeholder="Eg. 8th Cross Street"
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
              />
            </View>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: theme}}>Area</Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                placeholder="Eg. Near Kalyan Nagar Post"
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
              />
            </View>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: theme}}>City</Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                placeholder="Eg. Bangalore"
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
              />
            </View>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: theme}}>Pin Code</Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                placeholder="Eg. 624 301"
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
              />
            </View>
          </Center>
        </Card>
        {/* =======ABOUT=========== */}
        <Card style={[gs.p15, {backgroundColor: '#fff'}, gs.mv10, gs.mh10]}>
          <Center>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: theme}}>About</Text>
              <TextInput
                style={{...styles.input, width: width - 80, height: height / 5}}
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                multiline
                numberOfLines={10}
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
                textAlignVertical="top"
              />
            </View>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: theme}}>
                Working Since
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                placeholder="Eg. 1987"
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
              />
            </View>
          </Center>
        </Card>
        {/* ======CONTACT DETAILS====== */}
        <Card style={[gs.p15, {backgroundColor: '#fff'}, gs.mv10, gs.mh10]}>
          <Center>
            <Text
              style={[
                gs.fs21,
                {color: ts.primarytext, fontFamily: ts.primarymedium},
              ]}>
              Contact Details
            </Text>
          </Center>
          <Center>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: theme}}>
                Business Email Id
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
              />
            </View>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: theme}}>
                Business Phone Number
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
              />
            </View>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: theme}}>
                Alternative Phone Number / Landline Number
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
              />
            </View>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: theme}}>
                Whatsapp Business Number
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
              />
            </View>
          </Center>
        </Card>
        {/* ======OTHERS====== */}
        <Card style={[gs.p15, {backgroundColor: '#fff'}, gs.mv10, gs.mh10]}>
          <Center>
            <Text
              style={[
                gs.fs21,
                {color: ts.primarytext, fontFamily: ts.primarymedium},
              ]}>
              Others
            </Text>
          </Center>
          <Center>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: ts.teritary}}>
                Website link (optional)
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
              />
            </View>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: ts.teritary}}>
                Twitter ID (optional)
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
              />
            </View>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: ts.teritary}}>
                Instagram link (optional)
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
              />
            </View>
            <View style={[gs.mv10]}>
              <Text style={{...styles.subtitke, color: ts.teritary}}>
                Facebook link (optional)
              </Text>
              <TextInput
                style={{...styles.input, width: width - 80}}
                outlineColor={ts.secondarytext}
                activeOutlineColor={theme}
                mode="outlined"
                outlineStyle={{color: ts.secondarytext, borderRadius: 10}}
              />
            </View>
          </Center>
        </Card>
        <TouchableOpacity style={[styles.updatebtncontainer, gs.mh10]}>
          <Updatebtn btntxt="Update" />
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  input: {
    color: ts.secondarytext,
    fontSize: '12@ms',
    fontFamily: ts.secondaryregular,
    height: '40@ms',
    backgroundColor: '#fff',
  },
  subtitke: {
    color: ts.secondarytext,
    fontSize: '12@ms',
    fontFamily: ts.secondaryregular,
    marginBottom: '10@ms',
    lineHeight: '18@ms',
  },
  updatebtncontainer: {
    marginBottom: '60@ms',
    marginTop: '10@ms',
  },
});
