import { StyleSheet } from 'react-native';
import { ApplicationStyles, Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.snow,
  },
  grid: {
    paddingTop: 15,
    paddingBottom: 10,
    justifyContent: 'space-around',
  },
});
