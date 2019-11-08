import React from 'react';
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Modal from '../components/ModalEmail';
import { AssinaHeaderButton, AssinaLoading, styles as baseStyles } from '../components/assina-base';
import { backgroundImage } from '../components/assets';
import Document from '../model/Document';

import Screen, {
  ScreenProps,
  ScreenState,
  styles as screenStyles // <--- TODO REMOVER (utilizar do assina-base)
} from '../components/Screen';

type State = ScreenState & {
  modalSendEmail: boolean;
}
export default class ViewAttendance extends Screen<State> {

  constructor(props: ScreenProps) {
    super(props, {
      modalSendEmail: false
    });
  }

  didFocus = async () => {
    this.context.callerStopLoading();
    if (this.context.attendance.isDirty) {
      await this.refresh();
    }
  }

  refresh = async () => {
    this.startLoading();
    const { unit, attendance } = this.context;
    try {
      this.context.attendance = await unit.findAttendance(attendance.ref);
    } catch (error) {
      return this.handleError(error);
    }
    this.stopLoading();
  }

  openDocument = async (document: Document) => {
    this.startLoading();
    try {
      await document.downloadUnsignedHtml();
    } catch (error) {
      return this.handleError(error, [
        { status: 404, message: 'Modelo de documento não cadastrado.' },
      ]);
    }
    this.context.document = document;
    this.context.callerStopLoading = this.stopLoading;
    this.props.navigation.navigate('SignDocument');
  }

  showPopUpSendEmail = (document: Document) => {
    this.context.document = document;
    this.setState({ modalSendEmail: true })
  }

  close = () =>{
    this.setState({ modalSendEmail: false })
  }

  send = (email: string) => {
    if(email.length === 0) return this.warn('Por favor, preencha o e-mail');
    if(this.validateEmail(email)){
      this.context.document.sendEmail(email);
      this.close();
    } else { 
      return this.warn('E-mail inválido!');
    }
  }

  validateEmail = (email: string ) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  render() {
    const { patient, documents } = this.context.attendance;
    return <View style={styles.container}>
      <NavigationEvents onDidFocus={this.didFocus} />
      <Modal visible={this.state.modalSendEmail} email={patient.email} close={this.close} send={this.send}/>
      <AssinaLoading visible={this.isLoading} />
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.header}>
          <AssinaHeaderButton.Back viewStyle={styles.headerLeft} onPress={this.goBack} />
          <View style={styles.headerRight}>
            <AssinaHeaderButton.Reload viewStyle={[{ marginRight: '10%' }, styles.headerRight]} onPress={this.refresh} />
            <AssinaHeaderButton.Exit viewStyle={styles.headerRight} onPress={this.goHome} />
          </View>
        </View>
        <View style={styles.containerContent}>
          <Text style={styles.textName}>{patient.name}</Text>
          <Text style={styles.textBirthdate}>{patient.birthdateAsString} | {patient.ageAsString}</Text>
          <FlatList data={documents} keyExtractor={document => document.ref} renderItem={({ item: document }) =>
            <TouchableOpacity activeOpacity={0.5}
              onPress={document.signed ? null : () => this.openDocument(document)}>
              <View style={styles.containerTerm}>
                <Text style={styles.textNameTerm}>{document.title}</Text>

                <View style={[styles.containerStatus, document.signed ? styles.backgroundGreen : styles.backgroundRed]}>
                  <Text style={[styles.textStatus, document.signed ? styles.colorGreen : styles.colorRed]}>
                    {document.signed ? 'Assinado' : 'Pendente'}
                  </Text>
                </View>
                {
                  document.signed ?
                    <TouchableOpacity activeOpacity={0.5} >
                      <AssinaHeaderButton.Email viewStyle={[{ marginLeft: '7%' }]} onPress={() => this.showPopUpSendEmail(document)} />
                    </TouchableOpacity>
                    : <Text></Text>
                }
              </View>
              <Text>{'\n'}</Text>
            </TouchableOpacity>
          } />
        </View>
      </ImageBackground>
    </View>
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
    marginBottom: '6%',
    fontSize: 24,
  },
  containerTerm: {
    ...baseStyles.viewRound,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: '3%',
    height: 100,
    opacity: 0.5,
    backgroundColor: '#70450e',
  },
  textNameTerm: {
    ...baseStyles.text,
    width: '70%',
    fontSize: 24,
    letterSpacing: 1,
  },
  containerStatus: {
    ...baseStyles.viewRound,
    height: '50%',
    width: '20%',
    marginLeft: '5%',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  backgroundGreen: {
    backgroundColor: '#42fce9',
  },
  backgroundRed: {
    backgroundColor: '#fca791',
  },
  textStatus: {
    ...baseStyles.textBold,
    letterSpacing: 1,
  },
  colorGreen: {
    color: '#03664e'
  },
  colorRed: {
    color: '#a72b0a'
  },
}
