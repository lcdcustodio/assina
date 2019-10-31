import React from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'native-base';

import AbstractScreen, { styles as baseStyles } from './AbstractScreen';
import { AssinaButton, AssinaLoading } from '../components/assina-base';
import { backgroundImage } from '../components/assets';
import Context from '../services/Context';

export default class SearchAttendance extends AbstractScreen {

  constructor(props) {
    super(props, { attendanceRef: '3051240' });
  }

  search = async (ctx) => {
    const attendanceRef = this.state.attendanceRef.trim();
    if (attendanceRef.length === 0) {
      return this.warn('Por favor, preencha o número de atendimento.');
    }
    this.startLoading();
    let attendance;
    try {
      attendance = await ctx.unit.findAttendance(attendanceRef);
    } catch (apiError) {
      switch (apiError.httpStatus) {
        case 404:
          return this.warn('Atendimento inválido.');
        default:
          return this.handleApiError(apiError);
      }
    }
    if (attendance.isEmpty) {
      return this.warn('Não há termos para este atendimento.');
    }
    ctx.attendance = attendance;
    ctx.callerStopLoading = this.stopLoading;
    this.props.navigation.navigate('ViewAttendance');
  }

  render() {
    return <Context.Consumer>{ctx =>
      <View style={styles.container}>
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
            <TextInput style={styles.textInput}
              placeholder='Pesquisar'
              placeholderTextColor='#707070'
              value={this.state.attendanceRef}
              autoCapitalize='none'
              autoCorrect={false}
              onChange={(event) => this.handleChange('attendanceRef', event)} />
            <View style={styles.containerButton}>
              <AssinaButton text='Pesquisar'
                style={styles.button}
                onPress={() => this.search(ctx)} />
            </View>
          </View>
        </ImageBackground>
      </View >
    }</Context.Consumer>
  }
}

const styles = {
  ...baseStyles,
  containerForm: {
    alignItems: 'center',
    marginTop: '10%',
    marginHorizontal: '7.5%',
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 40,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: 'white'
  },
  text: {
    marginTop: '5%',
    fontFamily: 'Roboto-Light',
    fontSize: 22,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 0.01,
    textAlign: 'center',
    color: 'white'
  },
  textInput: {
    marginTop: '10%',
    fontSize: 22,
    width: '100%',
    height: '13%',
    paddingLeft: '5%',
    borderRadius: 10,
    backgroundColor: '#efefef',
    color: '#707070'
  },
  containerButton: {
    marginTop: '10%',
    width: '100%',
  },
  button: {
    height: '33%',
  },
};
