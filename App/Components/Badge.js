import React from 'react';
import { View, Text } from 'react-native';
import styles from './Styles/BadgeStyle';

const Badge = (props) => {
  if (props.text === '0') {
    return null;
  }
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

export default Badge;
