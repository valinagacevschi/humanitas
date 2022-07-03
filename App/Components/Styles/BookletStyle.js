import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../Themes/';

export default StyleSheet.create({
  gridItem: {
    margin: Metrics.smallMargin,
    width: 150,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#ff9900',
    marginBottom: Metrics.baseMargin
  },
  texts: {
    marginTop: 5,
    flex: 1,
    justifyContent: 'flex-start',
    // borderColor: 'red',
    // borderWidth: 1
  },
  author: {
    fontSize: Fonts.size.small,
    color: Colors.coal,
    textAlign: 'center',
    // borderColor: 'red',
    // borderWidth: 1
  },
  title: {
    fontSize: Fonts.size.normal,
    color: Colors.coal,
    textAlign: 'center',
    paddingVertical: Metrics.baseMargin
  },
  price: {
    color: Colors.snow,
    fontSize: 11
    // ...Fonts.style.h5,
    // fontWeight: 'bold',
    // paddingBottom: Metrics.smallMargin,
  },
  band: {
    backgroundColor: Colors.orange,
    position: 'absolute',
    top: 5,
    left: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
    alignItems: 'flex-start'
  }
});
