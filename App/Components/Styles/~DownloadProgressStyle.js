import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  progress: {
    flex: 1,
    bottom: 0,
    left: 0,
    right: 0,
    height: 32,
    position: 'absolute',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 3,
    backgroundColor: Colors.snow,
  },
  progText: {
    fontSize: 11,
    fontStyle: 'italic',
    paddingHorizontal: Metrics.baseMargin,
  },
});
