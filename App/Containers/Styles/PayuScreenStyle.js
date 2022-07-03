import { StyleSheet } from 'react-native';
import { ApplicationStyles, Metrics } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  // container: {
  //   flex: 1,
  //   marginTop: Metrics.navBarHeight,
  // },
  webview: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
  },
  indicator: {
    position: 'absolute',
    top: 200,
    left: 150,
  },
});
