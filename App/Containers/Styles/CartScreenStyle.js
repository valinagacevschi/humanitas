import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  heading: {
    marginTop: Metrics.navBarHeight,
    padding: Metrics.baseMargin,
    backgroundColor: Colors.coal,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderColor: 'red',
    // borderWidth: 1
  },
  headText: {
    color: Colors.snow,
    fontSize: Fonts.size.h5,
    fontWeight: 'bold',
  },
  container: {
    // marginTop: 63,
  },
  cover: {
    marginLeft: 3,
  },
  gridItem: {
    flexDirection: 'row',
    borderColor: 'rgba(100,100,100,0.4)',
    borderBottomWidth: 0.75,
    paddingVertical: 3,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
