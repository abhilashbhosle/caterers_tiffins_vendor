import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import ThemeHeaderWrapper from '../../../components/ThemeHeaderWrapper';
import {useSelector} from 'react-redux';
import {ts} from '../../../../ThemeStyles';
import {gs} from '../../../../GlobalStyles';
import {Center, Divider, Flex} from 'native-base';
import {ScaledSheet} from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CredInputs from '../../../components/CredInputs';
import {List, TextInput} from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import ThemeSepBtn from '../../../components/ThemeSepBtn';

export default function Settings({navigation}) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const {height, width} = useWindowDimensions();
  const [password, setPassword] = useState('abhi');
  return (
    <ScreenWrapper>
      {/* =====HEADER======== */}
      <ThemeHeaderWrapper
        lefttxt="Settings"
        navigation={navigation}
        notifyIcon={false}
      />
      <KeyboardAwareScrollView
        style={[{flex: 1, backgroundColor: '#fff'}, gs.p20]}
        enableOnAndroid>
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="space-between">
          <Flex direction="row">
            <Image
              resizeMode="cover"
              source={require('../../../assets/drawer/profile.jpg')}
              alt="profile"
              style={styles.profileimg}
            />
            <View style={[gs.ph10, {width: '65%'}]}>
              <Text
                style={[
                  gs.fs20,
                  {fontFamily: ts.primarymedium, color: ts.primarytext},
                  gs.mb5,
                ]}
                numberOfLines={1}>
                John Doe
              </Text>
              <Text
                style={[
                  gs.fs14,
                  {fontFamily: ts.secondaryregular, color: ts.teritary},
                ]}>
                9003451965
              </Text>
            </View>
          </Flex>
          <MaterialIcons name="edit" style={[gs.fs24, {color: theme}]} />
        </Flex>
        <Text
          style={[
            gs.fs20,
            {color: ts.primarytext, fontFamily: ts.primarymedium},
            gs.mv15,
          ]}>
          Company ID - 112521
        </Text>
        <Text style={styles.heading}>Change Login Password below</Text>
        <TextInput
          style={styles.input}
          right={
            <TextInput.Icon
              icon={() => (
                <FeatherIcon name="eye-off" style={[gs.fs22, {color: theme}]} />
              )}
            />
          }
          secureTextEntry={true}
          mode="outlined"
          outlineColor={'#ddd'}
          activeOutlineColor={theme}
          outlineStyle={[gs.br8]}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <Text
          style={[{...styles.heading, textAlign: 'right', color: ts.teritary}]}>
          Reset Password
        </Text>
        <Divider style={[gs.mv20, {backgroundColor: theme}]} />
        <Text style={styles.heading}>Documents</Text>
        <View style={[gs.mv10]}>
          {/* =====AADHAR CARD====== */}
          <List.AccordionGroup>
            <List.Accordion
              title="Aadhar Card"
              id="1"
              style={styles.labelcontainer}
              titleStyle={styles.accordianTitle}>
              <View style={styles.accordianitem}>
                <Text style={[styles.heading, gs.mb15]}>Upload Aadhar</Text>
                <Center>
                  <TouchableOpacity
                    style={[
                      {...styles.uploadbtn, backgroundColor: theme},
                      gs.br10,
                    ]}>
                    <Flex direction="row" alignItems="center">
                      <AntIcon
                        name="cloudupload"
                        style={[gs.fs20, {color: '#fff'}, gs.mr10]}
                      />
                      <Text
                        style={[
                          gs.fs16,
                          {fontFamily: ts.secondaryregular, color: '#fff'},
                        ]}>
                        Upload
                      </Text>
                    </Flex>
                  </TouchableOpacity>
                </Center>
              </View>
            </List.Accordion>
            {/* =====PAN CARD====== */}
            <List.Accordion
              title="PAN Card"
              id="2"
              style={styles.labelcontainer}
              titleStyle={styles.accordianTitle}>
              <View style={styles.accordianitem}>
                <Text style={[styles.heading, gs.mb15]}>Upload PAN Card</Text>
                <Center>
                  <TouchableOpacity
                    style={[
                      {...styles.uploadbtn, backgroundColor: theme},
                      gs.br10,
                    ]}>
                    <Flex direction="row" alignItems="center">
                      <AntIcon
                        name="cloudupload"
                        style={[gs.fs20, {color: '#fff'}, gs.mr10]}
                      />
                      <Text
                        style={[
                          gs.fs16,
                          {fontFamily: ts.secondaryregular, color: '#fff'},
                        ]}>
                        Upload
                      </Text>
                    </Flex>
                  </TouchableOpacity>
                </Center>
              </View>
            </List.Accordion>
            {/* =====GSTIN Number====== */}
            <List.Accordion
              title="GSTIN Number"
              id="3"
              style={styles.labelcontainer}
              titleStyle={styles.accordianTitle}>
              <View style={styles.accordianitem}>
                <Text style={[styles.heading, gs.mb5]}>
                  Enter your GSTIN number below
                </Text>
                <TextInput
                  style={{...styles.input, backgroundColor: '#f5f5f5'}}
                  mode="outlined"
                  activeOutlineColor={theme}
                  outlineColor={'#999'}
                  outlineStyle={[gs.br8]}
                />
              </View>
            </List.Accordion>
            {/* =====FSSAI LICENSE====== */}
            <List.Accordion
              title="FSSAI License"
              id="4"
              style={styles.labelcontainer}
              titleStyle={styles.accordianTitle}>
              <View style={styles.accordianitem}>
                <Text style={[styles.heading, gs.mb15]}>
                  Upload FSSAI License
                </Text>
                <Center>
                  <TouchableOpacity
                    style={[
                      {...styles.uploadbtn, backgroundColor: theme},
                      gs.br10,
                    ]}>
                    <Flex direction="row" alignItems="center">
                      <AntIcon
                        name="cloudupload"
                        style={[gs.fs20, {color: '#fff'}, gs.mr10]}
                      />
                      <Text
                        style={[
                          gs.fs16,
                          {fontFamily: ts.secondaryregular, color: '#fff'},
                        ]}>
                        Upload
                      </Text>
                    </Flex>
                  </TouchableOpacity>
                </Center>
              </View>
            </List.Accordion>
          </List.AccordionGroup>
          <Divider style={[gs.mv20, {backgroundColor: theme}]} />
          <Text style={styles.heading}>Links</Text>
          {/* ====ABOUT US====== */}
          <View style={[gs.mv10]}>
            <TouchableOpacity style={styles.labelcontainer} onPress={()=>navigation.navigate('PageStack', {
            screen: 'AboutUs',
          })}>
              <Flex
                direction="row"
                alignItems="center"
                justifyContent="space-between">
                <Text style={[{...styles.accordianTitle}, gs.mh15]}>
                  About Us
                </Text>
                <EntypoIcons
                  name="chevron-small-right"
                  style={{
                    ...styles.righticon,
                    color: ts.primarytext,
                  }}
                />
              </Flex>
            </TouchableOpacity>
            {/* =====FAQ'S======= */}
            <TouchableOpacity style={styles.labelcontainer} onPress={()=>navigation.navigate('PageStack', {
            screen: 'Faq',
          })}>
              <Flex
                direction="row"
                alignItems="center"
                justifyContent="space-between">
                <Text style={[{...styles.accordianTitle}, gs.mh15]}>FAQ's</Text>
                <EntypoIcons
                  name="chevron-small-right"
                  style={{
                    ...styles.righticon,
                    color: ts.primarytext,
                  }}
                />
              </Flex>
            </TouchableOpacity>
          </View>
          <Divider style={[gs.mv20, {backgroundColor: theme}]} />
          <Text style={styles.heading}>Help Desk / Support</Text>
          <TouchableOpacity style={[gs.mv20]} onPress={()=>navigation.navigate('PageStack', {
            screen: 'HelpDesk',
          })}>
            <ThemeSepBtn
              themecolor={theme}
              btntxt="Raise a Ticket"
              height={40}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ScreenWrapper>
  );
}
const styles = ScaledSheet.create({
  profileimg: {
    height: '50@ms',
    width: '50@ms',
    borderRadius: '5@ms',
  },
  heading: {
    fontSize: '13@ms',
    color: ts.secondarytext,
    fontFamily: ts.secondaryregular,
  },
  input: {
    height: '44@ms',
    backgroundColor: '#fff',
    marginVertical: '10@ms',
    color: ts.secondarytext,
    fontSize: '14@ms',
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
  uploadbtn: {
    height: '40@ms',
    width: '150@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  righticon: {
    fontSize: '24@ms',
    color: '#fff',
    marginRight: '20@ms',
  },
});
