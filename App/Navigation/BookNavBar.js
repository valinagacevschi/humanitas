import React from 'react';
import { View } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import DoubleBar from '../Components/DoubleBar';
import styles from './Styles/HomeNavBarStyles';

export default class BookNavBar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          style={styles}
          leftElement={<DoubleBar onPressBack={this.props.onPressBack} />}
          // onLeftElementPress={() => this.props.onPressBack ? this.props.onPressBack() : this.context.goBack()}
          centerElement={this.props.title || 'Title'}
          rightElement={this.props.rightElement}
          onRightElementPress={() =>
            this.props.onRightElementPress && this.props.onRightElementPress()}
        />
      </View>
    );
  }
}
