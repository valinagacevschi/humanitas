import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
// import { cover } from '../Config/';
import Picture from './Picture';

export default class Cover extends React.Component {
  onPress = () => {
    const { mine, book } = this.props;
    if (mine) {
      if (book.tip === 'audio') {
        this.context.goTo('player', { book, mine, title: 'Audio Player' });
      } else {
        this.context.goTo('reader', { book, mine, index: this.props.index });
      }
    } else {
      const title = book.titlu;
      this.context.goTo('book', { book, title });
    }
  };

  render() {
    return (
      <TouchableHighlight
        activeOpacity={0.7}
        underlayColor="rgba(255,255,255,0.3)"
        onPress={this.onPress}
      >
        <Picture {...this.props} />
      </TouchableHighlight>
    );
  }
}

Cover.contextTypes = {
  goTo: PropTypes.func
};
