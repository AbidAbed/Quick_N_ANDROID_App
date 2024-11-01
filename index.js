/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
//TODO , add 'main' instead of 'appName' for expo go

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./utils/services.js'));
