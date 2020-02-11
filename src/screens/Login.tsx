import React, { ReactNode } from 'react';
import { Image, ImageBackground, Text, TextStyle, View } from 'react-native';
import { Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import { assets, AssinaButton, AssinaLoading, AssinaSeparator, Routes } from '../components/assina-base';
import baseStyles from '../components/assina-styles';
import Screen, { ScreenProps, ScreenState } from '../components/Screen';
import Unit from '../model/Unit';
import api from '../services/api';

type LoginState = ScreenState & {
  username: string;
  password: string;
};
export default class Login extends Screen<LoginState> {

  private constructor(props: ScreenProps) {
    super(props, { username: '', password: '' });
  }

  public render(): ReactNode {
    const { version, defaultEnvironment } = assets.appJson;
    const { environment } = this.context;
    const { username, password } = this.state;
    const info = (environment === defaultEnvironment ? `v${version}` : `v${version} - ${environment}`);
    return (
      <ImageBackground source={this.getBackground()} style={baseStyles.imageBackground}>
        <AssinaLoading visible={this.isLoading} />
        <AssinaSeparator vertical='5%' />
        <View style={styles.containerLogo}>
          <Image source={assets.logoImage} resizeMode='contain' style={baseStyles.image} />
        </View>
        <AssinaSeparator vertical='12%' />
        <View style={styles.containerForm}>
          <Text style={styles.textLabel}>Usuário</Text>
          <Item>
            <Icon name='user' color='white' size={25} />
            <Input value={username} placeholder='login'
              placeholderTextColor='#fff7' style={styles.textInput}
              autoCompleteType="username" autoCapitalize="none" autoCorrect={false}
              onChange={(event) => this.handleTextChange('username', event)} />
          </Item>
          <AssinaSeparator vertical='15%' />
          <Text style={styles.textLabel}>Senha</Text>
          <Item>
            <Icon name='lock' color='white' size={25} />
            <Input secureTextEntry value={password} placeholder='******'
              placeholderTextColor='#fff7' style={styles.textInput}
              autoCompleteType="password" autoCapitalize="none" autoCorrect={false}
              onChange={(event) => this.handleTextChange('password', event)} />
          </Item>
        </View>
        <AssinaSeparator vertical='6.5%' />
        <AssinaButton text='Login' style={styles.button} textStyle={styles.buttonText}
          onPress={() => this.handleLogin()} />
        <AssinaSeparator vertical='6.5%' />
        <Text style={styles.info}>{info}</Text>
      </ImageBackground>
    );
  }

  private getBackground(): number {
    switch (this.context.unit.id) {
      case 1:
        return assets.vilaNovaBackgroundImage;
      case 2:
        return assets.dfStarBackgroundImage;
    }
  }

  private async handleLogin(): Promise<void> {
    let { username, password } = this.state;
    username = username.trim();
    password = password.trim();
    // Lida com troca de ambiente através da tela de login.
    const { appJson } = assets;
    const env = appJson.environments[username];
    if (env && password === appJson.environmentPassword) {
      this.context.environment = username;
      api.baseUrl = env.baseUrl;
      await Unit.clear();
      this.context.unit = null;
      this.props.navigation.replace(Routes.SelectUnit);
      return;
    }
    // Efetua o login convencional.
    if (!username.length || !password.length) {
      return this.warn('Por favor, preencha todos os campos.');
    }
    this.startLoading();
    try {
      await this.context.unit.login(username, password);
    } catch (error) {
      return this.handleError(error, [{ status: 401, message: 'Usuário e/ou senha inválidos.' },]);
    }
    this.stopLoading();
    this.props.navigation.navigate(Routes.SearchAttendance);
  }
}

const styles = {
  containerLogo: {
    height: '30%',
    marginHorizontal: '10%',
  },
  containerForm: {
    height: '35%',
    marginHorizontal: '12.5%',
  },
  textLabel: {
    ...baseStyles.textBold,
    fontSize: 30,
  },
  textInput: {
    ...baseStyles.text,
    marginHorizontal: '3%',
    opacity: 0.75,
    fontSize: 30,
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
  info: {
    ...baseStyles.text,
    fontSize: 15,
    textAlign: 'right',
    marginHorizontal: '3%',
    textShadowColor: '#0003',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    opacity: 0.5,
  } as TextStyle,
};
