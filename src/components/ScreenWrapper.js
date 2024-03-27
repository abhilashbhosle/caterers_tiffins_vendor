import {useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {StatusBar, Platform} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {ts} from '../../ThemeStyles';
import {useSelector} from 'react-redux';
export const ScreenWrapper = ({children}) => {
  // we obtain the object that contains info about the current route
  const route = useRoute();
  const flow = useSelector(state => state.common.flow);
  const theme = flow == 'catering' ? ts.secondary : ts.primary;
  useFocusEffect(
    useCallback(() => {
      switch (route.name) {
        case 'Welcome':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'OnboardNested':
          StatusBar.pushStackEntry({
            barStyle: 'dark-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && '#fff',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'Dashboard':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'Inquiries':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'Business Profile':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'Branches':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'Manage Occassions':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'Manage Cuisine':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'Packages':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'Reviews':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'Photo Gallery':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'Settings':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'Subscription':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'AddCuisine':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'AddOccasions':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'AddBranch':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'Notification':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
          case 'HelpDesk':
            StatusBar.pushStackEntry({
              barStyle: 'light-content',
              animated: true,
              hidden: false,
              backgroundColor: Platform.OS == 'android' && 'transparent',
              translucent: Platform.OS == 'android' && true,
            });
            break;
        case 'AboutUs':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        case 'Faq':
          StatusBar.pushStackEntry({
            barStyle: 'light-content',
            animated: true,
            hidden: false,
            backgroundColor: Platform.OS == 'android' && 'transparent',
            translucent: Platform.OS == 'android' && true,
          });
          break;
        default:
          StatusBar.pushStackEntry({barStyle: 'light-content', hidden: true});
      }
    }, []),
  );

  // we are applying the background color to the component itself
  return (
    <>
      <StatusBar />
      {children}
    </>
  );
};
