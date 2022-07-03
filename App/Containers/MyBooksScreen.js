import React from 'react';
import { View, FlatList, Text, TouchableHighlight, Alert } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import MyBooksActions from '../Redux/MyBooksRedux';
import Cover from '../Components/Cover';
import BookNavBar from '../Navigation/BookNavBar';
// Styles
import styles from './Styles/MyBooksScreenStyle';
import { Metrics } from '../Themes';

class MyBooksScreen extends React.PureComponent {

  onPressDelete = (book) => {
    const { id, cod, isbn, titlu } = book;
    Alert.alert(I18n.t('deleteBook'), I18n.t('areUsure'), [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => this.props.deleteBook({ id, cod, isbn, titlu }) }
    ]);
  }

  onPressRestore = () => {
    Alert.alert(I18n.t('restoreBooks'), I18n.t('areUsure'), [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => this.props.restoreBooks() }
    ]);
  }

  renderBook = ({ item }) => {
    const height = item.tip === 'epub' ? 290 : 220;
    const empty = !item.tracks && item.tip === 'audio';
    return (
      <View style={[styles.gridItem, { height }]}>
        <Cover book={item} mine empty={empty} large />
        <Text numberOfLines={2} style={styles.author}>
          {item.name.toUpperCase()}
        </Text>
        <Text numberOfLines={2} style={styles.title}>
          {item.titlu} {item.subtitlu && `${item.subtitlu}`}
        </Text>
        <TouchableHighlight style={styles.delete} onPress={this.onPressDelete.bind(this, item)}>
          <Icon name="close" style={styles.delIcon} />
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    const cols = Metrics.screenWidth < 760 ? 2 : 4;
    return (
      <View style={styles.mainContainer}>
        <BookNavBar
          title={I18n.t('myBooks')}
          rightElement="undo"
          onRightElementPress={() => this.onPressRestore()}
        />
        <FlatList
          numColumns={cols}
          columnWrapperStyle={{ justifyContent: 'space-around' }}
          style={styles.container}
          keyExtractor={(item, index) => index}
          contentContainerStyle={styles.grid}
          data={this.props.myBooks}
          renderItem={this.renderBook}
          refreshing={this.props.fetching}
          onRefresh={() => this.props.getMyBooks()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  fetching: state.myBooks.fetching,
  myBooks: state.myBooks.payload
});

const mapDispatchToProps = dispatch => ({
  getMyBooks: () => dispatch(MyBooksActions.myBooksRequest()),
  deleteBook: book => dispatch(MyBooksActions.myBooksDelete(book)),
  restoreBooks: () => dispatch(MyBooksActions.myBooksRestore())
});

export default connect(mapStateToProps, mapDispatchToProps)(MyBooksScreen);
