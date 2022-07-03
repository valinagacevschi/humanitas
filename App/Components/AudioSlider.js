import React, { Component } from 'react';
// import PropTypes from 'prop-types';;
import { View, Text, Slider } from 'react-native';
import { hhmmss } from '../Lib/Util';
import styles from './Styles/AudioSliderStyle';
import { Colors } from '../Themes';

export default class AudioSlider extends Component {
  render() {
    const { progress, duration, currentTime } = this.props;
    return (
      <View style={styles.sliderBox}>
        <Text style={styles.label}>{hhmmss(currentTime)}</Text>
        <Slider
          value={progress}
          onValueChange={this.props.onValueChange}
          style={styles.slider}
          thumbTintColor={Colors.orange}
        />
        <Text style={styles.label}>{hhmmss(duration)}</Text>
      </View>
    );
  }
}
