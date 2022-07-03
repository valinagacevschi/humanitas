import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/MaterialIcons';
import xstyles from './Styles/BookmarkListStyle';

export default class BookmarkList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: props.bookmarks && [...props.bookmarks]
    };
  }

  onDelete = (item) => {
    Alert.alert(I18n.t('alert'), I18n.t('areUsure'), [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => this.removeItem(item) }
    ]);
  }

  removeItem = (item) => {
    const { bookmarks } = this.state;
    bookmarks.splice(bookmarks.indexOf(item), 1);
    this.setState({ bookmarks });
    this.props.onDelete(item);
  }

  renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <View style={styles.toc}>
          <TouchableOpacity style={styles.btnText} onPress={() => this.props.onSelectToc(item)}>
            <Text style={styles.heading}>{I18n.t('bookmark')} {index + 1}</Text>
            {__DEV__ && <Text style={styles.small}>{item}</Text>}
          </TouchableOpacity>
        </View>
        <View style={styles.btnWrap}>
          <TouchableOpacity style={styles.button} onPress={() => this.onDelete(item)}>
            <Icon name="close" size={12} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.state.bookmarks}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    );
  }
}

const styles = {
  ...xstyles,
  item: {
    flexDirection: 'row'
  },
  toc: {
    flex: 1,
    paddingLeft: 5
    // borderColor: 'red',
    // borderWidth: 1
  },
  heading: {
    fontSize: 18
  },
  small: {
    fontSize: 8,
    color: '#555'
  },
  btnText: {
    padding: 10
  },
  btnWrap: {
    // borderColor: 'red',
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginHorizontal: 5,
    borderRadius: 8,
    borderColor: 'red',
    borderWidth: 0.75,
    backgroundColor: 'red',
    height: 16,
    width: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    color: 'white'
  },
  separator: {
    height: 0.4,
    backgroundColor: 'rgba(100,100,100,0.4)'
  }
};
