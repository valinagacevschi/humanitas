import React from 'react';
import { TouchableOpacity, Animated, Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Jcon from 'react-native-vector-icons/dist/FontAwesome';
import DoubleBar from './DoubleBar';
import styles from './Styles/TopBarStyle';
import { Colors } from '../Themes';

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(1)
    };
    this.barsShown = true;
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.props.shown) {
        this.show();
      } else {
        this.hide();
      }
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.shown !== this.props.shown) {
      if (this.props.shown) {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  onHomePressed = () => {
    this.context.reset('home');
  }

  onToggleBookmark = () => {
    if (this.props.onToggleBookmark) {
      this.props.onToggleBookmark();
    }
  }

  show = () => {
    const timing = Animated.timing;
    Animated.sequence([
      timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 400
      })
    ]).start();
    this.barsShown = true;
  }

  hide = () => {
    const timing = Animated.timing;

    Animated.sequence([
      timing(this.state.fadeAnim, {
        toValue: 0,
        duration: 400
      })
    ]).start();

    this.barsShown = false;
  }

  render() {
    return (
      <Animated.View style={[styles.header, { opacity: this.state.fadeAnim }]}>
        <DoubleBar onPressBack={this.props.onLeftButtonPressed} />
        <Text numberOfLines={1} style={styles.title}>
          {this.props.title}
        </Text>
        {this.props.share && (
          <TouchableOpacity style={styles.button} onPress={this.props.onOpenButtonPressed}>
            <Jcon name="book" color={Colors.snow} size={24} />
          </TouchableOpacity>
        )}
        {this.props.mine && <TouchableOpacity style={styles.button} onPress={this.onToggleBookmark}>
          <Jcon
            name={this.props.marked ? 'bookmark' : 'bookmark-o'}
            color={Colors.snow}
            size={24}
          />
        </TouchableOpacity>}
        {Platform.OS !== 'androidx' && (
          <TouchableOpacity style={styles.button} onPress={this.props.onFontButtonPressed}>
            <Icon name="format-size" color={Colors.snow} size={24} />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={this.props.onRightButtonPressed}>
          <Icon name="list" color={Colors.snow} size={24} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
