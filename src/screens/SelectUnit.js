import React from 'react';
import { ImageBackground, Platform, Text, View } from 'react-native';
import { Picker } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';

import AbstractScreen, { styles as baseStyles } from './AbstractScreen';
import { AssinaButton, AssinaLoading, AssinaSeparator } from '../components/assina-base';
import { footerUnitImage } from '../components/assets';
import Unit from '../model/Unit';
import Context from '../services/Context';

export default class SelectUnit extends AbstractScreen {

  constructor(props) {
    super(props, { units: [], unit: null });
  }

  componentDidMount() {
    this.loadUnits();
  }

  loadUnits = async () => {
    this.startLoading();
    let units;
    try {
      units = await Unit.findAll();
    } catch (apiError) {
      return this.handleApiError(apiError);
    }
    this.stopLoading();
    this.setState({ units });
  }

  handleChangeUnit = (unit) => {
    this.setState({ unit });
  }

  next = async (ctx) => {
    const { unit } = this.state;
    if (unit == null) {
      return this.warn("Selecione uma unidade.");
    }
    await unit.store();
    ctx.unit = unit;
    this.props.navigation.replace('Login');
  }

  render() {
    return <Context.Consumer>{ctx =>
      <View style={styles.container}>
        <AssinaLoading visible={this.isLoading} />
        <AssinaSeparator vertical='20%' />
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Selecionar Unidade</Text>
        </View>
        <AssinaSeparator vertical='10%' />
        <View style={styles.containerSelect}>
          <Picker mode="dropdown"
            iosHeader="Selecione a sua Unidade"
            headerBackButtonText="Voltar"
            style={styles.select}
            iosIcon={<Icon name="chevron-down" />}
            selectedValue={this.state.unit}
            onValueChange={this.handleChangeUnit} >
            <Picker.Item label='Unidade' value={null} />
            {this.state.units.map((item, index) =>
              <Picker.Item label={item.name} key={index} value={item} />
            )}
          </Picker>
        </View>
        <AssinaSeparator vertical='5%' />
        <AssinaButton text='Prosseguir'
          style={styles.button} textStyle={styles.buttonText}
          onPress={() => this.next(ctx)} />
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
    }</Context.Consumer>
  }
}

const styles = {
  ...baseStyles,
  containerTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 37,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#0a0819',
  },
  containerSelect: {
    justifyContent: 'center',
    height: 70,
    marginHorizontal: '12.5%',
    backgroundColor: '#efefef',
    borderRadius: 10,
  },
  select: {
    marginHorizontal: '3%',
    ...Platform.select({
      ios: {},
      default: {
        color: '#707070',
      }
    }),
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