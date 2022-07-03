import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  link: {
    alignSelf: 'center',
    borderBottomColor: Colors.snow,
    borderBottomWidth: 0.9,
    paddingHorizontal: 3,
  },
  linkText: {
    color: Colors.snow,
    backgroundColor: Colors.transparent,
    textAlign: 'center',
    fontSize: Fonts.size.normal,
  }
});
