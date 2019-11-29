import React, { ReactNode } from 'react';
import { ImageBackground, Platform, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Picker } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';

import { assets, AssinaButton, AssinaLoading, AssinaSeparator } from '../components/assina-base';
import Screen, { ScreenProps, ScreenState, styles as baseStyles } from '../components/Screen';
import Unit from '../model/Unit';

type SelectUnitState = ScreenState & {
  units: Unit[];
  unit: Unit;
};
export default class SelectUnit extends Screen<SelectUnitState> {

  private constructor(props: ScreenProps) {
    super(props, { units: [], unit: null });
  }

  public componentDidMount(): void {
    this.loadUnits();
  }

  public render(): ReactNode {
    const { units, unit } = this.state;
    return <View style={styles.container}>
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
          selectedValue={unit}
          onValueChange={(u: Unit) => this.setState({ unit: u })} >
          <Picker.Item label='Unidade' value={null} />
          {units.map((item, index) =>
            <Picker.Item label={item.name} key={index} value={item} />
          )}
        </Picker>
      </View>
      <AssinaSeparator vertical='5%' />
      <AssinaButton text='Prosseguir'
        style={styles.button} textStyle={styles.buttonText}
        onPress={() => this.next()} />
      <ImageBackground source={assets.footerUnitImage} style={styles.imgBackground}>
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Selecione a sua Unidade</Text>
          <Text style={styles.footerText}>
            Para fazer login e visualizar os termos, {'\n'}
            você deve primeiro selecionar a sua unidade.
            </Text>
        </View>
      </ImageBackground>
    </View>
  }

  private async loadUnits(): Promise<void> {
    this.startLoading();
    let units: Unit[];
    try {
      units = await Unit.findAll();
    } catch (error) {
      return this.handleError(error);
    }
    this.stopLoading();
    this.setState({ units });
  }

  private async next(): Promise<void> {
    const { unit } = this.state;
    if (unit == null) {
      return this.warn("Selecione uma unidade.");
    }
    await unit.store();
    this.context.unit = unit;
    this.props.navigation.replace('Login');
  }
}

const styles = {
  ...baseStyles,
  containerTitle: {
    display: 'flex',
    alignItems: 'center',
  } as ViewStyle,
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 37,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#0a0819',
  } as TextStyle,
  containerSelect: {
    justifyContent: 'center',
    height: 70,
    marginHorizontal: '12.5%',
    backgroundColor: '#efefef',
    borderRadius: 10,
  } as ViewStyle,
  select: {
    marginHorizontal: '3%',
    ...Platform.select({
      ios: {},
      default: {
        color: '#707070',
      }
    }),
  } as TextStyle,
  imgBackground: {
    height: '73%',
    marginTop: '14%',
    marginLeft: '-15%',
    marginRight: '-1%',
    borderColor: 'white',
    borderWidth: 0,
    alignItems: 'center',
  } as ViewStyle,
  footer: {
    marginTop: '30%',
    marginLeft: '15%',
    borderColor: 'white',
    borderWidth: 0,
  } as ViewStyle,
  footerTitle: {
    marginBottom: '2.5%',
    fontFamily: "Roboto-Bold",
    fontSize: 46,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.04,
    color: "#ffffff",
    textAlign: "center"
  } as TextStyle,
  footerText: {
    marginTop: '2.5%',
    fontFamily: "Roboto-Light",
    fontSize: 30,
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0.03,
    color: "#ffffff",
    textAlign: "center"
  } as TextStyle,
  button: {
    marginHorizontal: '12.5%',
  } as ViewStyle,
  buttonText: {
    fontSize: 24,
  } as TextStyle,
};