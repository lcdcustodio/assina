import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { ApiError } from '../services/api';

export type State = { loading: boolean };
export type Props = { navigation: NavigationStackProp<any> };

export default abstract class AbstractScreen<S extends State = State, P extends Props = Props>
  extends React.Component<P> {

  state: S;

  constructor(props: P, state?: S) {
    super(props);
    this.state = {
      ...state,
      loading: false,
    }
  }

  get isLoading(): boolean {
    return this.state.loading;
  }

  startLoading = () => {
    if (!this.state.loading) {
      this.setState({ loading: true });
    }
  }

  stopLoading = () => {
    if (this.state.loading) {
      this.setState({ loading: false });
    }
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
    switch (apiError.httpStatus) {
      case 401: case 403:
        this.warn("Falha na comunicação com o servidor, dados não reconhecidos.");
        break;
      default:
        this.fail("Falha na comunicação com o servidor.", apiError);
    }
  }

  warn = (message: string) => {
    this.stopLoading();
    setTimeout(() => Alert.alert('Assina', message), 100);
  }

  fail = (message: string, error?: Error) => {
    this.stopLoading();
    setTimeout(() => Alert.alert('Erro', message), 100);
    console.log(error.toString());
  }
}

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
