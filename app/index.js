/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry, YellowBox} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';

// ignore the metro babel error for now
YellowBox.ignoreWarnings(['Require cycle:']);

// launch the app
AppRegistry.registerComponent(appName, () => App);
