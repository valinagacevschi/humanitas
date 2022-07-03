import React from 'react';
import { ScrollView, FlatList, View, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import I18n from 'react-native-i18n';
// import SplashScreen from 'react-native-splash-screen';
import _ from 'lodash';
import SearchActions from '../Redux/SearchRedux';
import BooksActions from '../Redux/BooksRedux';
import BannersActions from '../Redux/BannersRedux';
import TopSlider from '../Components/TopSlider';
import Shelve from '../Components/Shelve';
import Booklet from '../Components/Booklet';
import HomeNavBar from '../Navigation/HomeNavBar';
import DrawerContent from './DrawerContent';

// Styles
import styles from './Styles/LaunchScreenStyles';

const tracker = new GoogleAnalyticsTracker('UA-110547678-1');

class LaunchScreen extends React.Component {
  // componentDidMount() {
  //   if (Platform.OS === 'android') SplashScreen.hide();
  // }

  componentDidMount() {
    if (this.props.id) {
      tracker.setUser(this.props.id);
    }    
  }

  onRefresh = () =>  {
    this.props.getBanners();
    this.props.getBooks();
  };

  render() {
    const hasSearch = this.props.searchOpen; 
    console.log('refreshing', this.props.refreshing);
    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        type="displace"
        open={false}
        content={<DrawerContent />}
        styles={drawerStyles}
        tapToClose
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan
        tweenHandler={ratio => ({
          main: { opacity: Math.max(0.54, 1 - ratio) }
        })}
      >
        <View style={styles.mainContainer}>
          <HomeNavBar onPressOpenDrawer={() => this.drawer.open()} />
          <ScrollView 
            style={styles.container} 
            contentContainerStyle={styles.contentContainer}
            refreshControl={
              <RefreshControl
                refreshing={this.props.refreshing}
                onRefresh={this.onRefresh}
              />
            }
          >
            {hasSearch && (
              <FlatList
                contentContainerStyle={styles.grid}
                data={this.props.searched}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => <Booklet book={item} index={index} />}
              />
            )}
            {!hasSearch && (
              <View>
                <TopSlider />
                {this.props.myBooks &&
                this.props.myBooks.length > 0 && (
                  <Shelve mine shelve={I18n.t('myBooks')} books={{ epub: this.props.myBooks }} />
                )}
                {Object.keys(this.props.shelves || {}).map((item, i) => (
                  <Shelve key={i} shelve={item} books={this.props.shelves[item]} />
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </Drawer>
    );
  }
}

const drawerStyles = {
  drawer: {
    shadowColor: '#fff',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    paddingBottom: 0
  },
  main: {
    paddingLeft: 0
  }
};

const mapStateToProps = state => ({
  refreshing: state.books.fetching,
  shelves: state.books.shelves,
  searched: state.search.results,
  myBooks: state.myBooks.payload,
  searchOpen: state.search.searchOpen,
  id: state.login.user && state.login.user.id,
});

const mapDispatchToProps = dispatch => ({
  getBooks: () => dispatch(BooksActions.booksRequest()),
  getBanners: () => dispatch(BannersActions.bannersRequest()),
  cancelSearch: () => dispatch(SearchActions.cancelSearch())
});

const areStatesEqual = (prev, next) => (
  prev.books.fetching === next.books.fetching
  && _.isEqual(prev.books.shelves, next.books.shelves)
  && _.isEqual(prev.myBooks.payload, next.myBooks.payload)
  && _.isEqual(prev.search.results, next.search.results)
);

export default connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(LaunchScreen);
// export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen);
