import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, BackHandler, Text, Image, Alert, Linking } from 'react-native';
import { connect } from 'react-redux';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';
// import StartupActions from '../Redux/StartupRedux';
import LoginActions from '../Redux/LoginRedux';

import DrawerButton from '../Components/DrawerButton';

import styles from './Styles/DrawerContentStyles';
// import { Fonts, Metrics, Colors } from '../Themes';

class DrawerContent extends Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.context.drawer.props.open) {
        this.toggleDrawer();
        return true;
      }
      return false;
    });
  }

  onCategoryPress = (category, section) => {
    const title = category.capitalizeFirstLetter();
    this.toggleDrawer();
    this.context.goTo('category', { title, section, category });
  }

  onSignInPress = () => {
    this.toggleDrawer();
    this.context.goTo('login');
  }

  onSignOutPress = () => {
    Alert.alert(I18n.t('alert'), I18n.t('areUsure'), [
      { text: 'Nu', style: 'cancel' },
      { text: 'Da', onPress: () => this.props.logout() },
    ]);
    this.toggleDrawer();
  }

  onMyBooksPress = () => {
    this.toggleDrawer();
    this.context.goTo('mybooks');
  }

  onTermsPress = () => {
    this.toggleDrawer();
    this.context.goTo('terms');
  }

  onProfilePress = () => {
    this.toggleDrawer();
    this.context.goTo('profile');
  }

  onLinkPress = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        // console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));    
  };

  toggleDrawer = () => {
    this.context.drawer.close();
  }

  renderHeader(section, index, isActive) {
    return (
      <Animatable.View
        style={styles.header}
        duration={700}
        transition='backgroundColor'
        style={{ backgroundColor: (isActive ? 'rgba(245,245,245,1)' : 'rgba(255,255,255,1)') }}
      >
        <View style={styles.heading}>
          <Text style={styles.headerText}>{section.title}</Text>
          <Icon name="caret-down" style={styles.icon} />
        </View>

      </Animatable.View>
    );
  }

  renderContent = (section) => {
    if (this.props.categories) {
      return (
        this.props.categories[section.key].map((c, i) =>
          <DrawerButton
            key={i}
            text={c}
            style={{ fontSize: 15 }}
            onPress={() => this.onCategoryPress(c, section.key)}
          />
        )
      );
    }
    return null;
  }

  renderUser = () => {
    const { image, first_name, last_name } = this.props.user;
    const name = `${first_name || ''} ${last_name || ''}`;
    return (
      <View style={styles.userCard}>
        {image && <Image
          source={{ uri: `${window.fix(image)}?type=large` }}
          resizeMode='cover'
          style={styles.userImage}
        />}
        <Text style={{ paddingVertical: 20, paddingHorizontal: 10 }}>{name}</Text>
      </View>
    );
  }

  render() {
    const login = !!this.props.user;
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {login && this.renderUser()}
        <ScrollView>
          <Accordion
            sections={[
              { title: I18n.t('books'), key: 'epub' },
              { title: I18n.t('audio'), key: 'audio' }
            ]}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
          />
          {login &&
            <DrawerButton text={I18n.t('myBooks')} onPress={this.onMyBooksPress} />}
          {login &&
            <DrawerButton text={I18n.t('profile')} onPress={this.onProfilePress} />}
          {!login &&
            <DrawerButton text={I18n.t('signIn')} onPress={this.onSignInPress} />}
          <DrawerButton text={I18n.t('terms')} onPress={this.onTermsPress} />
          <DrawerButton 
            boxStyle={{ borderColor: '#999', borderTopWidth: 0.5 }} 
            text={I18n.t('contactMail')} 
            onPress={() => this.onLinkPress('mailto:app@humanitas.ro')} 
          />
          <DrawerButton 
            boxStyle={{ borderColor: '#999', borderBottomWidth: 0.5 }} 
            text={I18n.t('contactTel')} 
            onPress={() => this.onLinkPress('tel:+40214088350')} 
          />
          {login &&
            <DrawerButton text={I18n.t('signOut')} onPress={this.onSignOutPress} />}
        </ScrollView>
      </ScrollView>
    );
  }

}

DrawerContent.contextTypes = {
  drawer: PropTypes.object,
  // goBack: PropTypes.func,
  goTo: PropTypes.func,
};

const mapStateToProps = (state) => ({
  categories: state.books.categories,
  user: state.profile.payload,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(LoginActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
