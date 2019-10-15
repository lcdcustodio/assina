import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';

import UnitSelectionScreen from './pages/unit';
import LoginScreen from './pages/login';
import AttendanceSearchScreen from './pages/attendance';
import AttendanceResultsScreen from './pages/attendance/results';
import DocumentScreen from './pages/document';

import GeneralStatusBarColor from './components/GeneralStatusBarColor';


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
        UnitSelection: UnitSelectionScreen,
        Login: LoginScreen,
        AttendanceSearch: AttendanceSearchScreen,
        AttendanceResults: AttendanceResultsScreen,
        Document: DocumentScreen,
      },
      {
        initialRouteName: this.state.unit ? 'Login' : 'UnitSelection',
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
