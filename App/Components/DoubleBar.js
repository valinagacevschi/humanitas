import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-material-ui';
import styles from './Styles/DoubleBarStyle';

export default class DoubleBar extends Component {
  render() {
    return (
      <View style={styles.leftBar} >
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => (this.props.onPressBack ? this.props.onPressBack() : this.context.goBack())}
        >
          <Icon name="arrow-back" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => this.context.reset('home')}>
          <Icon name="home" />
        </TouchableOpacity>
      </View>
    );
  }
}

DoubleBar.contextTypes = {
  goBack: PropTypes.func,
  reset: PropTypes.func,
};
