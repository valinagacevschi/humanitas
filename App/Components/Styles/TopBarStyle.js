import { StyleSheet, Platform } from 'react-native';
import { Metrics, Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        paddingTop: Metrics.doubleBaseMargin,
        paddingHorizontal: 5,
      },
      android: {
        paddingTop: 0,
      },
    }),
    height: Metrics.navBarHeight,
    backgroundColor: Colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: Colors.snow,
    backgroundColor: Colors.transparent,
    fontWeight: 'bold',
    fontSize: Fonts.size.input,
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'ios' ? 0 : 9,
  },
  button: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 0 : 9,
  },
});
