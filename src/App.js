import React, { Component } from 'react';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import GeneralStatusBarColor from './components/GeneralStatusBarColor';
import Unit from './model/Unit';
import Context from './services/Context';

import Login from './screens/Login';
import SearchAttendance from './screens/SearchAttendance';
import SelectUnit from './screens/SelectUnit';
import SignDocument from './screens/SignDocument';
import ViewAttendance from './screens/ViewAttendance';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { unit: null };
  }

  componentDidMount() {
    Unit.load().then(unit => this.setState({ unit }));
  }

  render() {
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
        <GeneralStatusBarColor backgroundColor="#957657" barStyle="light-content" />
        <Context.Provider value={{
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
