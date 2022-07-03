import { StyleSheet } from 'react-native';
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
  },
  cover: {
    borderRadius: 3,
    shadowRadius: 3,
    shadowColor: Colors.coal,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
  },
  title: {
    ...Fonts.style.h5,
    paddingTop: Metrics.doubleBaseMargin,
    textAlign: 'center',
  },
  author: {
    ...Fonts.style.h6,
    paddingTop: Metrics.smallMargin,
  },
  lecture: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  description: {
    ...Fonts.style.normal,
    paddingTop: Metrics.doubleBaseMargin,
    textAlign: 'justify',
  },
});
