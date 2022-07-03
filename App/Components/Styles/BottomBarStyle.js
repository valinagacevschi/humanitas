import { StyleSheet, Platform } from 'react-native';
import { Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  footer: {
    paddingTop: 0,
    bottom: 0,
    ...Platform.select({
      ios: {
        backgroundColor: Colors.transparent,
        height: 34
      },
      android: {
        backgroundColor: Colors.snow,
        height: 24,
        borderTopWidth: 1,
        borderTopColor: 'rgba(100,100,100,0.5)'
      }
    }),
    right: 0,
    left: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  page: {
    marginLeft: 15,
    fontSize: 12,
  }
});
