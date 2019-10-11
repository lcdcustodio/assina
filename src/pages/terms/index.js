import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { getTermHTML } from '../../services/getTermHTML';

export default class Term extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bodyHTML: '<h1>Hello world</h1>',
      termNumber: '147952',
      loading: false,
      textContent: 'Aguarde...'
    }
  }

  didFocus = this.props.navigation.addListener('didFocus', async (res) => {
    this.setState({ loading: true });
    await getTermHTML(this.state.termNumber, this.props.navigation, this.hideLoading);
  });

  hideLoading = (html) => {
    this.setState({ 
      bodyHTML: html,
      loading: false 
    });
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
    const onClick = `
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

    handleMSG = (event) => {
      alert(event.nativeEvent.data);
    }

    return (
      <WebView source={{uri: 'http://10.15.48.67:8080'}}
      //<WebView source={{html: this.state.bodyHTML}}
        javaScriptEnabled={true}
        injectedJavaScript={onClick}
        onMessage={async (event) => {
          this.createPDF(event.nativeEvent.data);
        }}
      />
    );
  }
}