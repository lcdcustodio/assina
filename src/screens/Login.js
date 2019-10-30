import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import { Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import AbstractScreen, { styles as baseStyles } from './AbstractScreen';
import { AssinaButton, AssinaLoading } from '../components/assina-base';
import { logoImage, vilaNovaBackgroundImage, dfStarBackgroundImage } from '../components/assets';
import Context from '../services/Context'

export default class Login extends AbstractScreen {

  constructor(props) {
    super(props, {
      username: 'admin',
      password: '123456',
    });
  }

  handleLogin = async (unit) => {
    const username = this.state.username.trim();
    const password = this.state.password.trim();
    if (!username.length || !password.length) {
      return this.warn('Por favor, preencha todos os campos.');
    }
    this.startLoading();
    try {
      await unit.login(username, password);
    } catch (apiError) {
      switch (apiError.httpStatus) {
        case 401:
          return this.warn('Usuário e/ou senha inválidos.');
        default:
          return this.handleApiError(apiError);
      }
    }
    this.stopLoading();
    this.props.navigation.navigate('SearchAttendance');
  }

  getBackground = (unit) => {
    if (unit) switch (unit.id) {
      case 1:
        return vilaNovaBackgroundImage;
      case 2:
        return dfStarBackgroundImage;
    }
  }

  render() {
    return <Context.Consumer>{ctx =>
      <View style={styles.container}>
        <AssinaLoading visible={this.isLoading} />
        <ImageBackground source={this.getBackground(ctx.unit)} style={styles.backgroundImage}>
          <View style={styles.containerLogo}>
            <Image source={logoImage} resizeMode='contain' style={styles.imgLogo} />
          </View>
          <View style={styles.containerForm}>
            <View style={styles.inputGroup}>
              <Text style={styles.textLabel}>Usuário</Text>
              <Item>
                <Icon type='Feather' active name='user' color='white' size={25} />
                <Input value={this.state.username}
                  placeholder='login'
                  placeholderTextColor='white'
                  autoCapitalize='none'
                  autoCorrect={false}
                  style={styles.textInput}
                  onChange={(event) => this.handleChange('username', event)} />
              </Item>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.textLabel}>Senha</Text>
              <Item>
                <Icon type='Feather' active name='lock' color='white' size={25} />
                <Input secureTextEntry value={this.state.password}
                  placeholder='******'
                  placeholderTextColor='white'
                  autoCapitalize='none'
                  autoCorrect={false}
                  style={styles.textInput}
                  onChange={(event) => this.handleChange('password', event)} />
              </Item>
            </View>
          </View>
          <AssinaButton text='Login' style={styles.button} textStyle={styles.buttonText}
            onPress={() => this.handleLogin(ctx.unit)} />
        </ImageBackground>
      </View>
    }</Context.Consumer>
  }
}

const styles = {
  ...baseStyles,
  containerLogo: {
    alignItems: 'center',
  },
  imgLogo: {
    width: '80%',
    marginTop: '5%',
  },
  containerForm: {
    width: '75%',
    height: '35%',
    marginTop: '10%',
    marginLeft: '12.5%',
    borderColor: 'black',
    borderWidth: 0,
    marginBottom: '10%'
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
    color: 'white',
  },
  textInput: {
    marginLeft: '3%',
    opacity: 0.6,
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 0.02,
    color: 'white',
  },
  button: {
    marginHorizontal: '12.5%',
    backgroundColor: 'white',
  },
  buttonText: {
    margin: '5%',
    fontSize: 30,
    color: '#957657',
  },
};
