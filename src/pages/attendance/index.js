import React from 'react';
import { TouchableHighlight, View, Text, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { Icon } from 'native-base';

import AbstractPage, { Loading } from '../AbstractPage';

export default class AttendanceSearchPage extends AbstractPage {

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      attendanceRef: '3051240',
    }
  }

  search = async () => {
    const attendanceRef = this.state.attendanceRef.trim();
    if (attendanceRef.length === 0) {
      alert('Por favor, preencha o número de atendimento.');
      return;
    }
    this.isLoading = true;
    const stopLoading = () => this.isLoading = false;
    this.props.navigation.navigate('AttendanceResults', { attendanceRef, stopLoading });
  }

  render() {
    return (
      <View style={styles.container}>
        <Loading visible={this.isLoading} />
        <ImageBackground source={require('../../../assets/images/general-background.png')} style={styles.imgBackground}>
          <View style={styles.containerMenu}>
            <TouchableOpacity style={styles.containerImgExit} onPress={this.goHome}>
              <Text style={styles.imgText}>Sair</Text>
              <Icon type='MaterialIcons' name='exit-to-app' style={styles.imgExit} />
            </TouchableOpacity>
          </View>
          <View style={styles.containerForm}>
            <Text style={styles.title}> Pesquise o N° de Atendimento </Text>
            <Text style={styles.text}> Para ter acesso aos termos do paciente, pesquise pelo número de atendimento. </Text>
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
      </View>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  imgBackground: {
    width: '100%',
    height: '100%'
  },
  containerMenu: {
    height: '6%',
    paddingTop: '2%',
    borderColor: 'black',
    borderWidth: 0,
  },
  containerImgExit: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 0,
  },
  imgExit: {
    fontSize: 40,
    color: 'white',
    marginRight: '5%',
    marginLeft: '1%'
  },
  imgText: {
    fontFamily: 'Roboto-Light',
    fontSize: 24,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 0.01,
    textAlign: 'center',
    color: '#ffffff'
  },
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
  spinnerTextStyle: {
    color: '#ffffff'
  }
};