import { StyleSheet, Platform } from 'react-native';
import { Colors } from '../../Themes/';

export default StyleSheet.create({
  coverBox: {
    overflow: Platform.OS === 'ios' ? 'hidden' : 'visible'
  },
  cover: {
    overflow: 'visible',
    backgroundColor: Colors.transparent,
    justifyContent: 'center',
    alignItems: 'center'
    // borderColor: 'red',
    // borderWidth: 1
  },
  hum: {
    position: 'absolute',
    backgroundColor: Colors.light,
    justifyContent: 'center',
    // borderColor: Colors.silver,
    // borderWidth: 1
  },
  humText: {
    fontSize: 72,
    color: Colors.snow,
    alignSelf: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Cochin' : 'serif'
  }
});
