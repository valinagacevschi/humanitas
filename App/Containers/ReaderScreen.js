import React from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, Platform, Alert, Text } from 'react-native';
import I18n from 'react-native-i18n';
import Share from 'react-native-share';
import { MaterialDialog } from 'react-native-material-dialog';
import { Epub } from 'epubjs-rn';
import { connect } from 'react-redux';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import BookmarksActions from '../Redux/BookmarksRedux';
import AlertActions from '../Redux/AlertRedux';
import TopBar from '../Components/TopBar';
import Nav from '../Components/Nav';
import BottomBar from '../Components/BottomBar';
import FontSetter from '../Components/FontSetter';
import Streamer from '../Services/Streamer';

// Styles
import xstyles from './Styles/ReaderScreenStyle';
import { Colors } from '../Themes';

const ios = Platform.OS === 'ios';

class ReaderScreen extends React.Component {
  constructor(props) {
    super(props);
    const { book, mine } = props.navigation.state.params;
    const { fisier, preview, titlu, cod } = book;
    const url = `https://example.com/humanitas/${mine ? fisier : preview}`;

    this.state = {
      mine,
      fisier,
      url,
      src: '',
      origin: '',
      title: titlu,
      cod,
      fontSize: '16px',
      toc: [],
      flow: 'paginated',
      showBars: true,
      showNav: false,
      showFont: false,
      sliderDisabled: true,
      loaded: false,
      rendition: null,
      marked: false,
      bookmarks: [],
    };
    this.streamer = new Streamer();
    this.barsShown = false;
    this.firstTime = true;
  }

