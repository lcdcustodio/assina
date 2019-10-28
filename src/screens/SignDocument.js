import React from 'react';
import { Icon } from 'native-base';
import { View, Text, ImageBackground, TouchableHighlight, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import moment from 'moment';

import AbstractScreen, { styles as baseStyles } from './AbstractScreen';
import { AssinaLoading, AssinaButton } from '../components/assina-base';
import { app_json, backgroundImage } from '../components/assets';
import api from '../services/api';

const defaultRnHtmlToPdf = {
  fileName: 'signed',
  base64: true,
  padding: 0, // iOS
  bgColor: '#FFFFFF', // iOS
};

export default class SignDocument extends AbstractScreen {

  constructor(props) {
    super(props, { patient: null, documentRef: null, callerStopLoading: null, unsignedHtml: null });
  }

  didFocus = this.props.navigation.addListener('didFocus', async (res) => {
    const { patient, documentRef, callerStopLoading } = this.props.navigation.state.params;
    this.setState({ patient, documentRef, callerStopLoading });
    await this.loadUnsignedHtml(documentRef);
  });

  loadUnsignedHtml = async (documentRef) => {
    let unsignedHtml;
    try {
      unsignedHtml = await api.getUnsignedDocument(documentRef);
    } catch (apiError) {
      this.state.callerStopLoading();
      this.goBack();
      return this.handleApiError(apiError);
    }
    unsignedHtml = this.setHtmlBase(unsignedHtml);
    this.setState({ unsignedHtml });
  }

  setHtmlBase = (html) => {
    const baseTag = `<base href="${app_json.apiBaseUrl}/"/>`;
    const headTags = html.match(/<head(\s+.+)?>/i);
    if (headTags) {
      return html.replace(headTags[0], headTags[0] + baseTag);
    }
    const htmlTags = html.match(/<html(\s+.+)?>/i);
    if (htmlTags) {
      return html.replace(htmlTags[0], `${htmlTags[0]}<head>${baseTag}</head>`);
    }
    return `<html><head>${baseTag}</head>${html}</html>`;
  }

  callerStopLoading = () => {
    const { callerStopLoading } = this.state;
    if (typeof callerStopLoading == 'function') {
      callerStopLoading();
    }
  }

  save = (webView) => {
    this.startLoading();
    webView.injectJavaScript('save()');
  }

  uploadDocument = async (event) => {
    const { data } = event.nativeEvent;
    const { documentRef } = this.state;
    if (data && data.length) {
      const pdf = await RNHTMLtoPDF.convert({ ...defaultRnHtmlToPdf, html: data });
      await api.putSignedDocument(documentRef, pdf.base64.split('\n').join(''), documentRef + '.pdf');
      this.goBack();
    }
    this.stopLoading();
  }

  render() {
    let headerText = '';
    const { patient } = this.state;
    if (patient) {
      const { name, birthdate } = patient;
      if (birthdate) {
        const birthday = moment(birthdate).format('DD/MM/YYYY');
        const age = moment().diff(birthdate, 'years') + ' anos';
        headerText = `${name} | ${birthday} | ${age}`;
      } else {
        headerText = name;
      }
    }
    let webView;
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
          <WebView source={{ html: this.state.unsignedHtml }}
            ref={ref => (webView = ref)}
            onLoadEnd={this.callerStopLoading}
            onMessage={this.uploadDocument}
          />
          <View style={styles.footer}>
            <AssinaButton text='Salvar' style={styles.button} onPress={() => this.save(webView)} />
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
