import React from 'react';
import PropTypes from 'prop-types';
import { View, WebView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import md5 from 'blueimp-md5';
import CommandActions from '../Redux/CommandRedux';
import BookNavBar from '../Navigation/BookNavBar';
// Styles
import styles from './Styles/PayuScreenStyle';

class PayuScreen extends React.Component {
  constructor(props) {
    super(props);
    const { command, profile } = props.navigation.state.params;
    this.state = { loading: true, body: this.prepareForm(command, profile, __DEV__ && false) };
  }

  onLoadEnd = () => {
    this.setState({ loading: false });
  }

  onNavigationStateChange = (e) => {
    if (e.url && e.url.startsWith('https://example.com/static/hum/')) {
      this.props.commandReset();
    } else if (e.url && e.url.startsWith('https://secure.payu.ro/order/lu.php')) {
      // console.log('same initial page', e.url);
    }
  }

  prepareForm = (command, profile, test) => {
    const merchant = 'LIBHUMOB';
    const key = 'J3x|e1?g4J16Dv9%0=V2';
    const backRef = 'https://example.com/static/hum/success.html';

    this.params = [
      { key: 'MERCHANT', value: merchant },
      { key: 'ORDER_REF', value: command.orderNo },
      { key: 'ORDER_DATE', value: moment().format('YYYY-MM-DD HH:mm:ss') },
    ];
    const prods = Object.values(command.products);
    prods.map((p) => this.params.push({ key: 'ORDER_PNAME[]', value: p.title }));
    prods.map((p) => this.params.push({ key: 'ORDER_PCODE[]', value: p.code }));
    prods.map((p) => this.params.push({ key: 'ORDER_PINFO[]', value: `${p.details} - ${p.title}` }));
    prods.map((p) => this.params.push({ key: 'ORDER_PRICE[]', value: p.price }));
    prods.map((p) => this.params.push({ key: 'ORDER_QTY[]', value: 1 }));
    prods.map((p) => this.params.push({ key: 'ORDER_VAT[]', value: 0 }));
    [
      { key: 'ORDER_SHIPPING', value: 0 },
      { key: 'PRICES_CURRENCY', value: 'RON' },
      { key: 'PAY_METHOD', value: 'CCVISAMC' },
    ].map((o) => this.params.push(o));
    prods.map(() => this.params.push({ key: 'ORDER_PRICE_TYPE[]', value: 'GROSS' }));

    if (test) this.params.push({ key: 'TESTORDER', value: 'TRUE' });

    const payload = this.params.map((o) => {
        const hashValue = `${this.byteLength(o.value)}${o.value}`;
        return { name: o.key, hashValue };
    }).map((el) => el.hashValue).join('');
    const hash = md5(payload, key);
    [
      { key: 'BILL_FNAME', value: profile.first_name || 'Leonardo' },
      { key: 'BILL_LNAME', value: profile.last_name || 'Davinci' },
      { key: 'BILL_EMAIL', value: profile.email || 'leo@davinci.ro' },
      { key: 'BILL_PHONE', value: profile.phone || '0788888888' },
      { key: 'BILL_STATE', value: 'RO' },
      { key: 'BILL_COUNTRYCODE', value: 'RO' },
      { key: 'LU_ENABLE_TOKEN', value: 1 },
      { key: 'LU_TOKEN_TYPE', value: 'PAY_BY_CLICK' },
      { key: 'BACK_REF', value: backRef },
      { key: 'ORDER_HASH', value: hash },
    ].map((o) => this.params.push(o));

    return this.params.map((o) => `${o.key}=${encodeURIComponent(o.value)}`).join('&');
  }

  byteLength = (str) => {
    str = typeof myVar !== 'string' ? (`${str}`) : str;
    let s = str.length;
    for (let i = str.length - 1; i >= 0; i--) {
      const code = str.charCodeAt(i);
      if (code > 0x7f && code <= 0x7ff) s++;
      else if (code > 0x7ff && code <= 0xffff) s += 2;
      if (code >= 0xDC00 && code <= 0xDFFF) i--;
    }
    return s;
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <WebView
          source={{
            uri: 'https://secure.payu.ro/order/lu.php',
            method: 'POST',
            body: this.state.body,
          }}
          style={styles.webview}
          scalesPageToFit
          onLoadEnd={this.onLoadEnd}
          onNavigationStateChange={this.onNavigationStateChange}
        />
        {this.state.loading && <ActivityIndicator style={styles.indicator} />}
        <BookNavBar title="Plătește" onPressBack={() => this.context.reset('home')} />
      </View>
    );
  }
}

PayuScreen.contextTypes = {
  reset: PropTypes.func,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  commandReset: () => dispatch(CommandActions.commandReset()),
});

export default connect(null, mapDispatchToProps)(PayuScreen);
