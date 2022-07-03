import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, View, Text, Platform } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import xstyles from './Styles/BannerStyle';
import { Metrics, Colors } from '../Themes';

export default class Banner extends PureComponent {
  onPress(item) {
    if (item) {
      this.context.goTo('book', { book: item });
    }
  }

  render() {
    const { uri, item } = this.props.item;
    return (
      <TouchableHighlight
        activeOpacity={0.7}
        underlayColor={'rgba(255,255,255,0.1)'}
        onPress={() => this.onPress(item)}
        style={styles.slider}
      >
        <View>
          <View style={styles.hum}>
            <Text style={styles.humText}>H</Text>
          </View>
          <CachedImage source={{ uri }} resizeMode='contain' style={styles.image} />
        </View>
      </TouchableHighlight>
    );
  }
}

Banner.contextTypes = {
  goTo: PropTypes.func
};

const styles = {
  ...xstyles,
  slider: {
    // flex: 1,
  },
  image: {
    height: Metrics.screenWidth / 1.333
    // width: Metrics.screenWidth,
    // alignSelf: 'center',
  },
  hum: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  humText: {
    color: Colors.light,
    fontSize: 144,
    fontFamily: Platform.OS === 'ios' ? 'Cochin' : 'serif'
  }
};
