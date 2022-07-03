import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Styles/FontSetterStyle';

export default class FontSetter extends React.Component {

  renderButton(fontSize, index) {
    const selected = parseInt(this.props.value);
    return (
      <TouchableOpacity
        key={index}
        onPress={() => this.props.onChange(fontSize)}
        style={[
          styles.fontButton,
          index === 0 && styles.first,
          index === 3 && styles.last,
          fontSize === selected && styles.selected,
        ]}
      >
        <Text style={[styles.fontText, { fontSize }]}>aA</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {[16, 18, 22, 28].map((f, i) => this.renderButton(f, i))}
      </View>
    );
  }
}

// Prop type warnings
FontSetter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
