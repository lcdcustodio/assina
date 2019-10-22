import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { Picker } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

import AbstractScreen, { styles as baseStyles } from './AbstractScreen';
import { AssinaButton, AssinaLoading, AssinaSeparator } from '../components/assina-base';
import { footerUnitImage } from '../components/assets';
import api from '../services/api';

export default class SelectUnit extends AbstractScreen {

  constructor(props) {
    super(props, { units: [], unit: null, });
  }

  componentDidMount() {
    this.loadUnits();
  }

  loadUnits = async () => {
    this.isLoading = true;
    let units;
    try {
      units = await api.getUnits();
    } catch (apiError) {
      return this.handleApiError(apiError);
    }
    this.isLoading = false;
    this.setState({ units: units });
  }

  handleChangeUnit = (unit) => {
    this.setState({ unit });
  }

  next = async () => {
    const { unit } = this.state;
    if (unit != null) {
      await AsyncStorage.setItem('unit', JSON.stringify(unit));
      this.props.navigation.replace('Login', { unit });
    } else {
      alert("Selecione uma unidade.");
    }
  }

  render() {
    let pickerItems = this.state.units.map((item, index) =>
      (<Picker.Item label={item.name} key={index} value={item} />));
    return (
      <View style={styles.container}>
        <AssinaLoading visible={this.isLoading} />
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Selecionar Unidade</Text>
        </View>
        <View style={styles.containerSelect}>
          <Picker mode="dropdown"
            iosHeader="Selecione a sua Unidade"
            headerBackButtonText="Voltar"
            style={styles.select}
            iosIcon={<Icon name="chevron-down" />}
            selectedValue={this.state.unit}
            onValueChange={this.handleChangeUnit} >
            <Picker.Item label='Unidade' value={null} />
            {pickerItems}
          </Picker>
        </View>
        <AssinaSeparator vertical='5%' />
        <AssinaButton text='Prosseguir' style={styles.button} textStyle={styles.buttonText} onPress={this.next} />
        <ImageBackground source={footerUnitImage} style={styles.imgBackground}>
          <View style={styles.footer}>
            <Text style={styles.footerTitle}>Selecione a sua Unidade</Text>
            <Text style={styles.footerText}>
              Para fazer login e visualizar os termos, {'\n'}
              você deve primeiro selecionar a sua unidade.
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = {
  ...baseStyles,
  containerTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    marginTop: '20%',
    fontFamily: 'Roboto-Bold',
    fontSize: 37,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#0a0819',
  },
  containerSelect: {
    justifyContent: 'center',
    width: '75%',
    height: 70,
    marginTop: '10%',
    marginLeft: '12.5%',
    paddingTop: '3.8%',
    backgroundColor: '#efefef',
    borderRadius: 10,
  },
  select: {
    marginLeft: '3%',
    marginRight: '3%',
    color: '#707070',
  },
  imgBackground: {
    height: '73%',
    marginTop: '14%',
    marginLeft: '-15%',
    marginRight: '-1%',
    borderColor: 'white',
    borderWidth: 0,
    alignItems: 'center',
  },
  footer: {
    marginTop: '30%',
    marginLeft: '15%',
    borderColor: 'white',
    borderWidth: 0,
  },
  footerTitle: {
    marginBottom: '2.5%',
    fontFamily: "Roboto-Bold",
    fontSize: 46,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.04,
    color: "#ffffff",
    textAlign: "center"
  },
  footerText: {
    marginTop: '2.5%',
    fontFamily: "Roboto-Light",
    fontSize: 30,
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0.03,
    color: "#ffffff",
    textAlign: "center"
  },
  button: {
    marginHorizontal: '12.5%',
  },
  buttonText: {
    fontSize: 24,
  },
};