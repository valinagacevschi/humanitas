import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 40,
    // marginHorizontal: Metrics.section,
    marginBottom: Metrics.doubleBaseMargin,
    backgroundColor: Colors.orange,
    borderColor: Colors.orange,
    borderWidth: 0.9,
    justifyContent: 'center'
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.normal,
    marginVertical: Metrics.baseMargin
  }
});
