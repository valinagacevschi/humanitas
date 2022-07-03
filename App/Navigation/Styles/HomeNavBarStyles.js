import { Platform, StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes/';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Metrics.navBarHeight,
    ...Platform.select({
      ios: {
        paddingTop: Metrics.navBarTopMargin,
      },
    }),
    backgroundColor: Colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: Colors.snow,
    //marginTop: Metrics.doubleBaseMargin,
    backgroundColor: Colors.transparent,
    fontWeight: 'bold',
    fontSize: Fonts.size.input,
  },
  logo: {
    alignSelf: 'center',
    marginTop: Metrics.baseMargin,
    height: Metrics.icons.large,
    width: Metrics.icons.large
  },
  rightButtons: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  leftButtons: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  titleText: {
    color: Colors.snow,
  }
// container: Animated.View.propTypes.style,
// leftElementContainer: View.propTypes.style,
// leftElement: Text.propTypes.style,
// centerElementContainer: Animated.View.propTypes.style,
// titleText: Text.propTypes.style,
// rightElementContainer: View.propTypes.style,
// rightElement: Text.propTypes.style,
});
