import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  corner: {
    position: 'absolute',
    width: 60,
    height: 60,
    top: -30,
    left: -30,
    backgroundColor: Colors.orange,
    transform: [{ rotate: '45deg' }],
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  cloud: {
    color: Colors.snow,
    transform: [{ rotate: '-45deg' }],
    marginRight: 6,
  }
});
