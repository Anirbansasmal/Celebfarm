/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import Store from './Src/redux/Index';

LogBox.ignoreAllLogs();
const Celebfarm = () => {
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Celebfarm);
