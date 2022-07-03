import React, { Component } from 'react';
// import PropTypes from 'prop-types';;
import { View } from 'react-native';
import * as Prog from 'react-native-progress';
import styles from './Styles/ProgressStyle';
import { Colors, Metrics } from '../Themes';

export default class Progress extends Component {
  render() {
    return (
      <View style={styles.progress} >
        <Prog.Circle
          size={Metrics.screenWidth / 3.5}
          color={Colors.mandarin}
          strokeCap={'round'}
          borderWidth={0}
          thickness={6}
          showsText
          textStyle={styles.text}
          progress={this.props.progress}
        />
      </View>
    );
  }
}
