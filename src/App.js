import React, { Component } from 'react';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';

import GeneralStatusBarColor from './components/GeneralStatusBarColor';

import Login from './screens/Login';
import SearchAttendance from './screens/SearchAttendance';
import SelectUnit from './screens/SelectUnit';
import SignDocument from './screens/SignDocument';
import ViewAttendance from './screens/ViewAttendance';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      unit: null,
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('unit').then(data => {
      const unit = JSON.parse(data);
      this.setState({ unit });
    });
  }

  render() {
    const RootStack = createStackNavigator(
      {
        Login,
        SearchAttendance,
        SelectUnit,
        SignDocument,
        ViewAttendance,
      },
      {
        initialRouteName: this.state.unit ? 'Login' : 'SelectUnit',
        headerMode: 'none',
        initialRouteParams: { 'unit': this.state.unit }
      }
    );

    const AppContainer = createAppContainer(RootStack);
    return (
      <View style={{ flex: 1 }}>
        <GeneralStatusBarColor backgroundColor="#957657" barStyle="light-content" />
        <AppContainer />
      </View>
    );
  }
}
