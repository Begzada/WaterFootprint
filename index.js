import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

AppRegistry.registerComponent(appName, () => App);
