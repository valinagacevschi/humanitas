import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './Styles/LinkStyles';

const Link = (props) => (
  <TouchableOpacity style={[styles.link, props.style]} onPress={props.onPress}>
    <Text style={[styles.linkText, props.textStyle]}>
      {props.text || props.children || ''}
    </Text>
  </TouchableOpacity>
);

export default Link;
