import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  sliderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: Metrics.baseMargin,
    borderColor: 'rgba(200,200,200,0.75)',
    borderTopWidth: 1,
  },
  slider: {
    flex: 1,
    marginHorizontal: Metrics.baseMargin,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  label: {
    fontSize: 12,
    color: Colors.mandarin,
  },
});
