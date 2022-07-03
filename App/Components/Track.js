import React, { Component } from 'react';
// import PropTypes from 'prop-types';;
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';
import { hhmmss } from '../Lib/Util';
import styles from './Styles/TrackStyle';
import { Colors } from '../Themes';

export default class Track extends Component {
  render() {
    const { item, index, current } = this.props;
    return (
      <View style={styles.track}>
        <Icon.Button
          name={item.paused ? 'play' : 'pause'}
          size={12}
          color={Colors.snow}
          backgroundColor={index === current ? Colors.charcoal : Colors.mandarin}
          borderRadius={16}
          style={styles.button}
          onPress={this.props.onPress}
        />
        <View style={styles.rowWrapper}>
          <View style={styles.rowCap}>
            <Text style={styles.rowText}>{I18n.t('chapter')} {item.track}</Text>
            <Text style={styles.rowDur}>{item.duration ? hhmmss(item.duration) : ''}</Text>
          </View>
        </View>
      </View>
    );
  }
}
