import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text } from 'react-native';
import styles from './Styles/AlertMessageStyles';
import { Colors } from '../Themes';

export default class AlertMessage extends React.Component {
  static defaultProps = { show: true };

  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    style: PropTypes.object,
    show: PropTypes.bool
  };

  render() {
    const messageComponent = null;
    if (this.props.show) {
      const { title, icon } = this.props;
      return (
        <View style={[styles.container, this.props.style]}>
          <View style={styles.contentContainer}>
            {icon && <Icon name={icon} color={Colors.steel} size={32} />}
            <Text allowFontScaling={false} style={styles.message}>
              {title && title.toUpperCase()}
            </Text>
          </View>
        </View>
      );
    }
    return messageComponent;
  }
}

AlertMessage.defaultProps = {
  show: true
};
