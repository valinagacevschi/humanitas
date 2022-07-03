import { StyleSheet, Dimensions } from 'react-native';
import { Metrics, Fonts } from '../../Themes/';

const { height, width } = Dimensions.get('window');

const HIGHLIGHT_COLOR = 'rgba(0,118,255,0.9)';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding
  },

  overlayStyle: {
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.7)'
  },

  optionContainer: {
    left: width * 0.05,
    top: Metrics.modalTopMargin - 10,
    width: width * 0.9,
    height: Metrics.modalContainerHeight,
    borderRadius: Metrics.smallMargin,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },

  cancelContainer: {
    left: width * 0.05,
    top: Metrics.modalTopMargin,
  },

  selectStyle: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    borderRadius: Metrics.smallMargin
  },

  selectTextStyle: {
    textAlign: 'center',
    color: '#333',
    fontSize: Fonts.size.input
  },

  cancelStyle: {
    borderRadius: Metrics.smallMargin,
    width: width * 0.9,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: Metrics.baseMargin
  },

  cancelTextStyle: {
    textAlign: 'center',
    color: '#333',
    fontSize: Fonts.size.input
  },

  optionStyle: {
    padding: Metrics.baseMargin,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },

  optionTextStyle: {
    textAlign: 'center',
    fontSize: Fonts.size.input,
    color: HIGHLIGHT_COLOR
  },

  sectionStyle: {
    padding: Metrics.doubleBaseMargin,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },

  sectionTextStyle: {
    textAlign: 'center',
    fontSize: Fonts.size.input
  }
});
