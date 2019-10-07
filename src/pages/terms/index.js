import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

export default class Term extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    // const INJECTED_JAVASCRIPT = `(function() {
    //   window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
    // })();`;

    // const runFirst = `
    //   document.body.style.backgroundColor = 'red';
    //   setTimeout(function() { window.alert('hi') }, 10);
    //   true; // note: this is required, or you'll sometimes get silent failures
    // `;

    const onClick = `
      document.getElementById('btSend').onclick = function() {
        var nome = document.getElementById('name').value;
        
        alert('teste' + nome);

        window.ReactNativeWebView.postMessage(nome)

        var xhr = new XMLHttpRequest();

        xhr.onload = function () {

          // Process our return data
          if (xhr.status >= 200 && xhr.status < 300) {
            // Runs when the request is successful
            alert(xhr.responseText);
          } else {
            // Runs when it's not
            alert(xhr.responseText);
          }
        
        };
        
        var jsonData = {"name": nome, "gender": 'M', "country": 'RJ'};
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
        javaScriptEnabled={true}
        injectedJavaScript={onClick}
        onMessage={async (event) => {
          alert(event.nativeEvent.data);
        }}
      />
    );
  }
}