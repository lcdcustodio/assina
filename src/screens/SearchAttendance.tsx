import React from 'react';
import { ImageBackground, Text, TextInput, TextStyle, TouchableOpacity, View } from 'react-native';
import { Icon } from 'native-base';

import Screen, { ScreenProps, ScreenState, styles as baseStyles } from '../components/Screen';
import { AssinaButton, AssinaIcon, AssinaLoading, AssinaSeparator } from '../components/assina-base';
import BarcodeModal from '../components/BarcodeModal';
import { backgroundImage } from '../components/assets';
import Attendance from '../model/Attendance';

type SearchAttendanceState = ScreenState & {
  attendanceModal: boolean,
  attendanceRef: string,
};
export default class SearchAttendance extends Screen<SearchAttendanceState> {

  constructor(props: ScreenProps) {
    super(props, {
      attendanceModal: false,
      attendanceRef: '3051240',
    });
  }

  public render(): JSX.Element {
    const { attendanceModal, attendanceRef } = this.state;
    return (
      <View style={styles.container}>
        <BarcodeModal getVisibility={() => attendanceModal}
          setVisibility={(attendanceModal) => this.setState({ attendanceModal })}
          onRead={(attendanceRef) => this.setState({ attendanceRef })} />
        <AssinaLoading visible={this.isLoading} />
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <View style={styles.header}>
            <View style={styles.headerLeft} />
            <View style={styles.headerRight} >
              <TouchableOpacity style={styles.headerRight} onPress={this.goHome}>
                <Text style={styles.headerIconText}>Sair</Text>
                <Icon type='MaterialIcons' name='exit-to-app' style={styles.headerIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containerForm}>
            <Text style={styles.title}>Pesquise o N° de Atendimento</Text>
            <Text style={styles.text}>Para ter acesso aos termos do paciente,{'\n'}
              pesquise pelo número de atendimento.</Text>
            <AssinaSeparator vertical='10%' />
            <View style={styles.attendanceBox}>
              <TextInput value={attendanceRef} placeholder='Pesquisar'
                placeholderTextColor='#707070' style={styles.attendanceInput}
                autoCorrect={false} onChange={(event) => this.handleTextChange('attendanceRef', event)} />
              <AssinaIcon.Barcode iconStyle={styles.attendanceIcon}
                onPress={() => this.setState({ attendanceModal: true })} />
            </View>
            <View style={styles.containerButton}>
              <AssinaButton text='Pesquisar' style={styles.button} onPress={() => this.search()} />
            </View>
          </View>
        </ImageBackground>
      </View >);
  }

  private async search(): Promise<void> {
    const attendanceRef = this.state.attendanceRef.trim();
    if (attendanceRef.length === 0) {
      return this.warn('Por favor, preencha o número de atendimento.');
    }
    this.startLoading();
    let attendance: Attendance;
    try {
      attendance = await this.context.unit.findAttendance(attendanceRef);
    } catch (error) {
      return this.handleError(error, [
        { status: 400, message: 'Atendimento inválido.' },
        { status: 404, message: 'Atendimento não encontrado.' }
      ]);
    }
    if (attendance.isEmpty) {
      return this.warn('Não há termos para este atendimento.');
    }
    this.context.attendance = attendance;
    this.context.callerStopLoading = this.stopLoading;
    this.props.navigation.navigate('ViewAttendance');
  }
}

const styles = {
  ...baseStyles,
  containerForm: {
    alignItems: 'center' as const,
    marginTop: '10%',
    marginHorizontal: '7.5%',
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 40,
    fontWeight: 'bold' as const,
    fontStyle: 'normal' as const,
    letterSpacing: 0,
    textAlign: 'left' as const,
    color: 'white'
  },
  text: {
    marginTop: '5%',
    fontFamily: 'Roboto-Light',
    fontSize: 22,
    fontWeight: '300' as const,
    fontStyle: 'normal' as const,
    letterSpacing: 0.01,
    textAlign: 'center' as const,
    color: 'white'
  },
  attendanceBox: {
    width: '100%',
    height: '13%',
    paddingHorizontal: '5%',
    borderRadius: 10,
    backgroundColor: '#efefef',
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  attendanceInput: {
    flex: 1,
    color: '#707070',
    fontSize: 22,
    fontWeight: "bold",
  } as TextStyle,
  attendanceIcon: {
    color: '#707070',
    fontSize: 60,
  },
  containerButton: {
    marginTop: '10%',
    width: '100%',
  },
  button: {
    height: '33%',
  },
};
