import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Images, Colors } from '../Themes';
import Styles from './Styles/CustomNavBarStyles';

export default class CustomNavBar extends React.Component {
  render() {
    return (
      <Animated.View style={Styles.container}>
        <TouchableOpacity style={Styles.leftButton} onPress={() => this.context.goBack()}>
          <Icon name='ios-arrow-back' size={34} color={Colors.snow} />
        </TouchableOpacity>
        <Image style={Styles.logo} source={Images.clearLogo} />
        <View style={Styles.rightButton} />
      </Animated.View>
    );
  }
}

CustomNavBar.contextTypes = {
  goBack: PropTypes.func,
};
