import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Animated,
  StatusBar,
  Platform,
  Dimensions,
  Image,
  PanResponder
} from 'react-native';
// import { connect } from 'react-redux';
// import AlertActions from '../Redux/AlertRedux';
import { Images, Colors } from '../Themes';
// import PropTypes from 'prop-types';

const StatusBarDefaultBarStyle = StatusBar._defaultProps.barStyle.value;
const StatusBarDefaultBackgroundColor = StatusBar._defaultProps.backgroundColor.value;
const DEFAULT_IMAGE_DIMENSIONS = 36;
const WINDOW = Dimensions.get('window');
let closeTimeoutId = null;
let panResponder;

export default class DropdownAlert extends Component {
  static defaultProps = {
    onClose: null,
    onCancel: null,
    closeInterval: 2500,
    startDelta: -100,
    endDelta: 0,
    titleNumOfLines: 1,
    messageNumOfLines: 3,
    imageSrc: null,
    cancelBtnImageSrc: null, //require('./assets/cancel.png'),
    infoColor: Colors.coal, //'#2B73B6',
    warnColor: '#cd853f',
    errorColor: '#cc3232',
    successColor: '#32A54A',
    showCancel: false,
    tapToCloseEnabled: true,
    panResponderEnabled: true,
    replaceEnabled: true,
    containerStyle: {
      padding: 16,
      flexDirection: 'row'
    },
    titleStyle: {
      fontSize: 16,
      textAlign: 'left',
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: 'transparent'
    },
    messageStyle: {
      fontSize: 14,
      textAlign: 'left',
      fontWeight: 'normal',
      color: 'white',
      backgroundColor: 'transparent'
    },
    imageStyle: {
      padding: 8,
      width: DEFAULT_IMAGE_DIMENSIONS,
      height: DEFAULT_IMAGE_DIMENSIONS,
      alignSelf: 'center'
    },
    cancelBtnImageStyle: {
      padding: 8,
      width: DEFAULT_IMAGE_DIMENSIONS,
      height: DEFAULT_IMAGE_DIMENSIONS,
      alignSelf: 'center'
    },
    translucent: false,
    activeStatusBarStyle: 'light-content',
    activeStatusBarBackgroundColor: StatusBarDefaultBackgroundColor,
    inactiveStatusBarStyle: StatusBarDefaultBarStyle,
    inactiveStatusBarBackgroundColor: StatusBarDefaultBackgroundColor,
    updateStatusBar: true
  };

  constructor(props) {
    super(props);
    this.state = {
      animationValue: new Animated.Value(0),
      duration: 450,
      type: '',
      message: '',
      title: '',
      isOpen: false,
      startDelta: props.startDelta,
      endDelta: props.endDelta,
      topValue: 0
    };
  }

