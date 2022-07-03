import { StyleSheet } from 'react-native';
import { ApplicationStyles, Metrics } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    padding: Metrics.baseMargin,
  },
  // header: {
  //   marginTop: Metrics.navBarHeight,
  //   paddingVertical: 20,
  //   paddingHorizontal: 10,
  //   backgroundColor: Colors.mandarin,
  //   flexDirection: 'row',
  // },
  // cover: {
  //   alignSelf: 'center',
  //   shadowOffset: { width: 2, height: 2, },
  //   shadowOpacity: 0.59,
  //   shadowColor: Colors.coal,
  //   shadowRadius: 3,
  // },
  // textBox: {
  //   flex: 1,
  //   justifyContent: 'space-between',
  // },
  // text: {
  //   color: Colors.snow,
  // },
  // title: {
  //   fontSize: 18,
  // },
  // author: {
  //   fontStyle: 'italic',
  // },
  // reading: {

  // },
  // track: {
  //   flexDirection: 'row',
  //   paddingVertical: Metrics.baseMargin,
  //   borderBottomWidth: 1,
  //   borderColor: 'rgba(200,200,200,0.75)',
  // },
  // button: {
  //   width: 32,
  //   height: 32,
  //   borderRadius: 16,
  //   padding: 0,
  //   paddingLeft: 11,
  // },
  // sliderBox: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   height: 40,
  //   paddingHorizontal: 10,
  //   borderColor: 'rgba(200,200,200,0.75)',
  //   borderTopWidth: 1,
  // },
  // slider: {
  //   flex: 1,
  //   marginHorizontal: 10,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   flexDirection: 'row',
  // },
  // label: {
  //   fontSize: 12,
  //   color: Colors.mandarin,
  // },
  activity: {
    position: 'absolute',
    top: 60,
    left: (Metrics.screenWidth / 2) - 10,
  }
});
