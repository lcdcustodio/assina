import React from 'react';
import { Alert, NativeSyntheticEvent, StyleSheet, TextInputChangeEventData } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { ApiError } from '../services/api';
import Context from './Context'

export type ScreenProps = {
  navigation: NavigationStackProp<any>;
};
export type ScreenState = {
  loading: boolean;
};
export type HttpErrorMessage = {
  status?: number;
  message: string;
  type?: 'warn' | 'fail';
};
const DEFAULT_HTTP_ERRORS: HttpErrorMessage[] = [
  { status: 401, message: 'Erro de autorização. Sua sessão pode ter expirado.' },
  { status: 403, message: 'Erro de autorização. Sua sessão pode ter expirado.' },
  { status: 500, message: 'Erro no servidor. Favor tentar novamente mais tarde.', type: 'fail' },
  { status: null, message: 'Problemas de conexão. Favor tentar novamente mais tarde.', type: 'fail' },
];
export default abstract class Screen<S extends ScreenState = ScreenState, P extends ScreenProps = ScreenProps>
  extends React.Component<P, S> {

  public static contextType = Context;

  public context!: React.ContextType<typeof Context>;

  protected constructor(props: P, subState: Pick<S, Exclude<keyof S, keyof ScreenState>>) {
    super(props);
    this.state = { loading: false, ...subState } as S; // cast 'desonesto'.
  }

  protected get isLoading(): boolean { return this.state.loading }

  protected startLoading = (): void => { if (!this.state.loading) this.setState({ loading: true }) }

  protected stopLoading = (): void => { if (this.state.loading) this.setState({ loading: false }) }

  protected goHome = (): void => { this.props.navigation.popToTop() }

  protected goBack = (): void => { this.props.navigation.pop() }

  protected handleTextChange = (key: keyof SubType<S, string>, event: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    this.setState({ [key]: event.nativeEvent.text } as unknown); // cast 'super desonesto'
  }

  protected handleError = (error: any, httpMessages?: HttpErrorMessage[]): void => {
    if (error instanceof ApiError) {
      this.handleApiError(error, httpMessages);
    } else {
      this.fail('Erro de sistema. Contacte o suporte.', error);
    }
  }

  protected info = (message: string): void => this.alert('Assina', message)

  protected warn = (message: string): void => this.alert('Assina', message)

  protected fail = (message: string, error?: Error): void => {
    this.alert('Erro', message);
    if (error) {
      console.log('ASSINA [FAIL]', error.toString());
    }
  }

  private alert(title: string, message?: string, buttons?: any, options?: any): void {
    this.stopLoading();
    setTimeout(() => Alert.alert(title, message, buttons, options), 100);
  }

  private handleApiError(apiError: ApiError, httpMessages: HttpErrorMessage[]): void {
    const messages = httpMessages ? httpMessages.concat(DEFAULT_HTTP_ERRORS) : DEFAULT_HTTP_ERRORS;
    for (let message of messages) {
      if (message.status == apiError.httpStatus) {
        switch (message.type) {
          case 'warn': case undefined: case null:
            return this.warn(message.message);
          case 'fail':
            return this.fail(message.message, apiError);
        }
      }
    }
    this.fail(`Erro inesperado no servidor (${apiError.httpStatus}).`);
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#ffffff',
  },
  headerIcon: {
    marginRight: '5%',
    marginLeft: '1%',
    fontSize: 40,
    color: 'white',
  },
  headerIconText: {
    fontFamily: 'Roboto-Light',
    fontSize: 24,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 0.01,
    textAlign: 'center',
    color: '#ffffff',
  },
})

/**
 * @see https://medium.com/dailyjs/typescript-create-a-condition-based-subset-types-9d902cea5b8c
 */
type FilterFlags<Base, Condition> = { [Key in keyof Base]: Base[Key] extends Condition ? Key : never };
type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];
type SubType<Base, Condition> = Pick<Base, AllowedNames<Base, Condition>>;
