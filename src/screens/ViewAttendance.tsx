import React from 'react';
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { AssinaHeaderButton, AssinaLoading, styles as baseStyles, AssinaIcon } from '../components/assina-base';
import { backgroundImage } from '../components/assets';
import EmailModal from '../components/EmailModal';
import Document from '../model/Document';
import Screen, {
  ScreenProps, ScreenState,
  styles as screenStyles // <--- TODO REMOVER (utilizar do assina-base)
} from '../components/Screen';

const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type ViewAttendanceState = ScreenState & { emailModal: boolean };

export default class ViewAttendance extends Screen<ViewAttendanceState> {

  private constructor(props: ScreenProps) {
    super(props, { emailModal: false });
  }

  public render(): JSX.Element {
    const { emailModal } = this.state;
    const { patient, documents } = this.context.attendance;
    return <View style={styles.container}>
      <NavigationEvents onDidFocus={() => this.didFocus()} />
      <EmailModal key={emailModal.toString()} visible={emailModal} defaultEmail={patient.email}
        close={() => this.closeEmailModal()} send={(email) => this.sendEmail(email)} />
      <AssinaLoading visible={this.isLoading} />
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.header}>
          <AssinaHeaderButton.Back viewStyle={styles.headerLeft} onPress={this.goBack} />
          <View style={styles.headerRight}>
            <AssinaHeaderButton.Reload viewStyle={[{ marginRight: '10%' }, styles.headerRight]} onPress={() => this.refresh()} />
            <AssinaHeaderButton.Exit viewStyle={styles.headerRight} onPress={this.goHome} />
          </View>
        </View>
        <View style={styles.containerContent}>
          <Text style={styles.textName}>{patient.name}</Text>
          <Text style={styles.textBirthdate}>{patient.birthdateAsString} | {patient.ageAsString}</Text>
          <FlatList data={documents} keyExtractor={document => document.ref} renderItem={({ item: document }) =>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.openDocument(document)}>
              <View style={styles.containerTerm}>
                <Text style={styles.textNameTerm}>{document.title}</Text>
                {document.signed &&
                  <AssinaIcon.Email onPress={() => this.openEmailModal(document)} />
                }
                {document.signed ?
                  <View style={[styles.containerStatus, styles.backgroundGreen]}>
                    <Text style={[styles.textStatus, styles.colorGreen]}>Assinado</Text>
                  </View>
                  :
                  <View style={[styles.containerStatus, styles.backgroundRed]}>
                    <Text style={[styles.textStatus, styles.colorRed]}>Pendente</Text>
                  </View>
                }
              </View>
              <Text>{'\n'}</Text>
            </TouchableOpacity>
          } />
        </View>
      </ImageBackground>
    </View>
  }

  private didFocus(): void {
    this.context.callerStopLoading();
    if (this.context.attendance.isDirty) this.refresh();
  }

  private openEmailModal(document: Document): void {
    this.context.document = document;
    this.setState({ emailModal: true })
  }

  private closeEmailModal(): void {
    this.setState({ emailModal: false })
  }

  private async refresh(): Promise<void> {
    this.startLoading();
    const { unit, attendance } = this.context;
    try {
      this.context.attendance = await unit.findAttendance(attendance.ref);
    } catch (error) {
      return this.handleError(error);
    }
    this.stopLoading();
  }

  private async openDocument(document: Document): Promise<void> {
    if (document.signed) return;
    this.startLoading();
    try {
      await document.downloadUnsignedHtml();
    } catch (error) {
      return this.handleError(error, [{ status: 404, message: 'Modelo de documento não cadastrado.' }]);
    }
    this.context.document = document;
    this.context.callerStopLoading = this.stopLoading;
    this.props.navigation.navigate('SignDocument');
  }

  private async sendEmail(email: string): Promise<void> {
    email = (email != null ? email.trim() : '');
    if (email.length === 0) return this.warn('Por favor, preencha o e-mail');
    if (!EMAIL_REGEXP.test(email)) return this.warn('E-mail inválido!');
    this.startLoading();
    this.closeEmailModal();
    try {
      await this.context.document.sendEmail(email);
    } catch (error) {
      return this.handleError(error);
    }
    this.stopLoading();
    this.info('Email enviado com sucesso');
  }
}

const styles = {
  ...screenStyles,
  containerContent: {
    width: '90%',
    height: '90%',
    marginTop: '5%',
    marginLeft: '5%',
  },
  textName: {
    ...baseStyles.textBold,
    fontSize: 30,
  },
  textBirthdate: {
    ...baseStyles.text,
    marginTop: '1%',
    marginBottom: '5%',
    fontSize: 22,
  },
  containerTerm: {
    ...baseStyles.viewRound,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: '5%',
    height: 100,
    opacity: 0.5,
    backgroundColor: '#70450e',
  },
  textNameTerm: {
    ...baseStyles.text,
    width: '70%',
    fontSize: 22,
  },
  containerStatus: {
    ...baseStyles.viewRound,
    height: '50%',
    width: '20%',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  textStatus: {
    ...baseStyles.textBold,
    letterSpacing: 1,
  },
  backgroundGreen: {
    backgroundColor: '#42fce9',
  },
  backgroundRed: {
    backgroundColor: '#fca791',
  },
  colorGreen: {
    color: '#03664e'
  },
  colorRed: {
    color: '#a72b0a'
  },
}
