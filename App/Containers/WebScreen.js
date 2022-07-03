import React from 'react';
import { View, WebView } from 'react-native';
import { connect } from 'react-redux';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux';
import BookNavBar from '../Navigation/BookNavBar';
// Styles
import styles from './Styles/WebScreenStyle';
import { Metrics } from '../Themes';

class WebScreen extends React.Component {

  render() {
    const uri = 'https://example.com/humanitas-terms.html';
    return (
      <View style={styles.mainContainer}>
        <WebView
          domStorageEnabled
          javaScriptEnabled
          renderError={(e) => {
            if (e === 'WebKitErrorDomain') {
              return;
            }
          }}
          source={{ uri }}
          style={{ marginTop: Metrics.navBarHeight }}
        />
        <BookNavBar title="Termeni și Condiții" />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WebScreen);
