import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Image, Text, Alert } from 'react-native';
import { Button } from 'react-native-material-ui';
import { connect } from 'react-redux';
import R from 'ramda';
import I18n from 'react-native-i18n';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import CommandActions from '../Redux/CommandRedux';
import AlertMessage from '../Components/AlertMessage';
import BookNavBar from '../Navigation/BookNavBar';
// Styles
import xstyles from './Styles/CartScreenStyle';
import { Colors } from '../Themes';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    let data = [];
    if (props.command) {
      data = Object.values(props.command.products);
    }
    this.state = { data };
    this.once = true;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.command) {
      const data = Object.values(nextProps.command.products);
      this.setState({ data });
      // console.log('to PayU', nextProps.command, nextProps.command.orderNo);
      if (nextProps.command.orderNo && nextProps.command.count > 0 && this.once) {
        this.once = !this.once;
        this.context.goTo('payu', { command: nextProps.command, profile: nextProps.profile });
      }
    }
  }

  removeBook = (book) => {
    Alert.alert(I18n.t('alert'), I18n.t('areUsure'), [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => this.props.removeBook(book) },
    ]);
  }

  checkOut = () => {
    this.props.commandSave();
  }

  login = () => {
    this.context.goTo('login');
  }

  profile = () => {
    this.context.goTo('profile');
  }

  isComplete = () => {
    if (this.props.profile) {
      const { first_name, last_name, address, email, phone } = this.props.profile;
      return !!(first_name && last_name && email && phone && address);
    }
    return false;
  }

  renderItem = ({ item }) => {
    const width = 64;
    const height = width / (item.cat === 'ebook' ? 0.65 : 1);
    return (
      <View key={item.id} style={styles.gridItem}>
        <Image
          source={{ uri: item.image }}
          style={[styles.cover, { height, width }]}
        />
        <View style={{ justifyContent: 'space-around', paddingLeft: 10, flex: 5 }}>
          <Text style={styles.author}>
            {item.details.toUpperCase()}
          </Text>
          <Text style={styles.title}>
            {item.title}
          </Text>
          <Text style={styles.price}>
            {I18n.t('price')}: {item.total} {item.currency}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'space-around' }}>
          <Button
            icon='close'
            text=''
            style={styles.shareButton}
            onPress={() => this.removeBook(item)}
          />
        </View>
      </View>
    );
  }

  renderButton() {
    let label = 'login';
    let icon = 'lock-open';
    let action = this.login;
    if (this.props.profile) {
      if (this.isComplete()) {
        label = 'pay';
        icon = 'shopping-cart';
        action = this.checkOut;
      } else {
        label = 'updateProfile';
        icon = 'assignment-ind';
        action = this.profile;
      }
    }
    return (
      <Button
        primary
        raised
        disabled={R.isEmpty(this.props.command.products || [])}
        text={I18n.t(label)}
        icon={icon}
        style={styles.payButton}
        onPress={action}
      />
    );
  }

  render() {
    const total = this.props.command.total;
    const noProducts = R.isEmpty(this.props.command.products || []);
    return (
      <View style={styles.mainContainer}>
        <BookNavBar title={I18n.t('cart')} />
        <View style={styles.heading}>
          <Text style={styles.headText}>
            {I18n.t('total')}
          </Text>
          <Text style={styles.headText}>
            {Math.abs(total).toFixed(2)} Lei
          </Text>
        </View>
        <View style={[styles.container, { flex: 1 }]}>
          <AlertMessage
            title={I18n.t('nothingToSee')}
            icon="error"
            show={noProducts}
            style={{ marginTop: 150 }}
          />
          <FlatList
            contentContainerStyle={styles.grid}
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index}
          />
        </View>
        {this.renderButton()}
      </View>
    );
  }
}

Cart.contextTypes = {
  goTo: PropTypes.func,
  goBack: PropTypes.func,
};

const styles = {
  ...xstyles,
  shareButton: {
    container: {
      flex: 1,
      width: 42,
      paddingRight: 0,
      paddingLeft: 8,
    }
  },
  payButton: {
    container: {
      height: 42,
      borderRadius: 40,
      marginHorizontal: 20,
      marginBottom: 5,
    },
    text: {
      color: Colors.snow,
    }
  }
};

const mapStateToProps = (state) => ({
  command: state.command,
  profile: state.profile.payload,
});

const mapDispatchToProps = (dispatch) => ({
  removeBook: (book) => dispatch(CommandActions.delProduct(book)),
  commandSave: () => dispatch(CommandActions.commandSave()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
