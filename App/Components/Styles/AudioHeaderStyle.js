import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    marginTop: Metrics.navBarHeight,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: Colors.mandarin,
    flexDirection: 'row',
  },
  cover: {
    alignSelf: 'center',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.59,
    shadowColor: Colors.coal,
    shadowRadius: 3,
  },
  textBox: {
    flex: 1,
    justifyContent: 'space-between',
  },
  text: {
    color: Colors.snow,
  },
  title: {
    fontSize: 18,
  },
  author: {
    fontStyle: 'italic',
  },
  reading: {

  },  
});
