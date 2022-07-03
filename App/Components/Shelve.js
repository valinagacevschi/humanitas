import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, Text, Platform } from 'react-native';
import { Button } from 'react-native-material-ui';
import I18n from 'react-native-i18n';
import Cover from './Cover';
import xstyles from './Styles/ShelveStyle';

export default class Shelve extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !!(this.props.mine && nextProps);
  }

  onCategoryPress = (category, section) => {
    const title = category === 'noutati' ? I18n.t(category) : category.capitalizeFirstLetter();
    if (this.props.mine) {
      this.context.goTo('mybooks', { title });
    } else {
      this.context.goTo('category', { title, section, category });
    }
  }

  limit = (array) => {
    if (Platform.OS === 'android') return array.slice(0, 7);
    return array;
  }

  renderItem = ({ item, index }) => (
    <Cover key={index} mine={this.props.mine} index={index} book={item} />
  );

  render() {
    const { shelve, mine } = this.props;
    const title = shelve === 'noutati' ? I18n.t(shelve) : shelve;
    return (
      <View style={styles.container}>
        <Button
          raised
          text={`${title} ▼`}
          icon="arrow-forward"
          style={styles.button}
          onPress={() => this.onCategoryPress(shelve, 'all')}
        />
        {!mine && <Text style={styles.label}>{I18n.t('books')}</Text>}
        <FlatList
          horizontal
          style={[styles.bookScroller]}
          contentContainerStyle={{ alignItems: 'flex-end' }}
          data={this.limit(this.props.books.epub)}
          keyExtractor={(item, index) => index}
          renderItem={this.renderItem}
        />
        {this.props.books.audio && (
          <View>
            <Text style={styles.label}>{I18n.t('audiobooks')}</Text>
            <FlatList
              horizontal
              style={[styles.bookScroller, { height: 85 }]}
              contentContainerStyle={{ alignItems: 'flex-end' }}
              data={this.limit(this.props.books.audio)}
              keyExtractor={(item, index) => index}
              renderItem={this.renderItem}
            />
          </View>
        )}
      </View>
    );
  }
}

Shelve.contextTypes = {
  goTo: PropTypes.func
};

const styles = {
  ...xstyles,
  button: {
    container: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      marginVertical: 10,
      ...Platform.select({
        android: {
          borderBottomColor: 'rgba(100,100,100,0.75)',
          borderTopColor: 'rgba(100,100,100,0.75)',
          borderWidth: 0.7,
          elevation: 20
        }
      })
    },
    text: {
      color: 'rgba(10,10,10,0.65)',
      fontWeight: 'normal'
    }
  }
};