  componentDidMount() {
    this.streamer
      .start({ cache: true })
      .then(origin => {
        this.setState({ origin });
        return this.streamer.get(this.state.url);
      })
      .then(({ url, sourcePath }) => {
        this.setState({ src: url, file: `file://${sourcePath}`, showBars: false });
      })
      .catch(err => {
        __DEV__ && console.tron.log('ERROR', err);
        this.props.alert('error', 'Error', 'Eroare incarcare carte.');
        this.context.goBack();
      });
    this.loadBookmarks(this.props.bookmarks);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.bookmarks) {
      this.loadBookmarks(newProps.bookmarks);
    }
  }

  componentWillUnmount() {
    this.streamer.kill();
  }

  onReady = (book) => {
    const bookmark = (this.props.bookmarks || []).find(b => b.cod === this.state.cod);
    // __DEV__ && console.tron.log('bookmark', bookmark);
    this.setState({
      title: book.package.metadata.title,
      toc: this.flatten(book.toc),
      sliderDisabled: false,
      font: 'Helvetica',
      fontSize: (bookmark && bookmark.fontSize) || '16px',
      location: bookmark && bookmark.start.cfi, // href
      marks: bookmark && bookmark.marks,
      loaded: true
    });
  }

  onLocationsReady = (locations) => {
    this.setState({ total: locations.total });
    // this.onOpenButtonPressed();
  }

  onLocationChange = (visibleLocation) => {
    const { start } = visibleLocation;
    const { cod, start: lastStart, fontSize, bookmarks: marks } = this.state;
    if (lastStart !== start) {
      const marked = marks.indexOf(start.cfi) >= 0;
      const percentage = start.percentage; // locations.percentageFromCfi(start.cfi);
      const currentPage = start.location;
      this.setState({ start, percentage, marked, currentPage }, () => {
        if (cod) {
          this.props.bookmarkSave({ start, fontSize, marks }, cod);
        }
      });
    }
  }

  onFontSave = (fontSize) => {
    this.setState({ fontSize: `${fontSize}px`, font: 'DroidSans' });
  }

  onOpenButtonPressed = () => {
    if (this.state.mine && !ios) {
      Alert.alert(this.state.title, I18n.t('openGoogle'), [
        { text: 'Renunță', style: 'cancel' },
        { text: 'OK', onPress: () => this.openBookInPlay() }
      ]);
    }
  }

  onToggleBookmark = () => {
    const cfi = this.state.start.cfi;
    const bookmarks = [...this.state.bookmarks];
    const pos = bookmarks.indexOf(cfi);
    if (pos === -1) {
      bookmarks.push(cfi);
    } else {
      bookmarks.splice(pos, 1);
    }
    this.setState({ bookmarks, marked: pos === -1 }, () => {
      const { cod, start, fontSize, bookmarks: marks } = this.state;
      this.props.bookmarkSave({ start, fontSize, marks }, cod);
    });
  }

  onPress = (cfi, rendition) => {
    this.toggleBars(cfi, rendition);
  }

  // onLongPress = (cfi, rendition) => {
  //   this.toggleBars(cfi, rendition);
  // }

  onDeleteBookmark = (cfi) => {
    const bookmarks = [...this.state.bookmarks];
    bookmarks.splice(bookmarks.indexOf(cfi), 1);
    this.setState({ bookmarks, marked: false }, () => {
      const { cod, start, fontSize, bookmarks: marks } = this.state;
      this.props.bookmarkSave({ start, fontSize, marks }, cod);
    });
  }

  setLocation = (location) => {
    this.setState({ location });
  }

  openBookInPlay = () => {
    const url = this.state.file;
    __DEV__ && console.log('file', this.state.file);
    Share.open({ url, type: 'application/epub+zip' })
      .then(s => console.log('then', s))
      .catch(err => console.log('err', err));
  }

  loadBookmarks = (bookmarks) => {
    const bookmark = bookmarks.find(b => b.cod === this.state.cod);
    if (bookmark) {
      this.setState({ bookmark, bookmarks: bookmark.marks });
    }
  }

  flatten = (input) => [].concat(
    ...input.map(
      item => (item.subitems.length === 0 ? item : [item, ...this.flatten(item.subitems)])
    )
  );

  toggleBars = (cfi, rendition) => {
    this.barsShown = !this.barsShown;
    this.setState({ rendition, showBars: this.barsShown });
    // rendition.unhighlight(cfi, {});
  }

  toggleDialog = () => {
    this.setState({ showFont: !this.state.showFont });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={this.state.loaded} />
        <Epub
          style={styles.reader}
          src={this.state.src}
          flow={this.state.flow}
          origin={this.state.origin}
          location={this.state.location}
          onLocationChange={this.onLocationChange}
          onLocationsReady={this.onLocationsReady}
          onReady={this.onReady.bind(this)}
          onPress={this.onPress.bind(this)}
          onLongPress={this.onPress.bind(this)}
          onError={err => console.log('error', err)}
          fontSize={this.state.fontSize}
          font={this.state.font}
          themes={{
            custom: {
              '*': { '-webkit-user-select': 'none' },
              img: { 'margin-top': '45px' },
              //'div.sgc-toc-title': { display: 'none' },
              'div.sgc-toc-level-1 a': { 'text-decoration': 'none', color: '#000' }
            }
          }}
          theme="custom"
          // regenerateLocations
          // generateLocations
        />
        {!this.state.loaded && (
          <View style={styles.wait}>
            <Text style={styles.waitText}>{I18n.t('waitForLoading')}</Text>
          </View>
        )}
        <View style={styles.bar}>
          <TopBar
            title={this.state.title}
            shown={this.state.showBars}
            share={this.state.mine && !ios}
            marked={this.state.marked}
            mine={this.state.mine}
            onLeftButtonPressed={() => this.context.goBack()}
            onFontButtonPressed={() => this.setState({ showFont: true })}
            onRightButtonPressed={() => this.refs.nav.show()}
            onOpenButtonPressed={() => this.onOpenButtonPressed()}
            onToggleBookmark={() => this.onToggleBookmark()}
          />
        </View>
        <View style={[styles.bar, { bottom: 0 }]}>
          {Platform.OS !== 'androidx' && (
            <BottomBar
              value={this.state.percentage}
              total={this.state.total}
              current={this.state.currentPage}
              shown={this.state.showBars}
              onSlidingComplete={value => this.setState({ location: value })}
            />
          )}
        </View>
        <View>
          <Nav
            ref="nav"
            title={this.state.title}
            display={this.setLocation}
            toc={this.state.toc}
            bookmarks={this.state.bookmarks}
            onDeleteBookmark={this.onDeleteBookmark}
          />
          <MaterialDialog
            title={I18n.t('fontSize')}
            visible={this.state.showFont}
            onCancel={() => {
              this.setState({ showFont: false });
            }}
          >
            <FontSetter
              value={this.state.fontSize}
              onChange={fontSize => this.onFontSave(fontSize)}
            />
          </MaterialDialog>
        </View>
      </View>
    );
  }
}

const styles = {
  ...xstyles,
  wait: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 150,
    backgroundColor: Colors.transparent,
    marginHorizontal: 35
  },
  waitText: {
    backgroundColor: Colors.transparent,
    fontSize: 18,
    textAlign: 'center'
  }
};

ReaderScreen.contextTypes = {
  goBack: PropTypes.func
};

const mapStateToProps = state => ({
  bookmarks: state.bookmarks.payload
});

const mapDispatchToProps = dispatch => ({
  bookmarkSave: (data, cod) => dispatch(BookmarksActions.bookmarkSave(data, cod)),
  alert: (kind, title, message) => dispatch(AlertActions.alertSet(kind, title, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReaderScreen);
