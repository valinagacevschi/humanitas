import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import { connect } from 'react-redux';
import SearchActions from '../Redux/SearchRedux';
import Badge from '../Components/Badge';
import styles from './Styles/HomeNavBarStyles';

class HomeNavBar extends React.Component {
  state = {
    searchOpen: false
  };

  onSearchPressed = () => {
    this.setState({ searchOpen: !this.state.searchOpen });
  }

  onSearchClosed = () => {
    this.setState({ searchOpen: !this.state.searchOpen });
    this.props.cancelSearch();
  }

  onChangeText = (term) => {
    if (term.length > 2) {
      this.props.search(term);
    }
    if (term.length === 0) {
      this.props.cancelSearch();
    }
  }

  onSubmitEditing = () => {
    __DEV__ && console.log('onSubmitEditing');
  }

  openCart = () => {
    this.context.goTo('cart');
  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          style={styles}
          leftElement="menu"
          onLeftElementPress={() => this.props.onPressOpenDrawer()}
          centerElement="Humanitas"
          rightElement="shopping-cart"
          onRightElementPress={this.openCart}
          searchable={{
            autoFocus: true,
            color: '#fff',
            placeholder: 'Căutare...',
            onSearchPressed: this.onSearchPressed,
            onSearchClosed: this.onSearchClosed,
            onChangeText: this.onChangeText,
            onSubmitEditing: this.onSubmitEditing
          }}
        />
        {!this.state.searchOpen &&
        this.props.count > 0 && (
          <Badge text={this.props.count} style={this.state.searchOpen && { right: 5 }} />
        )}
      </View>
    );
  }
}

HomeNavBar.contextTypes = {
  // goBack: PropTypes.func,
  goTo: PropTypes.func
};

const mapStateToProps = state => ({
  count: state.command.count,
  searching: state.search.searching
});

const mapDispatchToProps = dispatch => ({
  search: searchTerm => dispatch(SearchActions.search(searchTerm)),
  cancelSearch: () => dispatch(SearchActions.cancelSearch())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeNavBar);
