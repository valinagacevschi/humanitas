import { StyleSheet } from 'react-native';
import { ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
  },
  reader: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#3F3F3C'
  },
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 55,
  },
  centering: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
