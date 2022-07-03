import React from 'react';
import { View, Text, TextInput } from 'react-native';
import I18n from 'react-native-i18n';
import BaseInput from './BaseInput';
import styles from './Styles/ItemInputStyle';
import { Colors } from '../Themes';

export default class ItemInput extends BaseInput {
  constructor(props) {
    super(props);
    this.validates = {
      text: () => this.props.value && this.props.value.length > 2,
      email: () => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.props.value);
      },
      phone: () => {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return re.test(this.props.value);
      }
    };
  }

  error = () => {
    if (this.state.error) {
      return <Text style={[styles.error, this.props.errorStyle]}>{this.state.error}</Text>;
    }
    return null;
  }

  onBlur = () => {
    const msg = this.validates[this.props.validType]()
      ? ''
      : I18n.t(`invalid_${this.props.validType}`);
    this.setState({ error: msg });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.showLabel && <Text style={styles.labelStyle}>{this.props.label}</Text>}
        <TextInput
          editable={this.props.editable || true}
          ref='input'
          autoCapitalize={'none'}
          autoCorrect={false}
          keyboardType={this.props.keyboardType || 'default'}
          underlineColorAndroid='transparent'
          value={this.props.value}
          placeholder={
            !this.props.hidePlaceholder &&
            (this.props.placeholder || `${I18n.t('type')}${this.props.label}:`)
          }
          placeholderTextColor={Colors.steel}
          style={styles.inputStyle}
          returnKeyType={this.props.returnKeyType || 'next'}
          onChangeText={this.props.onChangeText}
          onBlur={this.onBlur}
          onFocus={() => this.setState({ error: null })}
          onSubmitEditing={this.props.onSubmitEditing}
        />
        {this.error()}
      </View>
    );
  }
}
