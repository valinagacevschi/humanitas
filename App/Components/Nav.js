import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableHighlight,
  StatusBar,
  Modal,
  TouchableOpacity
} from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BookmarkList from '../Components/BookmarkList';
import styles from './Styles/NavStyle';
import { Colors } from '../Themes';

const options = [{ label: 'Cuprins', tip: 'toc' }, { label: 'Semne de carte', tip: 'bookmark' }];

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      modalVisible: false,
      tip: 'toc'
    };
  }

  componentDidMount() {
    if (this.props.shown) {
      this.show();
    } else {
      this.hide();
    }
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

  onPress = (item) => {
    if (this.props.display) {
      this.props.display(item);
    }
    this.hide();
  }

  setSelectedOption = ({ tip }) => {
    this.setState({ tip });
  }

  show = () => {
    this.setState({ modalVisible: true });
  }

  hide = () => {
    this.setState({ modalVisible: false });
  }

  closeModal = () => {
    this.props.onClose();
  }

  renderItem = ({ item }) => (
    <TouchableHighlight onPress={() => this.onPress(item.href)}>
      <View style={styles.row}>
        <Text numberOfLines={2} style={styles.title}>
          {item.label.trim()}
        </Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={'slide'}
          visible={this.state.modalVisible}
          onRequestClose={() => console.log('close requested')}
        >
          <StatusBar hidden />
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{this.props.title}</Text>
            <TouchableOpacity style={styles.backButton} onPress={() => this.hide()}>
              <Icon name="close" color={Colors.snow} size={24} />
            </TouchableOpacity>
          </View>
          <SegmentedControls
            containerStyle={{ marginHorizontal: 15, marginVertical: 5 }}
            tint={Colors.mandarin}
            selectedTint={Colors.snow}
            backTint={Colors.snow}
            options={options}
            onSelection={this.setSelectedOption}
            selectedOption={this.state.tip}
            extractText={option => option.label}
            testOptionEqual={(selectedValue, option) => selectedValue === option.tip}
          />
          {this.state.tip === 'toc' ? (
            <FlatList
              style={styles.container}
              data={this.props.toc}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          ) : (
            <BookmarkList
              bookmarks={this.props.bookmarks}
              onDelete={item => this.props.onDeleteBookmark(item)}
              onSelectToc={this.onPress}
            />
          )}
        </Modal>
      </View>
    );
  }
}

// export default Nav;
