import MusicControl from 'react-native-music-control';
import { cover } from '../Config/';

export default (props) => {
  MusicControl.enableBackgroundMode(true);
  MusicControl.enableControl('play', true);
  MusicControl.enableControl('pause', true);
  MusicControl.enableControl('stop', true);
  MusicControl.enableControl('nextTrack', true);
  MusicControl.enableControl('previousTrack', true);
  MusicControl.enableControl('seekForward', true);
  MusicControl.enableControl('seekBackward', true);

  MusicControl.enableControl('seek', true);
  MusicControl.enableControl('setRating', true);
  MusicControl.enableControl('volume', true);
  MusicControl.enableControl('remoteVolume', true);

  MusicControl.on('play', () => props.onPlay());
  MusicControl.on('pause', () => props.onPause());
  MusicControl.on('stop', () => props.onStop());
  MusicControl.on('nextTrack', () => props.onNext());
  MusicControl.on('previousTrack', () => props.onPrev());

  const { titlu, name } = props.book;
  const title = titlu;

  const options = {
    title,
    artist: name.capitalize(),
    artwork: cover(props.book, 'thumb'),
    album: `Capitolul ${(props.current || 0) + 1}`,
    genre: 'audiobooks',
    description: title || 'AudioBook',
    color: 0xff9922,
    rating: MusicControl.RATING_PERCENTAGE
  };

  MusicControl.setNowPlaying(options);

  MusicControl.updatePlayback({
    state: MusicControl.STATE_STOPPED,
    elapsedTime: 0
  });
  
  return MusicControl;
};

// export const setNowPlaying = (options) => MusicControl.setNowPlaying(options);
