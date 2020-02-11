import React, { Component } from 'react';
import { View } from 'react-native';
import { createAppContainer, NavigationScreenComponent } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { assets, AssinaStatusBar, Routes } from './components/assina-base';
import Context from './components/Context';
import api from './services/api';

import Login from './screens/Login';
import SearchAttendance from './screens/SearchAttendance';
import SelectUnit from './screens/SelectUnit';
import SignDocument from './screens/SignDocument';
import ViewAttendance from './screens/ViewAttendance';

// Cast não-seguro, mas sem solução melhor no momento.
type Screen = NavigationScreenComponent<any, any>;

const RootStack = createStackNavigator({
  [Routes.Login]: { screen: (Login as unknown) as Screen },
  [Routes.SearchAttendance]: { screen: (SearchAttendance as unknown) as Screen },
  [Routes.SelectUnit]: { screen: (SelectUnit as unknown) as Screen },
  [Routes.SignDocument]: { screen: (SignDocument as unknown) as Screen },
  [Routes.ViewAttendance]: { screen: (ViewAttendance as unknown) as Screen },
}, {
  initialRouteName: Routes.SelectUnit,
  headerMode: 'none',
});

const AppContainer = createAppContainer(RootStack);

export default class App extends Component<{}, {}> {

  constructor(props: {}) {
    super(props);
    const { environments, defaultEnvironment, timeoutMillis } = assets.appJson;
    api.baseUrl = environments[defaultEnvironment].baseUrl;
    api.timeoutMillis = timeoutMillis;
  }

  render() {
    const { defaultEnvironment } = assets.appJson;
    return (
      <View style={{ flex: 1 }}>
        <AssinaStatusBar />
        <Context.Provider value={{
          environment: defaultEnvironment,
          unit: null,
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
