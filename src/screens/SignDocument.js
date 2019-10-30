import React from 'react';
import { Icon } from 'native-base';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

import AbstractScreen, { styles as baseStyles } from './AbstractScreen';
import { AssinaLoading, AssinaButton } from '../components/assina-base';
import { backgroundImage } from '../components/assets';
import Context from '../services/Context';

export default class SignDocument extends AbstractScreen {

  constructor(props) {
    super(props, { callerStopLoading: null });
    this.context = null;
    this.webView = null;
    this.isLoaded = false;
  }

  didFocus = this.props.navigation.addListener('didFocus', () => {
    const { callerStopLoading } = this.props.navigation.state.params;
    if (this.isLoaded) { // carregou antes do foco
      callerStopLoading();
    } else { // para o loading quando carregar
      this.setState({ callerStopLoading });
    }
  });

  webViewLoaded = () => {
    this.isLoaded = true;
    const { callerStopLoading } = this.state;
    if (typeof callerStopLoading == 'function') {
      callerStopLoading();
    }
  }

  save = () => {
    this.startLoading();
    this.webView.injectJavaScript('save()');
  }

  uploadDocument = async (event) => {
    const { data } = event.nativeEvent;
    if (!data || !data.length) { // mensagem vazia para cancelar o upload
      return this.stopLoading();
    }
    try {
      await this.context.document.uploadSignedHtml(data);
    } catch (apiError) {
      return this.handleApiError(apiError);
    }
    this.context.attendance.isDirty = true;
    this.goBack();
  }

  render() {
    return <Context.Consumer>{context => {
      this.context = context;
      return this.renderConsumer();
    }}</Context.Consumer>
  }

  renderConsumer() {
    const { name, birthdate, birthdateAsString, ageAsString } = this.context.attendance.patient;
    const headerText = birthdate ? `${name} | ${birthdateAsString} | ${ageAsString}` : name;
    return (
      <View style={styles.container}>
        <AssinaLoading visible={this.isLoading} />
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={this.goBack}>
                <Icon type='MaterialCommunityIcons' name='arrow-left' style={styles.headerIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerCenter}>
              <Text style={styles.headerText}>{headerText}</Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.headerRight} onPress={this.goHome}>
                <Text style={styles.headerIconText}>Sair</Text>
                <Icon type='MaterialIcons' name='exit-to-app' style={styles.headerIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <WebView source={{ html: this.context.document.unsignedHtml }}
            ref={ref => (this.webView = ref)}
            onLoadEnd={this.webViewLoaded}
            onMessage={this.uploadDocument}
          />
          <View style={styles.footer}>
            <AssinaButton text='Salvar' style={styles.button} onPress={this.save} />
          </View>
        </ImageBackground >
      </View >
    );
  }
}

const styles = {
  ...baseStyles,
  footer: {
    height: 85,
    marginHorizontal: '3%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    height: '65%',
    width: '90%',
  },
}
