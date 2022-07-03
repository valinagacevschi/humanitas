import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './Styles/DrawerButtonStyles';

const DrawerButton = (props) => (
  <TouchableOpacity style={{ ...props.boxStyle }} onPress={props.onPress}>
    <Text style={[styles.text, { ...props.style }]}>{props.text}</Text>
  </TouchableOpacity>
);

export default DrawerButton;
