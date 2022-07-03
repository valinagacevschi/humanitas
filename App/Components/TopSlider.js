import React from 'react';
import { View, Platform } from 'react-native';
import { connect } from 'react-redux';
import Banner from './Banner';
import Swiper from './Swiper';
import xstyles from './Styles/TopSliderStyle';
import { Metrics, Colors } from '../Themes';

class TopSlider extends React.PureComponent {
  render() {
    let ratio = 2.333;
    if (Metrics.screenWidth > 700) {
      ratio = 1.8;
    }
    const banners = this.props.banners || [];
    const height = Metrics.screenWidth - 100; // Math.floor(Metrics.screenHeight / ratio);
    return (
      <View style={styles.container}>
        <Swiper
          autoplay
          autoplayTimeout={6}
          height={height}
          style={styles.wrapper}
          activeDotColor={Colors.mandarin}
        >
          {banners.map((item, index) => <Banner key={index} item={item} />)}
        </Swiper>
      </View>
    );
  }
}

const styles = {
  ...xstyles,
  container: {
    // marginTop: Platform.OS === 'ios' ? 5 : 0,
    backgroundColor: Colors.snow,
    marginBottom: -15,
  },
  wrapper: {}
};

const mapStateToProps = state => ({
  banners: state.banners.payload
});

export default connect(mapStateToProps)(TopSlider);
