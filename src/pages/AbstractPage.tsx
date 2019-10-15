import React, { Component } from 'react';
import { ApiException } from '../services/api';
import Spinner from 'react-native-loading-spinner-overlay';

export default abstract class AbstractPage extends Component<any> {

  state: any;

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  get isLoading(): boolean {
    return this.state.loading;
  }

  set isLoading(value: boolean) {
    super.setState({ loading: value });
  }

  goBack = () => {
    this.props.navigation.pop();
  }

  goHome = () => {
    this.props.navigation.popToTop();
  }

  handleChange = (attributeName: string, event: any) => {
    this.setState({ [attributeName]: event.nativeEvent.text });
  }

  handleApiException = (apiException: ApiException) => {
    if (this.isLoading) {
      this.isLoading = false;
    }
    switch (apiException.httpStatus) {
      case 401: case 403:
        alert("Falha na comunicação com o servidor, dados não reconhecidos.");
        break;
      default:
        alert("Falha na comunicação com o servidor.");
        console.log(apiException.toString());
    }
  }
}

export const Loading = (props: any) =>
  <Spinner visible={props.visible} textContent='Aguarde...' textStyle={{ color: '#ffffff' }} />
