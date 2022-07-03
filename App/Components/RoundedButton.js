import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './Styles/RoundedButtonStyles';

const RoundedButton = (props) => (
  <TouchableOpacity style={styles.button} onPress={props.onPress}>
    <Text style={styles.buttonText}>
      {(props.text || props.children || '').toUpperCase()}
    </Text>
  </TouchableOpacity>
);

export default RoundedButton;
