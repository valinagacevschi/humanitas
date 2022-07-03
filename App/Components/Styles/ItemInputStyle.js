import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    borderColor: Colors.steel,
    borderBottomWidth: 0.95,
    marginVertical: Metrics.baseMargin,
  },
  inputStyle: {
    fontSize: 14.5,
    fontWeight: 'normal',
    height: 28, //Platform.OS === 'ios' ? 28 : 28,
    paddingVertical: 0,
  },
  labelStyle: {
    fontSize: 13,
    color: Colors.steel,
  },
  error: {
    color: Colors.orange
  }
});
