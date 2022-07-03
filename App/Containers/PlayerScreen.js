import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Video from 'react-native-video';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import MyBooksActions from '../Redux/MyBooksRedux';
import TracksActions from '../Redux/TracksRedux';
import AudioHeader from '../Components/AudioHeader';
import Track from '../Components/Track';
import AudioSlider from '../Components/AudioSlider';
import Progress from '../Components/Progress';
import musicControl from '../Components/MusicControl';
import BookNavBar from '../Navigation/BookNavBar';
import { pad } from '../Lib/Util';
// Styles
import styles from './Styles/PlayerScreenStyle';
import API from '../Services/Api';

const ROOT = 'https://example.com';

class Player extends React.Component {
  constructor(props) {
    super(props);
    const { book, mine } = props.navigation.state.params;
    const { trackuri, fisier } = book;
    const { id, current, currentTime } = props.tracks;

    const empty = mine && !book.tracks;
    let tracks = book.tracks && book.tracks.asMutable({ deep: true });
    if (!trackuri) {
      tracks = [{
        track: 1,
        paused: true,
        duration: null,
        currentTime: null,
        file: `${ROOT}/humanitas/audio/${book.preview}.mp3`
      }];
    } else if (!tracks || tracks.length === 0) {
      tracks = [...Array(trackuri)].map((_, i) => ({
        track: i + 1,
        paused: true,
        duration: null,
        currentTime: id === book.id && i === current ? currentTime : null,
        file: `${ROOT}/humanitas/audio/${pad(i + 1, 3)}_${fisier}.mp3`
      }));
    }

    this.state = {
      mine,
      empty,
      book,
      tracks,
      loading: false,
      current: id === book.id ? current : 0,
      paused: false,
      downloaded: 0,
    };
    this.tracks = tracks;
    // global.player = null;
    this.interval = null;
  }

  componentDidMount() {
    const { empty, book } = this.state;
    if (empty) {
      this.interval = setInterval(() => {
        const step = 1 / this.state.tracks.length / 3.3 / 6;
        this.setState({ downloaded: this.state.downloaded + step });
      }, 300);
      this.props.downloadTracks(book);
    }

    global.musicCrtl = musicControl({
      book: this.state.book,
      current: this.state.current,
      onPlay: () => this.onPressPlay(this.state.current || 0),
      onPause: () => {
        this.state.tracks.map(t => (t.paused = true));
        this.setState({ tracks: [...this.state.tracks] });
      },
      onStop: () => {
        this.state.tracks.map(t => (t.paused = true));
        this.setState({ tracks: [...this.state.tracks] });
      },
      onNext: () => this.next(),
      onPrev: () => this.next(-1),
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.book && this.state.empty) {
      this.tracks = newProps.book.tracks.asMutable({ deep: true });
      this.setState({ book: newProps.book, tracks: this.tracks, empty: false });
    }
  }

  onEnd = () => this.next();

  onPressPlay = (index) => {
    this.state.tracks.map((t, i) => {
      if (index !== i) t.paused = true;
    });
    this.setState({ current: index });
    const track = this.state.tracks[index];
    track.paused = !track.paused;
    const { duration, currentTime } = track;
    // console.log('track', this.state.track, track);
    if (currentTime >= duration) {
      global.player.seek(0);
    } else {
      global.player.seek(currentTime);
    }
    this.setState({
      loading: !track.paused,
      tracks: [...this.state.tracks],
      paused: !this.state.paused,
    });
    if (duration && currentTime) {
      this.nowPlaying(this.state.current + 1, duration, currentTime);
    }
  }

  setDuration = (data) => {
    this.state.tracks[this.state.current].duration = data.duration;
    const { duration, currentTime } = this.state.tracks[this.state.current];
    this.setState({
      tracks: [...this.state.tracks],
      paused: true,
    });
    this.nowPlaying(this.state.current + 1, duration, currentTime || 0);
  }

  setTime = (data) => {
    this.state.tracks[this.state.current].currentTime = data.currentTime;
    this.setState({
      loading: false,
      tracks: [...this.state.tracks]
    });
    // this.props.setTracks(this.state.book.id, this.state.current, data.currentTime);
  }

  slideTo = (value) => {
    const duration = this.state.tracks[this.state.current].duration;
    global.player.seek(value * duration);
  }

  videoError = (data) => {
    __DEV__ && console.log('Error', data.error);
    const track = this.state.tracks[this.state.current];
    // const { cod } = this.state.book;
    const api = API.create();
    api.downloadAudio(track.file).then(ref => {
      track.local = ref.path();
      track.paused = true;
      track.duration = null;
      track.currentTime = null;
      this.setState({
        tracks: this.state.tracks
      });
    });
  }

  nowPlaying = (chapter, duration, currentTime) => {
    global.musicCrtl.setNowPlaying({
      ...this.options,
      album: `Capitolul ${chapter || 1}`,
      duration,
      elapsedTime: currentTime || 0
    });
  }

  next = (sense = 1) => {
    const index = this.state.current || 0;
    const size = this.state.tracks.length;
    let nextIndex = index + sense;
    this.state.tracks.map(t => (t.paused = true));
    if (nextIndex === size) {
      nextIndex = 0;
    } else if (nextIndex === -1) {
      nextIndex = size - 1;
    }
    this.state.tracks[nextIndex].paused = false;
    const duration = this.state.tracks[nextIndex].duration;
    this.setState({
      tracks: [...this.state.tracks],
      current: nextIndex
    });
    if (duration) {
      this.nowPlaying(nextIndex + 1, duration);
    }
  }

  renderTrack = (props) => (
    <Track {...props} current={this.state.current} onPress={() => this.onPressPlay(props.index)} />
  );

  render() {
    if (this.state.downloaded >= 1) {
      clearInterval(this.interval);
    }
    const item = this.state.tracks[this.state.current];
    const { currentTime, duration, file, local } = item;
    const progress = currentTime && duration ? parseFloat(currentTime) / parseFloat(duration) : 0;
    return (
      <View style={styles.mainContainer}>
        <BookNavBar title="Audio Player" />
        <AudioHeader book={this.state.book} />
        {this.state.loading && 
          <ActivityIndicator size="large" style={styles.activity} />
        }
        <FlatList
          contentContainerStyle={{ padding: 5 }}
          keyExtractor={(_, index) => index}
          data={this.state.tracks}
          renderItem={this.renderTrack}
        />
        <Video
          source={{ uri: local ? `file://${local}` : file }}
          ref={ref => (global.player = ref)}
          rate={1.0}
          volume={1.0}
          muted={false}
          paused={item.paused}
          resizeMode="cover"
          repeat={false}
          playInBackground
          playWhenInactive
          ignoreSilentSwitch={'ignore'}
          progressUpdateInterval={1000.0}
          onLoad={(data) => this.setDuration(data)}
          onProgress={this.setTime}
          onEnd={this.onEnd}
          onError={this.videoError}
          style={styles.backgroundVideo}
        />
        <AudioSlider 
          currentTime={currentTime}
          progress={progress}
          duration={duration}
          onValueChange={value => this.slideTo(value)}
        />
        {this.props.fetching && 
          <Progress progress={this.state.downloaded} />
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  tracks: state.tracks,
  fetching: state.myBooks.fetching,
  book: state.myBooks.book
});

const mapDispatchToProps = dispatch => ({
  downloadTracks: book => dispatch(MyBooksActions.downloadTracks(book)),
  setTracks: (id, current, currentTime) =>
    dispatch(TracksActions.tracksSet(id, current, currentTime))
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
