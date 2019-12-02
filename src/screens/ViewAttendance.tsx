import React, { ReactNode } from 'react';
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { assets, AssinaIcon, AssinaLoading } from '../components/assina-base';
import baseStyles from '../components/assina-styles';
import EmailModal from '../components/EmailModal';
import AssinaHeader from '../components/AssinaHeader';
import Document from '../model/Document';
import Screen, { ScreenProps, ScreenState } from '../components/Screen';

const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type ViewAttendanceState = ScreenState & { emailModal: boolean };

export default class ViewAttendance extends Screen<ViewAttendanceState> {

  private constructor(props: ScreenProps) {
    super(props, { emailModal: false });
  }

  public render(): ReactNode {
    const { emailModal } = this.state;
    const { patient, documents } = this.context.attendance;
    return (
      <ImageBackground source={assets.backgroundImage} style={baseStyles.imageBackground}>
        <NavigationEvents onDidFocus={() => this.didFocus()} />
        <EmailModal key={emailModal.toString()} visible={emailModal} defaultEmail={patient.email}
          close={() => this.closeEmailModal()} send={(email, sendAllSigned) => this.sendEmail(email, sendAllSigned)} />
        <AssinaLoading visible={this.isLoading} />
        <AssinaHeader
          left={<AssinaHeader.Back onPress={this.goBack} />}
          right={[
            <AssinaHeader.Reload onPress={() => this.refresh()} />,
            <AssinaHeader.Separator />,
            <AssinaHeader.Exit onPress={this.goHome} />
          ]} />
        <View style={styles.containerContent}>
          <Text style={styles.textName}>{patient.name}</Text>
          <Text style={styles.textBirthdate}>{patient.birthdateAsString} | {patient.ageAsString}</Text>
          <FlatList data={documents} keyExtractor={document => document.ref} renderItem={({ item: document }) =>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.openDocument(document)}>
              <View style={styles.documentBox}>
                <Text style={styles.documentTitle}>{document.title}</Text>
                {document.signed &&
                  <AssinaIcon.Email onPress={() => this.openEmailModal(document)} />
                }
                {document.signed ?
                  <View style={[styles.statusBox, styles.signedStatusBox]}>
                    <Text style={[styles.statusText, styles.signedStatusText]}>Assinado</Text>
                  </View>
                  :
                  <View style={[styles.statusBox, styles.unsignedStatusBox]}>
                    <Text style={[styles.statusText, styles.unsignedStatusText]}>Pendente</Text>
                  </View>
                }
              </View>
              <Text>{'\n'}</Text>
            </TouchableOpacity>
          } />
        </View>
      </ImageBackground>
    );
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

  private async sendEmail(email: string, sendAllSigned: boolean): Promise<void> {
    email = (email != null ? email.trim() : '');
    if (email.length === 0) return this.warn('Por favor, preencha o e-mail.');
    if (!EMAIL_REGEXP.test(email)) return this.warn('E-mail inválido!');
    this.startLoading();
    this.closeEmailModal();
    try {
      if (sendAllSigned) {
        await this.context.attendance.sendEmail(email);
      } else {
        await this.context.document.sendEmail(email);
      }
    } catch (error) {
      return this.handleError(error, [{ status: 504, message: 'Email enviado com sucesso.' }]);
    }
    this.info('Email enviado com sucesso.');
  }
}

const styles = {
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
  documentBox: {
    ...baseStyles.viewRound,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: '5%',
    height: 100,
    opacity: 0.5,
    backgroundColor: '#70450e',
  },
  documentTitle: {
    ...baseStyles.text,
    width: '70%',
    fontSize: 22,
  },
  statusBox: {
    ...baseStyles.viewRound,
    height: '50%',
    width: '20%',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  signedStatusBox: {
    backgroundColor: '#42fce9',
  },
  unsignedStatusBox: {
    backgroundColor: '#fca791',
  },
  statusText: {
    ...baseStyles.textBold,
    letterSpacing: 1,
  },
  signedStatusText: {
    color: '#03664e'
  },
  unsignedStatusText: {
    color: '#a72b0a'
  },
}
