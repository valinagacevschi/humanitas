import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '../../Themes/';

export default StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  row: {
    flexDirection: 'row',
    paddingTop: Metrics.baseMargin,
  },
  term: {
    flex: 1,
  },
  def: {
    flex: 2,
    paddingLeft: Metrics.baseMargin,
  },
  termText: {
    fontSize: Fonts.size.normal,
    fontWeight: 'bold',
  },
  defText: {
    fontSize: Fonts.size.normal,
  },
});
