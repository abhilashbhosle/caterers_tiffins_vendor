import {getFlow} from '../../redux/slicers/CommomSlicer';
export const setFlow = async (state, dispatch, navigation) => {
  try {
    dispatch(getFlow(state));
    navigation.navigate('OnboardNested');
  } catch (error) {
    console.log('error in setting flow', error);
  }
};