  componentWillMount() {
    panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd
    });
  }

  alert = (title, message) => {
    if (title === undefined) {
      title = null;
    }
    if (message === undefined) {
      message = null;
    }
    this.alertWithType('custom', title, message);
  }

  alertWithType = (type, title, message) => {
    if (this.validateType(type) === false) {
      return;
    }
    if (typeof title !== 'string') {
      title = title.toString();
      console.warn('DropdownAlert: Title is not a string.');
    }
    if (typeof message !== 'string') {
      message = message.toString();
      console.warn('DropdownAlert: Message is not a string.');
    }
    if (this.props.replaceEnabled === false) {
      this.setState({
        type,
        message,
        title,
        isOpen: true,
        topValue: 0
      });
      if (this.state.isOpen === false) {
        this.animate(1);
      }
      if (this.props.closeInterval > 1) {
        if (closeTimeoutId != null) {
          clearTimeout(closeTimeoutId);
        }
        const that = this;
        closeTimeoutId = setTimeout(() => that.onClose('automatic'), this.props.closeInterval);
      }
    } else {
      let delayInMilliSeconds = 0;
      if (this.state.isOpen === true) {
        delayInMilliSeconds = 475;
        this.dismiss();
      }
      const self = this;
      setTimeout(() => {
        if (self.state.isOpen === false) {
          self.setState({
            type,
            message,
            title,
            isOpen: true,
            topValue: 0
          });
        }
        self.animate(1);
        if (self.props.closeInterval > 1) {
          closeTimeoutId = setTimeout(() => self.onClose('automatic'), self.props.closeInterval);
        }
      }, delayInMilliSeconds);
    }
  }

  dismiss = (onDismiss, action) => {
    if (this.state.isOpen) {
      if (closeTimeoutId != null) {
        clearTimeout(closeTimeoutId);
      }
      this.animate(0);
      const that = this;
      setTimeout(() => {
        if (that.state.isOpen) {
          that.setState({
            isOpen: false
          });
          if (that.props.updateStatusBar) {
            if (Platform.OS === 'android') {
              StatusBar.setBackgroundColor(that.props.inactiveStatusBarBackgroundColor, true);
            } else {
              StatusBar.setBarStyle(that.props.inactiveStatusBarStyle, true);
            }
          }
          if (onDismiss) {
            const data = {
              type: that.state.type,
              title: that.state.title,
              message: that.state.message,
              action
            };
            // !!! How the alert was dismissed: automatic, programmatic, tap, pan or cancel
            onDismiss(data);
          }
        }
      }, this.state.duration);
    }
  }

  onClose = (action) => {
    if (action === undefined) {
      action = 'programmatic';
    }
    this.dismiss(this.props.onClose, action);
  }

  onCancel = () => {
    this.dismiss(this.props.onCancel, 'cancel');
  }

  animate = (toValue) => {
    Animated.spring(this.state.animationValue, {
      toValue,
      duration: this.state.duration,
      friction: 9,
      useNativeDriver: Platform.OS === 'ios'
    }).start();
  }

  onLayoutEvent = (event) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    let actualStartDelta = this.state.startDelta;
    let actualEndDelta = this.state.endDelta;
    // Prevent it from going off screen.
    if (this.props.startDelta < 0) {
      const delta = 0 - height;
      if (delta !== this.props.startDelta) {
        actualStartDelta = delta;
      }
    } else if (this.props.startDelta > WINDOW.height) {
      actualStartDelta = WINDOW.height + height;
    }
    if (this.props.endDelta < 0) {
      actualEndDelta = 0;
    } else if (this.props.endDelta > WINDOW.height) {
      actualEndDelta = WINDOW.height - height;
    }
    const heightDelta = WINDOW.height - this.props.endDelta - height;
    if (heightDelta < 0) {
      actualEndDelta = this.props.endDelta + heightDelta;
    }
    if (actualStartDelta !== this.state.startDelta || actualEndDelta !== this.state.endDelta) {
      this.setState({
        startDelta: actualStartDelta,
        endDelta: actualEndDelta
      });
    }
  }

  validateType = (type) => {
    if (type.length === 0 || type === null) {
      console.warn('Missing DropdownAlert type. Available types: info, warn, error or custom');
      return false;
    }
    if (
      type !== 'info' &&
      type !== 'warn' &&
      type !== 'error' &&
      type !== 'custom' &&
      type !== 'success'
    ) {
      console.warn(
        'Invalid DropdownAlert type. Available types: info, warn, error, success, or custom'
      );
      return false;
    }
    return true;
  }

  handleStartShouldSetPanResponder = (e: Object, gestureState: Object): boolean => 
    this.props.panResponderEnabled;

  handleMoveShouldSetPanResponder = (e: Object, gestureState: Object): boolean => 
    (gestureState.dx !== 0 && gestureState.dy !== 0 && this.props.panResponderEnabled);

  handlePanResponderMove = (e: Object, gestureState: Object) => {
    if (gestureState.dy < 0) {
      this.setState({
        topValue: gestureState.dy
      });
    }
  }

  handlePanResponderEnd = (e: Object, gestureState: Object) => {
    const delta = this.state.startDelta / 5;
    if (gestureState.dy < delta) {
      this.dismiss(this.props.onClose, 'pan');
    }
  }

  renderText = (text, style, numberOfLines) => {
    if (text != null) {
      if (text.length > 0) {
        return (
          <Text style={style} numberOfLines={numberOfLines}>
            {text}
          </Text>
        );
      }
    }
    return null;
  }

  renderImage = (source, style) => {
    if (source != null) {
      if (typeof source === 'number') {
        return <Image style={style} source={source} />;
      } else if (typeof source === 'string') {
        if (style.width === false) {
          style.width = DEFAULT_IMAGE_DIMENSIONS;
        }
        if (style.height === false) {
          style.height = DEFAULT_IMAGE_DIMENSIONS;
        }
        return <Image style={style} source={{ uri: source }} />;
      }
    }
    return null;
  }

  renderStatusBar = (backgroundColor, barStyle, translucent) => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(backgroundColor, true);
      StatusBar.setTranslucent(translucent);
    } else if (Platform.OS === 'ios') {
      StatusBar.setBarStyle(barStyle, true);
    }
  }

  renderButton = (source, style, onPress, underlayColor, isRendered) => {
    if (source && isRendered) {
      return (
        <TouchableHighlight
          style={{ alignSelf: style.alignSelf, width: style.width, height: style.height }}
          onPress={onPress}
          underlayColor={underlayColor}
        >
          {this.renderImage(source, style)}
        </TouchableHighlight>
      );
    }
    return null;
  }

  renderDropDown = (isOpen) => {
    if (isOpen === true) {
      let style = [styles.defaultContainer, StyleSheet.flatten(this.props.containerStyle)];
      let source = this.props.imageSrc;
      let backgroundColor = this.props.containerStyle.backgroundColor;
      switch (this.state.type) {
        case 'info':
          style = [styles.defaultContainer, { backgroundColor: this.props.infoColor }];
          source = Images.info;
          backgroundColor = this.props.infoColor;
          break;
        case 'warn':
          style = [styles.defaultContainer, { backgroundColor: this.props.warnColor }];
          source = Images.warn;
          backgroundColor = this.props.warnColor;
          break;
        case 'error':
          style = [styles.defaultContainer, { backgroundColor: this.props.errorColor }];
          source = Images.error;
          backgroundColor = this.props.errorColor;
          break;
        case 'success':
          style = [styles.defaultContainer, { backgroundColor: this.props.successColor }];
          source = Images.success;
          backgroundColor = this.props.successColor;
          break;
        default:
          break;
      }
      let activeStatusBarBackgroundColor = this.props.activeStatusBarBackgroundColor;
      if (Platform.OS === 'android') {
        if (this.props.translucent) {
          style = [style, { paddingTop: StatusBar.currentHeight }];
        }
        if (this.state.type !== 'custom') {
          activeStatusBarBackgroundColor = backgroundColor;
        }
      }
      if (this.props.updateStatusBar) {
        this.renderStatusBar(
          activeStatusBarBackgroundColor,
          this.props.activeStatusBarStyle,
          this.props.translucent
        );
      }
      return (
        <Animated.View
          ref={ref => (this.mainView = ref)}
          {...panResponder.panHandlers}
          style={{
            transform: [
              {
                translateY: this.state.animationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.state.startDelta, this.state.endDelta]
                })
              }
            ],
            position: 'absolute',
            top: this.state.topValue,
            left: 0,
            right: 0
          }}
        >
          <TouchableHighlight
            onPress={this.props.showCancel ? null : () => this.onClose('tap')}
            underlayColor={backgroundColor}
            disabled={!this.props.tapToCloseEnabled}
            onLayout={event => this.onLayoutEvent(event)}
          >
            <View style={style}>
              {this.renderImage(source, StyleSheet.flatten(this.props.imageStyle))}
              <View style={styles.textContainer}>
                {this.renderText(
                  this.state.title,
                  StyleSheet.flatten(this.props.titleStyle),
                  this.props.titleNumOfLines
                )}
                {this.renderText(
                  this.state.message,
                  StyleSheet.flatten(this.props.messageStyle),
                  this.props.messageNumOfLines
                )}
              </View>
              {this.renderButton(
                this.props.cancelBtnImageSrc,
                StyleSheet.flatten(this.props.cancelBtnImageStyle),
                this.onCancel,
                backgroundColor,
                this.props.showCancel
              )}
            </View>
          </TouchableHighlight>
        </Animated.View>
      );
    }
    return null;
  }

  render() {
    return this.renderDropDown(this.state.isOpen);
  }
}

const styles = StyleSheet.create({
  defaultContainer: {
    padding: 8,
    paddingTop: Platform.OS === 'android' ? 0 : 20,
    flexDirection: 'row'
  },
  textContainer: {
    flex: 1,
    padding: 8
  }
});

// const mapStateToProps = state => ({
//   alert: state.alert
// });

// const mapDispatchToProps = dispatch => ({
//   clear: () => dispatch(AlertActions.alertClear())
// });

// export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(DropdownAlert);
