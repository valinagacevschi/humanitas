import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    paddingVertical: Metrics.doubleBaseMargin + 10,
  },
  contentContainer: {
    flex: 1,
  },
  userCard: {
    flexDirection: 'row',
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    borderColor: '#999',
    borderBottomWidth: 0.6
  },
  userImage: {
    borderRadius: 30,
    width: 60,
    height: 60
  },
  header: {
    marginVertical: Metrics.baseMargin,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    ...Fonts.style.h5,
    color: Colors.coal,
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  icon: {
    marginTop: 12,
    marginRight: 10,
    color: Colors.coal,
    fontSize: 18,
  },
});
