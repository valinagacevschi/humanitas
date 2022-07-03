import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Text, Image, Share, WebView, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button } from 'react-native-material-ui';
import I18n from 'react-native-i18n';
// import HTMLView from 'react-native-htmlview';
import BooksActions from '../Redux/BooksRedux';
import CommandActions from '../Redux/CommandRedux';
import DefinitionList from '../Components/DefinitionList';
import { cover } from '../Config';
import BookNavBar from '../Navigation/BookNavBar';
// Styles
import xstyles from './Styles/BookScreenStyle';
import { Metrics, Colors } from '../Themes';

const script = `
  <script>
    window.location.hash = 1;
    var calculator = document.createElement("div");
    calculator.id = "height-calculator";
    while (document.body.firstChild) {
      calculator.appendChild(document.body.firstChild);
    }
    document.body.appendChild(calculator);
    document.title = calculator.scrollHeight;
  </script>
`;
const style = `
  <style>
  body, html, #height-calculator { 
    margin: 0; padding: 0; color: #595959 !important;
  } #height-calculator {
    position: absolute; top: 0; left: 0; right: 0;
  } p { text-align: justify; font-size: 16px, color: #595959 !important; }
  </style>
`;

class BookScreen extends React.Component {
  constructor(props) {
    const { book } = props.navigation.state.params;
    super(props);
    this.state = {
      book,
      Height: 640
    };
    this.book = book;
  }

  componentDidMount() {
    this.props.loadBook(this.state.book ? this.state.book.id : 1387);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.theBook) {
      this.setState({ book: nextProps.theBook });
    }
  }

  onNavigationStateChange = (event) => {
    if (event.title) {
      const htmlHeight = Number(event.title);
      this.setState({ Height: htmlHeight > 1000 ? htmlHeight / 4.5 : htmlHeight });
    }
  }

  shareMessage = () => {
    const message = `${this.book
      .name} - ${this.book.titlu.capitalizeFirstLetter()} ${Platform.OS === 'android'
      ? ` ( ${this.state.book.link} )`
      : ''}`;
    Share.share(
      {
        message,
        url: this.state.book.link,
        link: this.state.book.link,
        title: 'Humanitas Share'
      },
      {
        dialogTitle: 'Humanitas Share',
        tintColor: Colors.mandarin
      }
    )
      .then(this.showResult)
      .catch(error => this.setState({ result: `error: ${error.message}` }));
  }

  showResult = (result) => {
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        this.setState({ result: `shared with an activityType: ${result.activityType}` });
      } else {
        this.setState({ result: 'shared' });
      }
    } else if (result.action === Share.dismissedAction) {
      this.setState({ result: 'dismissed' });
    }
  }

  addBook = () => {
    this.props.addBook(this.state.book);
    this.context.goTo('cart');
  }

  renderRemote = () => {
    if (this.state.book) {
      const { descriere, traducere, isbn, limba, aparitie, copyright } = this.state.book;
      const rawHtml = `<p>${descriere}</p>`;
      if (descriere) {
        return (
          <View style={{ flex: 1, marginVertical: 20 }}>
            {Platform.OS === 'android' && (
              <WebView
                scrollEnabled={false}
                style={{ width: Metrics.screenWidth - 40, height: this.state.Height }}
                source={{ html: rawHtml + style + script }}
                javaScriptEnabled
                onNavigationStateChange={this.onNavigationStateChange}
              />
            )}
            {Platform.OS === 'ios' &&
            <Text style={styles.description}>{descriere}</Text>}
            <DefinitionList
              list={[
                [I18n.t('lang'), limba],
                [I18n.t('isbn'), isbn],
                [I18n.t('translate'), traducere],
                [I18n.t('published'), aparitie],
                [I18n.t('copy'), copyright]
              ]}
            />
          </View>
        );
      }
      return null;
    }
    return null;
  }

  render() {
    const isAudio = this.book.tip === 'audio';
    const width = 200;
    const height = isAudio ? width : 310;
    const uri = cover(this.book, 'cover');
    const { name, titlu, subtitlu, pret, sname, id } = this.state.book;
    const mine = !!(this.props.myBooks && this.props.myBooks.find(b => b.id === id));
    return (
      <View style={styles.mainContainer}>
        <BookNavBar title={titlu} />
        <ScrollView style={styles.container}>
          <Card style={styles.card}>
            <View style={styles.coverWrap}>
              <View style={[styles.hum, { width, height }]}>
                <Text style={styles.humText}>H</Text>
              </View>
              <Image
                resizeMode="cover"
                source={{ uri }}
                style={[styles.cover, { width, height }]}
              />
            </View>
            <Button
              icon="share"
              text=""
              style={styles.shareButton}
              onPress={this.shareMessage}
            />

            {isAudio ? (
              <Button
                raised
                accent
                text={I18n.t('listen')}
                icon="volume-down"
                style={styles.button}
                onPress={() =>
                  this.context.goTo('player', {
                    book: { ...this.book, trackuri: null },
                    title: titlu
                  })}
              />
            ) : (
              <Button
                raised
                accent
                text={I18n.t('browse')}
                icon="book"
                style={styles.button}
                onPress={() => this.context.goTo('reader', { book: this.book, mine: false, index: -1 })}
              />
            )}
            {!mine && (
              <Button
                raised
                upperCase={false}
                primary
                text={`${pret} LEI`}
                icon="shopping-cart"
                style={styles.button}
                onPress={this.addBook}
              />
            )}
            <Text style={styles.title}>{titlu} {subtitlu && ` - ${subtitlu}`}</Text>
            <Text style={styles.author}>{name}</Text>
            {isAudio && (
              <View style={styles.lecture}>
                <Text style={{ fontStyle: 'italic' }}>{I18n.t('reading')} </Text>
                <Text style={{ fontWeight: 'bold' }}>{sname}</Text>
              </View>
            )}
            {this.renderRemote()}
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  ...xstyles,
  card: {
    container: {
      alignSelf: 'center',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Colors.snow,
      padding: Metrics.doubleBaseMargin,
      maxWidth: 500
    }
  },
  coverWrap: {
    // borderColor: 'red',
    // borderWidth: 1,
  },
  hum: {
    position: 'absolute',
    backgroundColor: Colors.light,
    justifyContent: 'center',
    borderRadius: 3
  },
  humText: {
    fontSize: 144,
    color: Colors.snow,
    alignSelf: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Cochin' : 'serif'
  },

  button: {
    container: {
      borderRadius: 2,
      width: 200,
      marginTop: Metrics.baseMargin
    },
    text: {
      color: Colors.snow,
      fontSize: 13.5
    }
  },
  shareButton: {
    container: {
      position: 'absolute',
      top: 10,
      right: 0,
      paddingRight: 0,
      paddingLeft: 6,
      backgroundColor: Colors.transparent
    }
  }
};

BookScreen.contextTypes = {
  goTo: PropTypes.func,
  goBack: PropTypes.func
};

const mapStateToProps = state => ({
  theBook: state.books.theBook,
  myBooks: state.myBooks.payload
});

const mapDispatchToProps = dispatch => ({
  loadBook: bookId => dispatch(BooksActions.bookLoad({ bookId }, { theBook: null })),
  addBook: book => dispatch(CommandActions.addProduct(book))
});

// const areStatesEqual = (prev, next) => (
//   _.isEqual(prev.books.theBook, next.books.theBook)
//   && _.isEqual(prev.myBooks.payload, next.myBooks.payload)
// );

// export default connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(BookScreen);
export default connect(mapStateToProps, mapDispatchToProps)(BookScreen);
