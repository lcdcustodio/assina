import React from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import Spinner from 'react-native-loading-spinner-overlay';

import { ApiError } from '../services/api';

export type ScreenState = { loading: boolean };
export type ScreenProps = { navigation: NavigationStackProp<any> };

export default abstract class AbstractScreen<
  S extends ScreenState = ScreenState,
  P extends ScreenProps = ScreenProps
  > extends React.Component<P> {

  state: S;

  constructor(props: P, state: S) {
    super(props);
    this.state = {
      ...state,
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
    super.props.navigation.pop();
  }

  goHome = () => {
    super.props.navigation.popToTop();
  }

  /**
   * TODO: Melhorar tipagem do estado e tipar evento.
   */
  handleChange = (attributeName: string, event: any) => {
    super.setState({ [attributeName]: event.nativeEvent.text });
  }

  handleApiError = (apiError: ApiError) => {
    if (this.isLoading) {
      this.isLoading = false;
    }
    switch (apiError.httpStatus) {
      case 401: case 403:
        alert("Falha na comunicação com o servidor, dados não reconhecidos.");
        break;
      default:
        alert("Falha na comunicação com o servidor.");
        console.log(apiError.toString());
    }
  }
}

export type LoadingProps = { visible: boolean; };

export const Loading = (props: LoadingProps) =>
  <Spinner visible={props.visible} textContent='Aguarde...' textStyle={{ color: '#ffffff' }} />
