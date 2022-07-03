import React from 'react';
import { Animated, Text } from 'react-native';
import * as Progress from 'react-native-progress';
// import Icon from 'react-native-vector-icons/EvilIcons';
import styles from './Styles/BottomBarStyle';
import { Colors, Metrics } from '../Themes';

export default class BottomBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(1)
    };
    this.barsShown = true;
  }

  componentDidMount() {
    setTimeout(() => {
      const { shown, total } = this.props;
      if (shown && total > 0) {
        this.show();
      } else {
        this.hide();
      }
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.shown !== this.props.shown) {
      const { shown, total } = this.props;
      if (shown && total > 0) {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  show() {
    const timing = Animated.timing;
    Animated.sequence([
      timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 400
      })
    ]).start();
    this.barsShown = true;
  }

  hide() {
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
    const { total, current, value } = this.props;
    return (
      <Animated.View style={[styles.footer, { opacity: this.state.fadeAnim }]}>
        <Progress.Bar
          progress={value || 0}
          width={Metrics.screenWidth - 90}
          height={3}
          color={Colors.mandarin}
          borderWidth={0.4}
          borderRadius={1.5}
        />
        <Text style={styles.page}>
          {current || 0} / {total || 0}
        </Text>
      </Animated.View>
    );
  }
}
