import { StyleSheet } from 'react-native';
import { Metrics } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  progress: {
    position: 'absolute',
    bottom: Metrics.screenHeight / 2 - 30,
    left: Metrics.screenWidth / 2 - 30,
  },
  text: { 
    fontSize: 20, 
    fontWeight: '500' 
  }
});
