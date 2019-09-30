import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';

//Pages
import HomeScreen from './src/pages/home';
import LoginScreen from './src/pages/login';
import SearchAttendanceScreen from './src/pages/searchAttendance';
import ResultAttendanceScreen from './src/pages/resultAttendance';

import GeneralStatusBarColor from './src/components/GeneralStatusBarColor';

export default class App extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
        hospitalSelected: null,
      }
  }

  componentDidMount() {
    AsyncStorage.getItem('hospitalSelected').then( data => {
      this.setState({
        hospitalSelected: JSON.parse(data)
      });
    });
  }

  render() {
    const RootStack = createStackNavigator(
      {
        Home: HomeScreen,
        Login: LoginScreen,
        SearchAttendance: SearchAttendanceScreen,
        ResultAttendance: ResultAttendanceScreen
      },
      {
        initialRouteName: this.state.hospitalSelected ? 'Login' : 'Home',
        headerMode: 'none',
        initialRouteParams: { 'hospitalSelected': this.state.hospitalSelected } 
      }
    );
    
    const AppContainer = createAppContainer(RootStack);
    return (
      <View style={{ flex: 1 }}>
        <GeneralStatusBarColor backgroundColor="#957657" barStyle="light-content"/>
        <AppContainer />
      </View>
    );
  }
}
