import React from 'react';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//Pages
import HomeScreen from './src/pages/home';
import LoginScreen from './src/pages/login';
import SearchAttendanceScreen from './src/pages/searchAttendance';
import ResultAttendanceScreen from './src/pages/resultAttendance';

import GeneralStatusBarColor from './src/components/GeneralStatusBarColor';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    SearchAttendance: SearchAttendanceScreen,
    ResultAttendance: ResultAttendanceScreen
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <GeneralStatusBarColor backgroundColor="#957657" barStyle="light-content"/>
        <AppContainer />
      </View>
    );
  }
}
