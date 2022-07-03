import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import I18n from 'react-native-i18n';
import Picture from '../Components/Picture';
import styles from './Styles/AudioHeaderStyle';

export default class AudioHeader extends Component {
  render() {
    const { titlu, subtitlu, name, sname } = this.props.book;
    return (
      <View style={styles.header}>
        <Picture book={this.props.book} style={styles.cover} />
        <View style={styles.textBox}>
          <Text numberOfLines={2} style={[styles.text, styles.title]}>
            {titlu} {subtitlu && `- ${subtitlu}`}
          </Text>
          <Text numberOfLines={2} style={[styles.text, styles.author]}>
            {name}
          </Text>
          <Text numberOfLines={2} style={[styles.text, styles.reading]}>
            {I18n.t('reading')} {sname}
          </Text>
        </View>
      </View>
    );
  }
}

