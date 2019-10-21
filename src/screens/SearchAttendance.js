import React from 'react';
import { TouchableHighlight, View, Text, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { Icon } from 'native-base';

import AbstractScreen, { Loading, styles as baseStyles } from './AbstractScreen';
import { backgroundImage } from '../components/assets';

export default class SearchAttendance extends AbstractScreen {

  constructor(props) {
    super(props, { attendanceRef: '3051240' });
  }

  search = async () => {
    const attendanceRef = this.state.attendanceRef.trim();
    if (attendanceRef.length === 0) {
      alert('Por favor, preencha o número de atendimento.');
      return;
    }
    this.isLoading = true;
    const stopLoading = () => this.isLoading = false;
    this.props.navigation.navigate('ViewAttendance', { attendanceRef, stopLoading });
  }

  render() {
    return (
      <View style={styles.container}>
        <Loading visible={this.isLoading} />
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
              <TouchableHighlight style={styles.button} onPress={this.search} underlayColor='#957657'>
                <Text style={styles.textButton}>PESQUISAR</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ImageBackground>
      </View >
    );
  }
}

const styles = {
  ...baseStyles,
  containerForm: {
    marginLeft: '7.5%',
    width: '85%',
    marginTop: '10%',
    borderColor: 'black',
    borderWidth: 0,
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 40,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#ffffff'
  },
  text: {
    marginTop: '5%',
    fontFamily: 'Roboto-Light',
    fontSize: 22,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 0.01,
    textAlign: 'center',
    color: '#ffffff'
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
    width: '100%'
  },
  button: {
    height: '33%',
    paddingTop: '3%',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#957657'
  },
  textButton: {
    fontSize: 22,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#FFFFFF'
  },
};