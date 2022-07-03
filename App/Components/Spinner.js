import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator
      animating
      style={{ height: 180 }}
      size='large'
    />
  </View>
);

export default Spinner;
