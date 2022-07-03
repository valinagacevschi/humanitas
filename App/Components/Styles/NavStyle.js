import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    height: Metrics.navBarHeight,
    paddingHorizontal: 5,
    backgroundColor: Colors.background,
    borderBottomColor: Colors.background,
    borderBottomWidth: 1,
    // borderColor: 'red',
    // borderWidth: 3,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'left',
    color: Colors.snow,
    backgroundColor: Colors.transparent,
    fontWeight: 'bold',
    fontSize: Fonts.size.input,
    paddingHorizontal: Metrics.baseMargin,
  },
  backButton: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    padding: Metrics.baseMargin,
    overflow: 'hidden',
  },
  title: {
    flex: 1,
  },
  separator: {
    height: 0.4,
    backgroundColor: 'rgba(100,100,100,0.4)',
  },
});
