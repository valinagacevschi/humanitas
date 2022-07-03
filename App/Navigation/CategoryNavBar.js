import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import { connect } from 'react-redux';
import SearchActions from '../Redux/SearchRedux';
import Badge from '../Components/Badge';
import styles from './Styles/HomeNavBarStyles';

class CategoryNavBar extends React.Component {
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
      this.props.search(term, this.props.category);
    }
    if (term.length === 0) {
      this.props.cancelSearch();
    }
  }

  openCart = () => {
    this.context.goTo('cart');
  }

  // toggleBadge() {
  //   this.setState({ searchOpen: !this.state.searchOpen });
  // }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          style={styles}
          leftElement='arrow-back'
          onLeftElementPress={() => this.context.goBack()}
          centerElement={this.props.title || 'Title'}
          rightElement="shopping-cart"
          onRightElementPress={this.openCart}
          searchable={{
            autoFocus: true,
            placeholder: 'Căutare...',
            onSearchPressed: this.onSearchPressed,
            onSearchClosed: this.onSearchClosed,
            onChangeText: this.onChangeText
            //onSubmitEditing: this.onSubmitEditing,
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

CategoryNavBar.contextTypes = {
  goTo: PropTypes.func,
  goBack: PropTypes.func,
};

const mapStateToProps = state => ({
  count: state.command.count,
  searching: state.search.searching
});

const mapDispatchToProps = dispatch => ({
  search: (searchTerm, category) => dispatch(SearchActions.search(searchTerm, category)),
  cancelSearch: () => dispatch(SearchActions.cancelSearch())
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryNavBar);
