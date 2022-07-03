import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  fontButton: {
    flex: 1,
    height: 42,
    justifyContent: 'center',
    borderColor: Colors.steel,
    borderWidth: Metrics.borderWidth,
    borderRightWidth: 0,
  },
  fontText: {
    alignSelf: 'center',
    fontFamily: 'Georgia',
  },
  first: {
    borderTopLeftRadius: Metrics.margin,
    borderBottomLeftRadius: Metrics.margin,
  },
  last: {
    borderRightWidth: Metrics.borderWidth,
    borderTopRightRadius: Metrics.margin,
    borderBottomRightRadius: Metrics.margin,
  },
  selected: {
    backgroundColor: 'rgba(250, 200, 12, 0.6)',
  }
});
