import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './Styles/CornerStyle';

const Corner = () => (
  <View style={styles.corner}>
    <Icon name='cloud-download' size={13} style={styles.cloud} />
  </View>
);

export default Corner;
