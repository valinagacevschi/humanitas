import React from 'react';
import { View, Text } from 'react-native';

import styles from './Styles/DefinitionListStyle';

const DefinitionList = (props) => (
  <View style={styles.container}>
    {props.list.map((item, i) => (
      <View key={i} style={styles.row}>
        <View style={styles.term}>
          <Text style={styles.termText}>{item[0]}</Text>
        </View>
        <View style={styles.def}>
          <Text style={styles.defText}>{item[1]}</Text>
        </View>
      </View>
    ))}
  </View>
);

export default DefinitionList;
