import { StyleSheet } from 'react-native';
import { Metrics } from '../../Themes/';

export default StyleSheet.create({
  bookScroller: {
    // height: 130,
    paddingHorizontal: Metrics.baseMargin,
  },
  label: {
    marginVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
    color: 'rgba(10,10,10,0.75)',
    fontSize: 16
  },
});
