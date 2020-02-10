import React, { ReactNode } from 'react';
import { ImageBackground, Text, TextInput, TextStyle, View } from 'react-native';

import { assets, AssinaButton, AssinaIcon, AssinaLoading, AssinaSeparator } from '../components/assina-base';
import baseStyles from '../components/assina-styles';
import Screen, { ScreenProps, ScreenState } from '../components/Screen';
import BarCodeModal from '../components/BarCodeModal';
import AssinaHeader from '../components/AssinaHeader';
import Attendance from '../model/Attendance';

type SearchAttendanceState = ScreenState & {
  attendanceModal: boolean,
  attendanceRef: string,
};
export default class SearchAttendance extends Screen<SearchAttendanceState> {

  constructor(props: ScreenProps) {
    super(props, {
      attendanceModal: false,
      attendanceRef: '',
    });
  }

  public render(): ReactNode {
    const { attendanceModal, attendanceRef } = this.state;
    return (
      <ImageBackground source={assets.backgroundImage} style={baseStyles.imageBackground}>
        <BarCodeModal getVisibility={() => attendanceModal}
          setVisibility={(attendanceModal) => this.setState({ attendanceModal })}
          onRead={(attendanceRef) => this.setState({ attendanceRef })} />
        <AssinaLoading visible={this.isLoading} />
        <AssinaHeader right={<AssinaHeader.Exit onPress={this.goHome} />} />
        <View style={styles.containerForm}>
          <Text style={styles.title}>Pesquise o N° de Atendimento</Text>
          <Text style={styles.text}>Para ter acesso aos termos do paciente,{'\n'}
            pesquise pelo número de atendimento.</Text>
          <AssinaSeparator vertical='10%' />
          <View style={styles.attendanceBox}>
            <TextInput value={attendanceRef} placeholder='Pesquisar'
              placeholderTextColor='#7777' style={styles.attendanceInput}
              autoCorrect={false} onChange={(event) => this.handleTextChange('attendanceRef', event)} />
            <AssinaIcon.Barcode iconStyle={styles.attendanceIcon}
              onPress={() => this.setState({ attendanceModal: true })} />
          </View>
          <View style={styles.containerButton}>
            <AssinaButton text='Pesquisar' style={styles.button} onPress={() => this.search()} />
          </View>
        </View>
      </ImageBackground>
    );
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
  containerForm: {
    alignItems: 'center' as const,
    marginTop: '10%',
    marginHorizontal: '7.5%',
  },
  title: {
    ...baseStyles.textBold,
    fontSize: 40,
  },
  text: {
    ...baseStyles.textLight,
    marginTop: '5%',
    textAlign: 'center' as const,
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
    ...baseStyles.textBold,
    flex: 1,
    color: '#777',
  } as TextStyle,
  attendanceIcon: {
    color: '#777',
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
