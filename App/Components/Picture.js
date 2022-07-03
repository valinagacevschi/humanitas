import React from 'react';
import { View, Text, Platform } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import Corner from './Corner';
import { cover } from '../Config/';
import styles from './Styles/PictureStyle';

export default class Picture extends React.Component {
  setNativeProps(nativeProps) {
    if (this.root !== undefined) {
      this.root.setNativeProps(nativeProps);
    }
  }

  render() {
    const bookHeight = Platform.OS === 'ios' ? 200 : 200;
    const isAudio = this.props.book.tip === 'audio';
    const width = this.props.large ? 130 : 85;
    const height = isAudio ? width : this.props.large ? bookHeight : 130;
    const marginRight = this.props.large ? 0 : 15;
    const uri = cover(this.props.book, 'thumb');
    const { mine, empty } = this.props;
    return (
      <View ref={comp => (this.root = comp)} style={[styles.coverBox]}>
        <View style={[styles.hum, { height, width }]}>
          <Text style={styles.humText}>H</Text>
        </View>
        <CachedImage
          resizeMode="cover"
          source={{ uri, cache: 'force-cache' }}
          style={[styles.cover, { height, width, marginRight }, this.props.style]}
        />
        {mine && empty && <Corner />}
      </View>
    );
  }
}
