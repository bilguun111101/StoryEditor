/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import service from './src/utils/service';

TrackPlayer.registerPlaybackService(() => service);
AppRegistry.registerComponent(appName, () => App);
