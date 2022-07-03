import { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Text, ViewPropTypes } from 'react-native';

export default class BaseInput extends Component {

  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    style: ViewPropTypes.style,
    inputStyle: Text.propTypes.style,
    labelStyle: Text.propTypes.style,
    easing: PropTypes.func,
    animationDuration: PropTypes.number,
    /* those are TextInput props which are overridden
     * so, i'm calling them manually */
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    const value = props.value || props.defaultValue;

    this.state = {
      value,
      focusedAnim: new Animated.Value(value ? 1 : 0),
    };
  }

  componentWillReceiveProps(newProps) {
    const newValue = newProps.value;
    if (newProps.hasOwnProperty('value') && newValue !== this.state.value) {
      this.setState({
        value: newValue,
      });

      // animate input if it's active state has changed with the new value
      // and input is not focused currently.
      const isFocused = this.refs.input.isFocused();
      if (!isFocused) {
        const isActive = Boolean(newValue);
        if (isActive !== this.isActive) {
          this.toggle(isActive);
        }
      }
    }
  }

  onLayout = (event) => {
    this.setState({
      width: event.nativeEvent.layout.width,
    });
  }

  onChange = (event) => {
    this.setState({
      value: event.nativeEvent.text,
    });

    const onChange = this.props.onChange;
    if (onChange) {
      onChange(event);
    }
  }

  onBlur = (event) => {
    if (!this.state.value) {
      this.toggle(false);
    }

    const onBlur = this.props.onBlur;
    if (onBlur) {
      onBlur(event);
    }
  }

  onFocus = (event) => {
    this.toggle(true);

    const onFocus = this.props.onFocus;
    if (onFocus) {
      onFocus(event);
    }
  }

  toggle = (isActive) => {
    this.isActive = isActive;
    Animated.timing(
      this.state.focusedAnim, {
        toValue: isActive ? 1 : 0,
        duration: this.props.animationDuration,
        easing: this.props.easing,
      },
    ).start();
  }

  // public methods

  inputRef = () => this.refs.input;

  focus = () => this.inputRef().focus();

  blur = () => this.inputRef().blur();

  isFocused = () => this.inputRef().isFocused();

  clear = () => this.inputRef().clear();
}
