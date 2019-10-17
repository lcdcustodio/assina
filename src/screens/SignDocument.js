import React from 'react';
import { Icon } from 'native-base';
import { View, Text, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import moment from 'moment';

import appJson from '../../app.json';
import AbstractScreen, { Loading, styles as baseStyles } from './AbstractScreen';
import api from '../services/api';
import { backgroundImage } from '../components/assets';

export default class SignDocument extends AbstractScreen {

  constructor(props) {
    super(props, {
      patient: null,
      unsignedHtml: null,
    });
  }

  didFocus = this.props.navigation.addListener('didFocus', async (res) => {
    const { navigation } = this.props;
    this.setState({ patient: navigation.getParam('patient') });
    await this.loadUnsignedHtml(navigation.getParam('documentRef'));
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
    const htmlTags =  html.match(/<html(\s+.+)?>/i);
    if (htmlTags) {
      return html.replace(htmlTags[0], `${htmlTags[0]}<head>${baseTag}</head>`);
    }
    return `<html><head>${baseTag}</head>${html}</html>`;
  }

  async createPDF(data) {
    console.log(data)
    let options = {
      html: data,
      fileName: 'test',
      directory: 'Documents',
    };
    let file = await RNHTMLtoPDF.convert(options)
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
          {this.state.unsignedHtml &&
            <WebView source={{ html: this.state.unsignedHtml }}
              ref={ref => (this.webview = ref)}
              onLoadStart={this.onLoadStart}
              injectedJavaScript={salvar_js}
              onMessage={async (event) => {
                this.createPDF(event.nativeEvent.data);
              }}
            />
          }
          <View style={styles.header}>
            <Text style={styles.headerText}>{headerText}</Text>
          </View>
        </ImageBackground >
      </View >
    );
  }
}

const styles = {
  ...baseStyles,
}

const salvar_js = `
document.getElementById('btSend').onclick = function() {

  //HumanBody
  var imageHumanBody = new Image();
  var canvasHumanBody = document.getElementById('canvasHumanBody');
  imageHumanBody.src = canvasHumanBody.toDataURL("image/png");
  canvasHumanBody.style.display = 'none';
  document.body.appendChild(imageHumanBody); 

  //Signature
  var imageSignature = new Image();
  var canvasSignature = document.getElementById('canvasSignature');
  imageSignature.src = canvasSignature.toDataURL("image/png");
  canvasSignature.style.display = 'none';
  document.body.appendChild(imageSignature); 

  var name = document.getElementById('name');
  name.setAttribute('value', 'deu certo?');
  //document.getElementById('name').value='NO NO';

  //Get HTML
  body = document.body;
  
  console.log(body);
  
  //Send to React
  window.ReactNativeWebView.postMessage(body.innerHTML)

  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      // Runs when the request is successful
      console.log(xhr.responseText);
    } else {
      // Runs when it's not
      console.log(xhr.responseText);
    }
  };
  
  var jsonData = {"name": 'Nome Mockado (hardcode)', "gender": 'M', "country": 'RJ'};
  var formattedJsonData = JSON.stringify(jsonData);

  xhr.open('POST', 'http://10.15.48.67:3000/save');
  xhr.send(formattedJsonData);
};
true;
`;
