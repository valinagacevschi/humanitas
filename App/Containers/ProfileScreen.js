import React from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import ProfileActions from '../Redux/ProfileRedux';
import ItemInput from '../Components/ItemInput';
// import ModalPicker from '../Components/ModalPicker';
import BookNavBar from '../Navigation/BookNavBar';
// Styles
import styles from './Styles/ProfileScreenStyle';
import { Colors } from '../Themes';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      county: 'BUCURESTI',
      country: 'ROMANIA',
      ...props.profile
    };
  }
  
  componentDidMount() {
    if (_.isEmpty(this.props.profile)) {
      this.props.getProfile();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.profile) {
      this.setState({
        ...newProps.profile
      });
    }
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  }

  render() {
    // if (!this.props.profile || this.props.fetching) return null;
    const image = `${window.fix(this.state.image)}?type=large`;
    return (
      <View>
        <BookNavBar title="Profile" />
        <KeyboardAwareScrollView
          style={styles.container}
          contentContainerStyle={{ justifyContent: 'center' }}
        >
          <View style={styles.imageBox}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>

          <View style={styles.form}>
            <View style={styles.row}>
              <ItemInput
                label={I18n.t('first_name')}
                validType="text"
                value={this.state.first_name}
                ref="k1"
                onChangeText={text => this.setState({ first_name: text })}
                onSubmitEditing={() => this.refs.k2.focus()}
              />
            </View>
            <View style={styles.row}>
              <ItemInput
                label={I18n.t('last_name')}
                validType="text"
                value={this.state.last_name}
                ref="k2"
                onChangeText={text => this.setState({ last_name: text })}
                onSubmitEditing={() => this.refs.k3.focus()}
              />
            </View>
            <View style={styles.row}>
              <ItemInput
                label={I18n.t('email')}
                validType="email"
                value={this.state.email || ''}
                ref="k3"
                keyboardType="email-address"
                onChangeText={email => this.setState({ email })}
                onSubmitEditing={() => this.refs.k4.focus()}
              />
            </View>
            <View style={styles.row}>
              <ItemInput
                label={I18n.t('phone')}
                validType="phone"
                value={this.state.phone || ''}
                ref="k4"
                keyboardType="phone-pad"
                onChangeText={phone => this.setState({ phone })}
                onSubmitEditing={() => this.refs.k5.focus()}
              />
            </View>
            <View style={styles.row}>
              <ItemInput
                label={I18n.t('address')}
                validType="text"
                value={this.state.address}
                ref="k5"
                onChangeText={address => this.setState({ address })}
                onSubmitEditing={() => this.refs.k6.focus()}
              />
            </View>
            <View style={styles.row}>
              <ItemInput
                label={I18n.t('county')}
                validType="text"
                value={this.state.county}
                ref="k6"
                onChangeText={county => this.setState({ county })}
                onSubmitEditing={() => this.refs.k7.focus()}
              />
              {/* <ModalPicker
                data={[{ key: 0, section: true, label: 'Select County' }, { key: 1, label: 'Male' }, { key: 2, label: 'Female' }]}
                onChange={(option) => this.setState({ county: option.label })}
                selectStyle={{ padding: 0, borderWidth: 0 }}                
              /> */}
            </View>
            <View style={styles.row}>
              <ItemInput
                label={I18n.t('country')}
                validType="text"
                value={this.state.country}
                ref="k7"
                onChangeText={country => this.setState({ country })}
                onSubmitEditing={() => this.props.saveProfile(this.state)}
              />
            </View>

            <View style={styles.row}>
              <Icon.Button
                name="save"
                style={styles.button}
                backgroundColor={Colors.transparent}
                borderRadius={40}
                onPress={() => this.props.saveProfile(this.state)}
              >
                <Text style={styles.fbText}>{I18n.t('save')}</Text>
              </Icon.Button>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  fetching: state.profile.fetching,
  profile: state.profile.payload
});

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(ProfileActions.profileRequest()),
  saveProfile: profile => dispatch(ProfileActions.profileSave(profile))
});

const areStatesEqual = (prev, next) => (
  _.isEqual(prev.profile.payload, next.profile.payload)
);

export default connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(ProfileScreen);
// export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
