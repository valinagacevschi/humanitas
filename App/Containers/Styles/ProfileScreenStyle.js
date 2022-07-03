import { StyleSheet, Platform } from 'react-native';
import { ApplicationStyles, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    marginTop: Metrics.navBarHeight,
    backgroundColor: '#fff'
    // padding: Metrics.baseMargin,
  },
  imageBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Metrics.doubleBaseMargin,
    backgroundColor: 'rgba(210,210,210, 0.6)',
  },
  image: {
    width: 84,
    height: 84,
    borderRadius: 42
  },
  label: {
    borderColor: 'red',
    borderWidth: 1
  },
  form: {
    padding: Metrics.baseMargin,
    backgroundColor: '#fff'
  },
  row: {
    marginTop: Metrics.baseMargin
  },
  button: {
    backgroundColor: Colors.orange,
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 45,
    borderRadius: 40
  },
  fbText: {
    color: Colors.snow,
    fontSize: 18
  },
  inputStyle: {
    flex: 1,
    fontSize: 14.5,
    fontWeight: 'normal',
    height: 48,
    paddingVertical: Platform.OS === 'ios' ? 'auto' : 0,
  },
});
