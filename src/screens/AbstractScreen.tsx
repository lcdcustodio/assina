import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import Spinner from 'react-native-loading-spinner-overlay';

import { ApiError } from '../services/api';

export type State = { loading: boolean };
export type Props = { navigation: NavigationStackProp<any> };

export default abstract class AbstractScreen<S extends State = State, P extends Props = Props>
  extends React.Component<P> {

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
    this.setState({ loading: value });
  }

  goBack = () => {
    this.props.navigation.pop();
  }

  goHome = () => {
    this.props.navigation.popToTop();
  }

  /**
   * TODO: Melhorar tipagem do estado e tipar evento.
   */
  handleChange = (attributeName: string, event: any) => {
    this.setState({ [attributeName]: event.nativeEvent.text });
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

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  header: {
    height: 85,
    marginHorizontal: '3%',
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: "Roboto-Bold",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff",
  },
  headerIcon: {
    marginRight: '5%',
    marginLeft: '1%',
    fontSize: 40,
    color: 'white',
  },
  headerIconText: {
    fontFamily: "Roboto-Light",
    fontSize: 24,
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0.01,
    textAlign: "center",
    color: "#ffffff",
  },
})
