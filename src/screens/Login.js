import React from 'react';
import { TouchableHighlight, View, Text, ImageBackground, Image } from 'react-native';
import { Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import AbstractScreen, { Loading } from './AbstractScreen';
import api from '../services/api';

export default class Login extends AbstractScreen {

  constructor(props) {
    super(props, {
      username: 'admin',
      password: '123456',
      unit: props.navigation.getParam('unit')
    });
  }

  didFocus = this.props.navigation.addListener('didFocus', async (res) => {
    const unit = this.props.navigation.getParam('unit');
    this.setState({ unit });
  });

  handleLogin = async () => {
    const username = this.state.username.trim();
    const password = this.state.password.trim();
    if (username.length === 0 || password.length === 0) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    const unit = this.state.unit;
    if (unit == null) {
      alert('Hospital selecionado não identificado.');
      return;
    }
    this.isLoading = true;
    try {
      await api.login(username, password, unit.id);
    } catch (apiError) {
      return this.handleApiError(apiError);
    }
    this.isLoading = false;
    this.props.navigation.navigate('SearchAttendance');
  }

  getBackground() {
    if (this.state.unit && this.state.unit.id === 1) {
      return require('../../assets/images/vila-nova-background.jpg');
    } else if (this.state.unit && this.state.unit.id === 2) {
      return require('../../assets/images/dfstar-background.png');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Loading visible={this.isLoading} />
        <ImageBackground source={this.getBackground()} style={styles.imgBackground}>
          <View style={styles.containerLogo}>
            <Image source={require('../../assets/images/assinaLogo.png')} style={styles.imgLogo} />
          </View>
          <View style={styles.containerForm}>
            <View style={styles.inputGroup}>
              <Text style={styles.textLabel}>Usuário</Text>
              <Item>
                <Icon type='Feather' active name='user' color='#FFFFFF' size={25} />
                <Input style={styles.textInput}
                  placeholder='seu.usuario'
                  value={this.state.username}
                  placeholderTextColor='#FFFFFF'
                  autoCapitalize='none'
                  autoCorrect={false}
                  onChange={(event) => this.handleChange('username', event)} />
              </Item>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.textLabel}>Senha</Text>
              <Item>
                <Icon type='Feather' active name='lock' color='#FFFFFF' size={25} />
                <Input secureTextEntry style={styles.textInput}
                  placeholder='******'
                  value={this.state.password}
                  placeholderTextColor='#FFFFFF'
                  autoCapitalize='none'
                  autoCorrect={false}
                  onChange={(event) => this.handleChange('password', event)} />
              </Item>
            </View>
          </View>
          <View style={styles.containerButton}>
            <TouchableHighlight style={styles.button} onPress={this.handleLogin} underlayColor='#ffffff'>
              <Text style={styles.textButton}>LOGIN</Text>
            </TouchableHighlight>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  imgBackground: {
    width: '100%',
    height: '100%'
  },
  containerLogo: {
    alignItems: 'center'
  },
  imgLogo: {
    marginTop: '5%'
  },
  containerForm: {
    width: '75%',
    height: '35%',
    marginTop: '10%',
    marginLeft: '12.5%',
    borderColor: 'black',
    borderWidth: 0,
    marginBottom: '5%'
  },
  inputGroup: {
    marginTop: '5%',
    marginBottom: '10%',
  },
  textLabel: {
    fontFamily: 'Roboto-Bold',
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#ffffff'
  },
  textInput: {
    marginLeft: '3%',
    opacity: 0.6,
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 0.02,
    color: '#ffffff'
  },
  containerButton: {
    marginTop: '5%',
    marginLeft: '12.5%',
    width: '75%',

  },
  button: {
    padding: '5%',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFFFFF'
  },
  textButton: {
    fontSize: 30,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#957657'
  },
};