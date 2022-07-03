import { StyleSheet, Platform } from 'react-native';
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
  },
  grid: {
    // paddingTop: 20,
    // justifyContent: 'space-around',
    // alignItems: 'flex-end',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    marginHorizontal: Metrics.baseMargin,
    paddingVertical: 20,
  },
  gridItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 0, // Metrics.smallMargin,
    width: 130,
    borderBottomWidth: 2,
    borderColor: '#ff9900',
    marginBottom: Metrics.baseMargin,
  },
  author: {
    fontSize: Fonts.size.small,
    color: Colors.coal,
    textAlign: 'center',
  },
  title: {
    fontSize: Fonts.size.normal,
    color: Colors.coal,
    textAlign: 'center',
    paddingVertical: Metrics.baseMargin,
  },
  delete: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: -9,
        right: -7,
      },
      android: {
        top: 5,
        right: 5,
      }
    }),
    width: 20,
    height: 20,
    backgroundColor: Colors.mandarin,
    borderRadius: 10,
    borderColor: Colors.mandarin,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
  delIcon: {
    color: Colors.snow,
    fontSize: 11,
    fontWeight: 'normal',
  },
});
