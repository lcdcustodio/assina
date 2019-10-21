import React from 'react';
import { Icon } from 'native-base';
import { View, Text, ImageBackground, TouchableHighlight, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import moment from 'moment';

import appJson from '../../app.json';
import AbstractScreen, { Loading, styles as baseStyles } from './AbstractScreen';
import { backgroundImage } from '../components/assets';
import api from '../services/api';

export default class SignDocument extends AbstractScreen {

  constructor(props) {
    super(props, {
      patient: null,
      documentRef: null,
      unsignedHtml: null,
    });
  }

  didFocus = this.props.navigation.addListener('didFocus', async (res) => {
    const { navigation } = this.props;
    const patient = navigation.getParam('patient');
    const documentRef = navigation.getParam('documentRef');
    this.setState({ patient, documentRef });
    await this.loadUnsignedHtml(documentRef);
    navigation.getParam('stopLoading')();
  });

  loadUnsignedHtml = async (documentRef) => {
    this.isLoading = true;
    let unsignedHtml;
    try {
      unsignedHtml = await api.getUnsignedDocument(documentRef);
    } catch (apiError) {
      this.goBack();
      return this.handleApiError(apiError);
    }
    unsignedHtml = this.setHtmlBase(unsignedHtml);
    this.isLoading = false;
    this.setState({ unsignedHtml });
  }

  setHtmlBase = (html) => {
    const baseTag = `<base href="${appJson.apiBaseUrl}/"/>`;
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

  createPdf = async (html) => {
    const { documentRef } = this.state;
    const pdf = await RNHTMLtoPDF.convert({ html: html, fileName: 'signed', base64: true });
    console.log('antes createPdf')
    await api.putSignedDocument(documentRef, pdf.base64.split('\n').join(''), documentRef + '.pdf');
    console.log('depois createPdf')
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
        <Loading visible={this.isLoading} />
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
            onMessage={event => (this.createPdf(event.nativeEvent.data))}
          />
          <View style={styles.footer}>
            <TouchableHighlight
              style={[styles.footerCenter, styles.button]}
              underlayColor={styles.button.backgroundColor}
              onPress={event => (webView.injectJavaScript('save()'))}
            >
              <Text style={styles.textButton}>SALVAR</Text>
            </TouchableHighlight>
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
  footerCenter: {
    height: 50,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#957657',
  },
  textButton: {
    fontSize: 22,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#FFFFFF'
  },
}
