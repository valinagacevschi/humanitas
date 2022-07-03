import { StyleSheet, Platform } from 'react-native';
import { Metrics, ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    marginTop: Metrics.navBarHeight, //- (Platform.OS === 'ios' ? 10 : 15),
  },
  contentContainer: {
    //paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.doubleBaseMargin,
  },
  grid: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  // progress: {
  //   justifyContent: 'space-around',
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   height: 32,
  //   flex: 1,
  //   alignItems: 'center',
  //   backgroundColor: Colors.snow,
  //   paddingBottom: 3,
  // },
  // progText: {
  //   fontSize: 11,
  //   fontStyle: 'italic',
  //   paddingHorizontal: 10,
  // },
});
