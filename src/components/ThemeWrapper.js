import React from 'react';
import {ts} from '../../ThemeStyles';
import LinearGradient from 'react-native-linear-gradient';
export default function ThemeWrapper(props) {
  return (
      <LinearGradient
        colors={[ts.secondary, ts.primary]}
        start={{x: 0.0, y: 0.0}}
        end={{x: 1.0, y: 0.0}}
        style={[{flex: 1}]}>
        {props.children}
      </LinearGradient>
  );
}
