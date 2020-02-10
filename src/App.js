import React, { Component } from 'react';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { assets, AssinaStatusBar } from './components/assina-base';
import Unit from './model/Unit';
import Context from './components/Context';
import api from './services/api';

import Login from './screens/Login';
import SearchAttendance from './screens/SearchAttendance';
import SelectUnit from './screens/SelectUnit';
import SignDocument from './screens/SignDocument';
import ViewAttendance from './screens/ViewAttendance';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { unit: null };
    const { appJson } = assets;
    const env = appJson.environments[appJson.defaultEnvironment];
    api.baseUrl = env.baseUrl;
    api.timeoutMillis = appJson.timeoutMillis;
  }

  componentDidMount() {
    Unit.load().then(unit => this.setState({ unit }));
  }

  render() {
    const { defaultEnvironment } = assets.appJson;
    const { unit } = this.state;
    const RootStack = createStackNavigator(
      {
        Login,
        SearchAttendance,
        SelectUnit,
        SignDocument,
        ViewAttendance,
      },
      {
        initialRouteName: unit ? 'Login' : 'SelectUnit',
        headerMode: 'none',
      }
    );
    const AppContainer = createAppContainer(RootStack);
    return (
      <View style={{ flex: 1 }}>
        <AssinaStatusBar />
        <Context.Provider value={{
          environment: defaultEnvironment,
          unit,
          attendance: null,
          document: null,
          callerStopLoading: null,
        }}>
          <AppContainer />
        </Context.Provider>
      </View>
    );
  }
}
