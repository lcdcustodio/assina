import React, { ReactNode } from 'react';
import { ImageBackground, NativeSyntheticEvent, Text, View, ViewStyle } from 'react-native';
import { WebView } from 'react-native-webview';

import Screen, { ScreenProps, styles as baseStyles } from '../components/Screen';
import { assets, AssinaLoading, AssinaButton } from '../components/assina-base';
import AssinaHeader from '../components/AssinaHeader';
import { WebViewMessage } from 'react-native-webview/lib/WebViewTypes';

export default class SignDocument extends Screen {

  private webView: WebView;

  private constructor(props: ScreenProps) {
    super(props, {});
    this.webView = null;
  }

  public render(): ReactNode {
    const { name, birthdate, birthdateAsString, ageAsString } = this.context.attendance.patient;
    const headerText = birthdate ? `${name} | ${birthdateAsString} | ${ageAsString}` : name;
    return (
      <View style={styles.container}>
        <AssinaLoading visible={this.isLoading} />
        <ImageBackground source={assets.backgroundImage} style={styles.backgroundImage}>
          <AssinaHeader
            left={<AssinaHeader.Back onPress={this.goBack} />}
            right={<AssinaHeader.Exit onPress={this.goHome} />}>
            <Text style={styles.headerText}>{headerText}</Text>
          </AssinaHeader>
          <WebView source={{ html: this.context.document.unsignedHtml }}
            ref={ref => (this.webView = ref)}
            onLoadEnd={this.context.callerStopLoading}
            onMessage={event => this.uploadDocument(event)}
          />
          <View style={styles.footer}>
            <AssinaButton text='Salvar' style={styles.button} onPress={() => this.save()} />
          </View>
        </ImageBackground >
      </View >
    );
  }

  private save(): void {
    this.startLoading();
    this.webView.injectJavaScript('save()');
  }

  private async uploadDocument(event: NativeSyntheticEvent<WebViewMessage>) {
    const { data } = event.nativeEvent;
    if (!data || !data.length) { // mensagem vazia para cancelar o upload
      return this.stopLoading();
    }
    try {
      await this.context.document.uploadSignedHtml(data);
    } catch (error) {
      return this.handleError(error);
    }
    this.context.attendance.isDirty = true;
    this.goBack();
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
  } as ViewStyle,
  button: {
    alignItems: 'center',
    height: '65%',
    width: '90%',
  } as ViewStyle,
}
