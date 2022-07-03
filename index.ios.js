import { AppRegistry } from 'react-native';
import './App/Config/ReactotronConfig';
import App from './App/Containers/App';

global.player = null;
global.musicCtrl = null;

AppRegistry.registerComponent('Humanitas', () => App);
