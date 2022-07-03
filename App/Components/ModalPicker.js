import React from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import styles from './Styles/ModalPickerStyle';

let componentIndex = 0;

export default class ModalPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animationType: 'slide',
      modalVisible: false,
      transparent: false,
      selected: 'please select',
      input: null,
    };
  }

  componentDidMount() {
    this.setState({ selected: this.props.initValue });
    this.setState({ cancelText: this.props.cancelText });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initValue !== this.props.initValue) {
      this.setState({ selected: nextProps.initValue });
    }
  }

  onChange = (item) => {
    this.props.onChange({ ...item, input: this.state.input });
    this.setState({ selected: item.label });
    this.close();
  }

  close = () => this.setState({ modalVisible: false });

  open = (input) => {
    // console.log('OPEN');
    this.setState({ modalVisible: true, input, });
  };

  renderSection = (section) => (
    <View key={section.key} style={[styles.sectionStyle, this.props.sectionStyle]}>
      <Text style={[styles.sectionTextStyle, this.props.sectionTextStyle]}>
        {section.label}
      </Text>
    </View>
  );

  renderOption = (option) => (
    <TouchableOpacity key={option.key} onPress={() => this.onChange(option)}>
      <View style={[styles.optionStyle, this.props.optionStyle]}>
        <Text style={[styles.optionTextStyle, this.props.optionTextStyle]}>
          {option.label}
        </Text>
      </View>
    </TouchableOpacity>
  );

  renderOptionList = () => {
    const options = this.props.data.map((item) =>
      (item.section ? this.renderSection(item) : this.renderOption(item))
    );

    return (
      <View
        style={styles.overlayStyle}
        key={`modalPicker${componentIndex++}`}
      >
        <View style={styles.optionContainer}>
          <ScrollView keyboardShouldPersistTaps='always'>
            <View style={{ paddingHorizontal: 10 }}>
              {options}
            </View>
          </ScrollView>
        </View>
        <View style={styles.cancelContainer}>
          <TouchableOpacity onPress={this.close}>
            <View style={[styles.cancelStyle, this.props.cancelStyle]}>
              <Text style={[styles.cancelTextStyle, this.props.cancelTextStyle]}>
                {this.props.cancelText}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderChildren = () => {
    if (this.props.children) {
      return this.props.children;
    }
    return (
      <View style={[styles.selectStyle, this.props.selectStyle]}>
        <Text style={[styles.selectTextStyle, this.props.selectTextStyle]}>
          {this.state.selected}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={this.props.style}>
        <Modal
          transparent
          ref='modal'
          visible={this.state.modalVisible}
          onRequestClose={this.close}
          animationType={this.state.animationType}
        >
          {this.renderOptionList()}
        </Modal>
        <TouchableOpacity onPress={this.open}>
          {this.renderChildren()}
        </TouchableOpacity>
      </View>
    );
  }
}

ModalPicker.defaultProps = {
  data: [],
  onChange: () => {},
  initValue: '',
  style: {},
  selectStyle: {},
  optionStyle: {},
  optionTextStyle: {},
  sectionStyle: {},
  sectionTextStyle: {},
  cancelStyle: {},
  cancelTextStyle: {},
  overlayStyle: {},
  cancelText: 'cancel',
};
