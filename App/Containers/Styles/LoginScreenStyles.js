import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topBgr: {
    position: 'absolute',
    top: 0
  },
  decoration: {
    position: 'absolute',
    top: 0,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  container: { },
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: Metrics.screenWidth / 2,
    height: Metrics.screenWidth / 5,
    // marginTop: 40,
  },
  form: {
    margin: Metrics.baseMargin,
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin - 25,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  wrapperStyle: {
    borderBottomColor: Colors.coal,
    borderBottomWidth: 0.75,
  },
  inputStyle: {
    color: Colors.coal,
  },
  labelStyle: {
    color: Colors.coal,
    marginBottom: 3,
    fontWeight: 'normal'
  },
  loginRow: {
    paddingVertical: Metrics.doubleBaseMargin,
    marginHorizontal: Metrics.doubleBaseMargin,
  },
  button: {
    backgroundColor: Colors.orange,
    alignSelf: 'stretch',
    justifyContent: 'center',
    //marginHorizontal: Metrics.section,
    //marginVertical: Metrics.doubleBaseMargin,
    height: 45,
    borderRadius: 40,
  },
  facebook: {
    backgroundColor: Colors.facebook,
    alignSelf: 'stretch',
    justifyContent: 'center',
    //marginHorizontal: Metrics.section,
    //marginVertical: Metrics.doubleBaseMargin,
    height: 45,
    borderRadius: 40,
  },
  fbText: {
    fontSize: Fonts.size.normal,
    color: Colors.snow,
  },
  link: {
    borderBottomWidth: 0,
    marginTop: 25,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  linkText: {
    color: Colors.coal,
    fontWeight: 'bold',
  },
  bottomLink: {
    paddingVertical: 5,
    // marginTop: 10,
    position: 'absolute',
    bottom: 10,
  },
});
