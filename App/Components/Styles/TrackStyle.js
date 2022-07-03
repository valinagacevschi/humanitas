import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  track: {
    flexDirection: 'row',
    paddingVertical: Metrics.baseMargin,
    borderBottomWidth: 1,
    borderColor: 'rgba(200,200,200,0.75)',
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    padding: 0,
    paddingLeft: 11,
  },
  rowWrapper: {
    flex: 1,
    marginLeft: 12
  },
  rowCap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rowText: {
    paddingVertical: 5
  },
  rowDur: {
    textAlign: 'right',
    fontSize: 12,
    color: Colors.orange
  },    
});
