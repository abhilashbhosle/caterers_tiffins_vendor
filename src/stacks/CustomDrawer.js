import {View, Text, Image, SafeAreaView} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {ts} from '../../ThemeStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {gs} from '../../GlobalStyles';
import {Flex} from 'native-base';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import F6Icons from 'react-native-vector-icons/FontAwesome6';
import IonIcons from 'react-native-vector-icons/Ionicons';

export default function CustomDrawer(props) {
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  const {routeNames, index} = props.state;
  const focused = routeNames[index];
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
        <Flex
          direction="row"
          justifyContent="space-between"
          style={[gs.ph15]}>
          <Flex direction="row">
            <Image
              resizeMode="cover"
              source={require('../assets/drawer/profile.jpg')}
              alt="profile"
              style={styles.profileimg}
            />
            <View style={[gs.ph10, {width: '65%'}]}>
              <Text
                style={[
                  gs.fs15,
                  {fontFamily: ts.primarymedium, color: ts.primarytext},
                  gs.mb5,
                ]}
                numberOfLines={1}>
                John Doe
              </Text>
              <Text
                style={[
                  gs.fs12,
                  {fontFamily: ts.secondaryregular, color: ts.teritary},
                ]}>
                9003451965
              </Text>
            </View>
          </Flex>
          <MaterialIcons name="logout" style={[gs.fs30, {color: theme}]} />
        </Flex>
        <Text
          style={[
            gs.ph15,
            gs.fs13,
            {color: ts.secondarytext, fontFamily: ts.secondaryregular},
            gs.mv15,
          ]}>
          Manage your account
        </Text>
        <DrawerItem
          label={() => (
            <Flex
              direction="row"
              justifyContent="space-between"
              alignItems="center">
              <Text
                style={{
                  ...styles.label,
                  color: focused === 'Dashboard' ? '#fff' : ts.primarytext,
                }}>
                Dashboard
              </Text>
              <EntypoIcons
                name="chevron-small-right"
                style={{
                  ...styles.righticon,
                  color: focused === 'Dashboard' ? '#fff' : ts.primarytext,
                }}
              />
            </Flex>
          )}
          activeBackgroundColor={theme}
          onPress={() => {
            props.navigation.navigate('Dashboard');
          }}
          focused={focused === 'Dashboard'}
          activeTintColor="#fff"
          inactiveTintColor="#000"
          style={{
            ...styles.labelcontainer,
            backgroundColor: focused !== 'Dashboard' ? '#f5f5f5' : theme,
            borderWidth: focused !== 'Dashboard' ? 0.5 : 0,
            borderColor: focused !== 'Dashboard' ? '#999' : '#fff',
          }}
          icon={() => (
            <MaterialIcons
              name="stacked-bar-chart"
              style={[
                gs.fs24,
                {color: focused === 'Dashboard' ? '#fff' : ts.primarytext},
              ]}
            />
          )}
        />
        <DrawerItem
          label={() => (
            <Flex
              direction="row"
              justifyContent="space-between"
              alignItems="center">
              <Text
                style={{
                  ...styles.label,
                  color: focused === 'Inquiries' ? '#fff' : ts.primarytext,
                }}>
                Inquiries
              </Text>
              <EntypoIcons
                name="chevron-small-right"
                style={{
                  ...styles.righticon,
                  color: focused === 'Inquiries' ? '#fff' : ts.primarytext,
                }}
              />
            </Flex>
          )}
          focused={focused === 'Inquiries'}
          activeTintColor="#fff"
          activeBackgroundColor={theme}
          onPress={() => {
            props.navigation.navigate('Inquiries');
          }}
          inactiveTintColor={ts.primarytext}
          style={{
            ...styles.labelcontainer,
            backgroundColor: focused !== 'Inquiries' ? '#f5f5f5' : theme,
            borderWidth: focused !== 'Inquiries' ? 0.5 : 0,
            borderColor: focused !== 'Inquiries' ? '#999' : '#fff',
          }}
          icon={() => (
            <MaterialIcons
              name="edit-note"
              style={[
                gs.fs24,
                {color: focused === 'Inquiries' ? '#fff' : ts.primarytext},
              ]}
            />
          )}
        />
        <DrawerItem
          label={() => (
            <Flex
              direction="row"
              justifyContent="space-between"
              alignItems="center">
              <Text
                style={{
                  ...styles.label,
                  color: focused === 'Reviews' ? '#fff' : ts.primarytext,
                }}>
                Reviews
              </Text>
              <EntypoIcons
                name="chevron-small-right"
                style={{
                  ...styles.righticon,
                  color: focused === 'Reviews' ? '#fff' : ts.primarytext,
                }}
              />
            </Flex>
          )}
          focused={focused === 'Reviews'}
          activeTintColor="#fff"
          activeBackgroundColor={theme}
          onPress={() => {
            props.navigation.navigate('Reviews');
          }}
          labelStyle={styles.label}
          inactiveTintColor={ts.primarytext}
          style={{
            ...styles.labelcontainer,
            backgroundColor: focused !== 'Reviews' ? '#f5f5f5' : theme,
            borderWidth: focused !== 'Reviews' ? 0.5 : 0,
            borderColor: focused !== 'Reviews' ? '#999' : '#fff',
          }}
          icon={() => (
            <MaterialIcons
              name="feedback"
              style={[
                gs.fs20,
                {color: focused === 'Reviews' ? '#fff' : ts.secondarytext},
              ]}
            />
          )}
        />
        <Text
          style={[
            gs.ph15,
            gs.fs13,
            {color: ts.secondarytext, fontFamily: ts.secondaryregular},
            gs.mv15,
          ]}>
          Services
        </Text>
        <DrawerItem
          label={() => (
            <Flex
              direction="row"
              justifyContent="space-between"
              alignItems="center">
              <Text
                style={{
                  ...styles.label,
                  color: focused === 'Manage Cuisine' ? '#fff' : ts.primarytext,
                }}>
                Manage Cuisine
              </Text>
              <EntypoIcons
                name="chevron-small-right"
                style={{
                  ...styles.righticon,
                  color: focused === 'Manage Cuisine' ? '#fff' : ts.primarytext,
                }}
              />
            </Flex>
          )}
          focused={focused === 'Manage Cuisine'}
          activeTintColor="#fff"
          activeBackgroundColor={theme}
          onPress={() => {
            props.navigation.navigate('Manage Cuisine');
          }}
          labelStyle={styles.label}
          inactiveTintColor={ts.primarytext}
          style={{
            ...styles.labelcontainer,
            backgroundColor: focused !== 'Manage Cuisine' ? '#f5f5f5' : theme,
            borderWidth: focused !== 'Manage Cuisine' ? 0.5 : 0,
            borderColor: focused !== 'Manage Cuisine' ? '#999' : '#fff',
          }}
          icon={() => (
            <F6Icons
              name="utensils"
              style={[
                gs.fs20,
                {
                  color:
                    focused === 'Manage Cuisine' ? '#fff' : ts.secondarytext,
                },
              ]}
            />
          )}
        />
        <DrawerItem
          label={() => (
            <Flex
              direction="row"
              justifyContent="space-between"
              alignItems="center">
              <Text
                style={{
                  ...styles.label,
                  color:
                    focused === 'Manage Occassions' ? '#fff' : ts.primarytext,
                }}>
                Manage Occassions
              </Text>
              <EntypoIcons
                name="chevron-small-right"
                style={{
                  ...styles.righticon,
                  color:
                    focused === 'Manage Occassions' ? '#fff' : ts.primarytext,
                }}
              />
            </Flex>
          )}
          focused={focused === 'Manage Occassions'}
          activeTintColor="#fff"
          activeBackgroundColor={theme}
          onPress={() => {
            props.navigation.navigate('Manage Occassions');
          }}
          labelStyle={styles.label}
          inactiveTintColor={ts.primarytext}
          style={{
            ...styles.labelcontainer,
            backgroundColor:
              focused !== 'Manage Occassions' ? '#f5f5f5' : theme,
            borderWidth: focused !== 'Manage Occassions' ? 0.5 : 0,
            borderColor: focused !== 'Manage Occassions' ? '#999' : '#fff',
          }}
          icon={() => (
            <MaterialIcons
              name="celebration"
              style={[
                gs.fs22,
                {
                  color:
                    focused === 'Manage Occassions' ? '#fff' : ts.secondarytext,
                },
              ]}
            />
          )}
        />
        <DrawerItem
          label={() => (
            <Flex
              direction="row"
              justifyContent="space-between"
              alignItems="center">
              <Text
                style={{
                  ...styles.label,
                  color: focused === 'Packages' ? '#fff' : ts.primarytext,
                }}>
                Packages
              </Text>
              <EntypoIcons
                name="chevron-small-right"
                style={{
                  ...styles.righticon,
                  color: focused === 'Packages' ? '#fff' : ts.primarytext,
                }}
              />
            </Flex>
          )}
          focused={focused === 'Packages'}
          activeTintColor="#fff"
          activeBackgroundColor={theme}
          onPress={() => {
            props.navigation.navigate('Packages');
          }}
          labelStyle={styles.label}
          inactiveTintColor={ts.primarytext}
          style={{
            ...styles.labelcontainer,
            backgroundColor: focused !== 'Packages' ? '#f5f5f5' : theme,
            borderWidth: focused !== 'Packages' ? 0.5 : 0,
            borderColor: focused !== 'Packages' ? '#999' : '#fff',
          }}
          icon={() => (
            <F6Icons
              name="pager"
              style={[
                gs.fs20,
                {
                  color: focused === 'Packages' ? '#fff' : ts.secondarytext,
                },
              ]}
            />
          )}
        />
        <Text
          style={[
            gs.ph15,
            gs.fs13,
            {color: ts.secondarytext, fontFamily: ts.secondaryregular},
            gs.mv15,
          ]}>
          Profiles
        </Text>
        <DrawerItem
          label={() => (
            <Flex
              direction="row"
              justifyContent="space-between"
              alignItems="center">
              <Text
                style={{
                  ...styles.label,
                  color:
                    focused === 'Business Profile' ? '#fff' : ts.primarytext,
                }}>
                Business Profile
              </Text>
              <EntypoIcons
                name="chevron-small-right"
                style={{
                  ...styles.righticon,
                  color:
                    focused === 'Business Profile' ? '#fff' : ts.primarytext,
                }}
              />
            </Flex>
          )}
          focused={focused === 'Business Profile'}
          activeTintColor="#fff"
          activeBackgroundColor={theme}
          onPress={() => {
            props.navigation.navigate('Business Profile');
          }}
          labelStyle={styles.label}
          inactiveTintColor={ts.primarytext}
          style={{
            ...styles.labelcontainer,
            backgroundColor: focused !== 'Business Profile' ? '#f5f5f5' : theme,
            borderWidth: focused !== 'Business Profile' ? 0.5 : 0,
            borderColor: focused !== 'Business Profile' ? '#999' : '#fff',
          }}
          icon={() => (
            <IonIcons
              name="person"
              style={[
                gs.fs20,
                {
                  color:
                    focused === 'Business Profile' ? '#fff' : ts.secondarytext,
                },
              ]}
            />
          )}
        />
        <DrawerItem
          label={() => (
            <Flex
              direction="row"
              justifyContent="space-between"
              alignItems="center">
              <Text
                style={{
                  ...styles.label,
                  color: focused === 'Photo Gallery' ? '#fff' : ts.primarytext,
                }}>
                Photo Gallery
              </Text>
              <EntypoIcons
                name="chevron-small-right"
                style={{
                  ...styles.righticon,
                  color: focused === 'Photo Gallery' ? '#fff' : ts.primarytext,
                }}
              />
            </Flex>
          )}
          focused={focused === 'Photo Gallery'}
          activeTintColor="#fff"
          activeBackgroundColor={theme}
          onPress={() => {
            props.navigation.navigate('Photo Gallery');
          }}
          labelStyle={styles.label}
          inactiveTintColor={ts.primarytext}
          style={{
            ...styles.labelcontainer,
            backgroundColor: focused !== 'Photo Gallery' ? '#f5f5f5' : theme,
            borderWidth: focused !== 'Photo Gallery' ? 0.5 : 0,
            borderColor: focused !== 'Photo Gallery' ? '#999' : '#fff',
          }}
          icon={() => (
            <MaterialIcons
              name="photo-library"
              style={[
                gs.fs20,
                {
                  color:
                    focused === 'Photo Gallery' ? '#fff' : ts.secondarytext,
                },
              ]}
            />
          )}
        />
        <DrawerItem
          label={() => (
            <Flex
              direction="row"
              justifyContent="space-between"
              alignItems="center">
              <Text
                style={{
                  ...styles.label,
                  color: focused === 'Branches' ? '#fff' : ts.primarytext,
                }}>
                Branches
              </Text>
              <EntypoIcons
                name="chevron-small-right"
                style={{
                  ...styles.righticon,
                  color: focused === 'Branches' ? '#fff' : ts.primarytext,
                }}
              />
            </Flex>
          )}
          focused={focused === 'Branches'}
          activeTintColor="#fff"
          activeBackgroundColor={theme}
          onPress={() => {
            props.navigation.navigate('Branches');
          }}
          labelStyle={styles.label}
          inactiveTintColor={ts.primarytext}
          style={{
            ...styles.labelcontainer,
            backgroundColor: focused !== 'Branches' ? '#f5f5f5' : theme,
            borderWidth: focused !== 'Branches' ? 0.5 : 0,
            borderColor: focused !== 'Branches' ? '#999' : '#fff',
          }}
          icon={() => (
            <IonIcons
              name="business"
              style={[
                gs.fs20,
                {
                  color: focused === 'Branches' ? '#fff' : ts.secondarytext,
                },
              ]}
            />
          )}
        />
        <Text
          style={[
            gs.ph15,
            gs.fs13,
            {color: ts.secondarytext, fontFamily: ts.secondaryregular},
            gs.mv15,
          ]}>
          Manage
        </Text>
        <DrawerItem
          label={() => (
            <Flex
              direction="row"
              justifyContent="space-between"
              alignItems="center">
              <Text
                style={{
                  ...styles.label,
                  color: focused === 'Subscription' ? '#fff' : ts.primarytext,
                }}>
                Subscription
              </Text>
              <EntypoIcons
                name="chevron-small-right"
                style={{
                  ...styles.righticon,
                  color: focused === 'Subscription' ? '#fff' : ts.primarytext,
                }}
              />
            </Flex>
          )}
          focused={focused === 'Subscription'}
          activeTintColor="#fff"
          activeBackgroundColor={theme}
          onPress={() => {
            props.navigation.navigate('Subscription');
          }}
          labelStyle={styles.label}
          inactiveTintColor={ts.primarytext}
          style={{
            ...styles.labelcontainer,
            backgroundColor: focused !== 'Subscription' ? '#f5f5f5' : theme,
            borderWidth: focused !== 'Subscription' ? 0.5 : 0,
            borderColor: focused !== 'Subscription' ? '#999' : '#fff',
          }}
          icon={() => (
            <MaterialIcons
              name="currency-rupee"
              style={[
                gs.fs20,
                {
                  color: focused === 'Subscription' ? '#fff' : ts.secondarytext,
                },
              ]}
            />
          )}
        />
        <DrawerItem
          label={() => (
            <Flex
              direction="row"
              justifyContent="space-between"
              alignItems="center">
              <Text
                style={{
                  ...styles.label,
                  color: focused === 'Settings' ? '#fff' : ts.primarytext,
                }}>
                Settings
              </Text>
              <EntypoIcons
                name="chevron-small-right"
                style={{
                  ...styles.righticon,
                  color: focused === 'Settings' ? '#fff' : ts.primarytext,
                }}
              />
            </Flex>
          )}
          focused={focused === 'Settings'}
          activeTintColor="#fff"
          activeBackgroundColor={theme}
          onPress={() => {
            props.navigation.navigate('Settings');
          }}
          labelStyle={styles.label}
          inactiveTintColor={ts.primarytext}
          style={[{
            ...styles.labelcontainer,
            backgroundColor: focused !== 'Settings' ? '#f5f5f5' : theme,
            borderWidth: focused !== 'Settings' ? 0.5 : 0,
            borderColor: focused !== 'Settings' ? '#999' : '#fff',
          },gs.mb20]}
          icon={() => (
            <MaterialIcons
              name="settings"
              style={[
                gs.fs20,
                {
                  color: focused === 'Settings' ? '#fff' : ts.secondarytext,
                },
              ]}
            />
          )}
        />
      </DrawerContentScrollView>
    </View>
  );
}
const styles = ScaledSheet.create({
  label: {
    fontSize: '15@ms',
    fontFamily: ts.secondaryregular,
    marginLeft: '-20@ms',
  },
  labelcontainer: {
    height: '50@ms',
    borderRadius: '10@ms',
    justifyContent: 'center',
  },
  righticon: {
    fontSize: '24@ms',
    color: '#fff',
    marginRight: '-25@ms',
  },
  profileimg: {
    height: '45@ms',
    width: '45@ms',
    borderRadius: '5@ms',
  },
});
