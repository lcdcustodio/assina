import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import { Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import Screen, { ScreenProps, ScreenState, styles as baseStyles } from '../components/Screen';
import { assets, AssinaButton, AssinaLoading, AssinaSeparator } from '../components/assina-base';

type LoginState = ScreenState & {
  username: string;
  password: string;
};
export default class Login extends Screen<LoginState> {

  private constructor(props: ScreenProps) {
    super(props, { username: 'admin', password: '123456' });
  }

  public render(): JSX.Element {
    const { username, password } = this.state;
    return <View style={styles.container}>
      <AssinaLoading visible={this.isLoading} />
      <ImageBackground source={this.getBackground()} style={styles.backgroundImage}>
        <AssinaSeparator vertical='5%' />
        <View style={styles.containerLogo}>
          <Image source={assets.logoImage} resizeMode='contain' style={styles.imgLogo} />
        </View>
        <AssinaSeparator vertical='12%' />
        <View style={styles.containerForm}>
          <Text style={styles.textLabel}>Usuário</Text>
          <Item>
            <Icon name='user' color='white' size={25} />
            <Input value={username} placeholder='login'
              placeholderTextColor='white' style={styles.textInput}
              autoCorrect={false} onChange={(event) => this.handleTextChange('username', event)} />
          </Item>
          <AssinaSeparator vertical='15%' />
          <Text style={styles.textLabel}>Senha</Text>
          <Item>
            <Icon name='lock' color='white' size={25} />
            <Input secureTextEntry value={password} placeholder='******'
              placeholderTextColor='white' style={styles.textInput}
              autoCorrect={false} onChange={(event) => this.handleTextChange('password', event)} />
          </Item>
        </View>
        <AssinaSeparator vertical='6.5%' />
        <AssinaButton text='Login' style={styles.button} textStyle={styles.buttonText}
          onPress={() => this.handleLogin()} />
      </ImageBackground>
    </View>
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
    if (!username.length || !password.length) {
      return this.warn('Por favor, preencha todos os campos.');
    }
    this.startLoading();
    try {
      await this.context.unit.login(username, password);
    } catch (error) {
      return this.handleError(error, [
        { status: 401, message: 'Usuário e/ou senha inválidos.' },
        { status: 403, message: 'Usuário e/ou senha inválidos.' },
      ]);
    }
    this.stopLoading();
    this.props.navigation.navigate('SearchAttendance');
  }
}

const styles = {
  ...baseStyles,
  containerLogo: {
    height: '30%',
    marginHorizontal: '10%',
  },
  imgLogo: {
    width: '100%',
    height: '100%',
  },
  containerForm: {
    height: '35%',
    marginHorizontal: '12.5%',
  },
  textLabel: {
    fontFamily: 'Roboto-Bold',
    fontSize: 30,
    fontWeight: 'bold' as const,
    fontStyle: 'normal' as const,
    letterSpacing: 0,
    textAlign: 'left' as const,
    color: 'white',
  },
  textInput: {
    marginHorizontal: '3%',
    opacity: 0.6,
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: '300' as const,
    fontStyle: 'normal' as const,
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
