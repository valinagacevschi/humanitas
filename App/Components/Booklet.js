import React from 'react';
import { View, Text } from 'react-native';
import Cover from './Cover';
import styles from './Styles/BookletStyle';

const Booklet = (props) => {
  const { book, index } = props;
  const height = book.tip === 'epub' ? 280 : 210; //340 : 270;
  return (
    <View key={index} style={[styles.gridItem, { height }]}>
      <Cover key={index} book={book} large />
      <View style={styles.band}>
        <Text style={styles.price}>{`${book.pret} Lei`}</Text>
      </View>
      <View style={styles.texts}>
        <Text numberOfLines={1} style={styles.author}>
          {book.name.toUpperCase()}
        </Text>
        <Text numberOfLines={2} style={styles.title}>
          {book.titlu} {book.subtitlu && `- ${book.subtitlu}`}
        </Text>
      </View>
    </View>
  );
};

export default Booklet;
