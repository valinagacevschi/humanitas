import React from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { SegmentedControls } from 'react-native-radio-buttons';
import Orientation from 'react-native-orientation';
import _ from 'lodash';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import BooksActions from '../Redux/BooksRedux';
import SearchActions from '../Redux/SearchRedux';
import Booklet from '../Components/Booklet';
import CategoryNavBar from '../Navigation/CategoryNavBar';
// Styles
import styles from './Styles/CategoryScreenStyle';
import { Metrics, Colors } from '../Themes';

const options = [{ label: 'ebooks', tip: 'epub' }, { label: 'audiobooks', tip: 'audio' }];

class CategoryScreen extends React.Component {
  constructor(props) {
    super(props);
    const books = props.books;
    const { title, section, category } = props.navigation.state.params;
    const hasSwitch = section === 'all'; // && (category === 'noutati' || category === 'bestseller');
    this.cols = Metrics.screenWidth < 760 ? 2 : 4;
    const initial = Orientation.getInitialOrientation();
    const cols = this.getCols(initial);
    this.state = {
      section,
      category,
      title,
      refreshing: false,
      tip: 'epub',
      hasSwitch,
      cols,
      books: hasSwitch ? books && books.filter(b => b.tip === 'epub') : books
    };
  }

  componentDidMount() {
    Orientation.addOrientationListener(this.orientationDidChange);
    this.props.loadBooks(this.state.category || 'noutati', this.state.section || 'epub');
  }

  componentWillReceiveProps(newProps) {
    if (newProps.books) {
      this.setState({
        books: this.state.hasSwitch
          ? newProps.books.filter(b => b.tip === this.state.tip)
          : newProps.books
      });
    }
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this.orientationDidChange);
  }

  setSelectedOption = (select) => {
    this.setState({
      tip: select.tip,
      books: this.props.books && this.props.books.filter(b => b.tip === select.tip)
    });
  }

  getCols = (orientation) => {
    let cols = 2;
    if (orientation === 'PORTRAIT' || orientation === 'PORTRAITUPSIDEDOWN') {
      if (Metrics.screenWidth > 760) cols = 4;
    } else if (Metrics.screenWidth < 350) {
      cols = 3;
    } else if (Metrics.screenWidth > 760) {
      cols = 6;
    } else {
      cols = 4;
    }
    return cols;
  }

  orientationDidChange = (orientation) => {
    this.setState({ cols: this.getCols(orientation) });
  }

  render() {
    const hasSearch = !_.isEmpty(this.props.searched || []);
    return (
      <View style={styles.mainContainer}>
        <CategoryNavBar title={this.state.title} />
        <View style={{ marginTop: Metrics.navBarHeight }} />
        {this.state.hasSwitch && (
          <SegmentedControls
            containerStyle={{ marginHorizontal: 15, marginVertical: 5 }}
            tint={Colors.mandarin}
            selectedTint={Colors.snow}
            backTint={Colors.snow}
            options={options}
            onSelection={this.setSelectedOption}
            selectedOption={this.state.tip}
            extractText={option => option.label}
            testOptionEqual={(selectedValue, option) => selectedValue === option.tip}
          />
        )}
        <FlatList
          key={`list_${this.state.cols}`}
          contentContainerStyle={styles.grid}
          keyExtractor={(item, index) => index}
          numColumns={this.state.cols}
          columnWrapperStyle={{ justifyContent: 'space-around' }}
          data={hasSearch ? this.props.searched : this.state.books}
          renderItem={({ item, index }) => <Booklet book={item} index={index} />}
          refreshing={this.state.refreshing}
          onRefresh={() => hasSearch && this.props.cancelSearch()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  books: state.books.books,
  searched: state.search.results
});

const mapDispatchToProps = dispatch => ({
  loadBooks: (category, section) =>
    dispatch(BooksActions.booksLoad({ category, section }, { books: null })),
  cancelSearch: () => dispatch(SearchActions.cancelSearch())
});

// const areStatesEqual = (prev, next) => (
//   _.isEqual(prev.books.books, next.books.books)
//   && _.isEqual(prev.search.results, next.search.results)
// );

// export default connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(CategoryScreen);
export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);
