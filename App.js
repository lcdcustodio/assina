import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//Pages
import HomeScreen from './src/pages/home';
import LoginScreen from './src/pages/login';
import SearchAttendanceScreen from './src/pages/searchAttendance';
import ResultAttendanceScreen from './src/pages/resultAttendance';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    SearchAttendance: SearchAttendanceScreen,
    ResultAttendance: ResultAttendanceScreen
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
