import { Dimensions, Platform, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

export const isIphoneX = () => (
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  ((height === 812 || width === 812) || (height === 896 || width === 896))
);


export const getStatusBarHeight = () => Platform.select({
  ios: isIphoneX() ? 44 : 20,
  android: 54 // StatusBar.currentHeight
});

export const getBottomSpace = () => (isIphoneX() ? 34 : 0);

// Used via Metrics.baseMargin
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  margin: 15,
  doubleBaseMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  searchBarHeight: 30,
  width,
  height,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? 44 + getStatusBarHeight() : 54,
  navBarTopMargin: (Platform.OS === 'ios') ? getStatusBarHeight() : 30,
  navBarPadding: 69,
  buttonRadius: 4,
  borderWidth: 0.5,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200
  }
};

export default metrics;
