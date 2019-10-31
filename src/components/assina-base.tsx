import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

/**
 * Botão de uso geral.
 * 
 * @param props Propriedades.
 */
export const AssinaButton = (props: {
  text?: string;
  style?: typeof TouchableOpacity.prototype.props.style;
  textStyle?: typeof Text.prototype.props.style;
  onPress?: typeof TouchableOpacity.prototype.props.onPress;
}) =>
  <TouchableOpacity style={[styles.assinaButton, props.style]} activeOpacity={0.5} onPress={props.onPress}>
    <Text style={[styles.assinaButtonText, props.textStyle]}>{props.text ? props.text.toUpperCase() : ''}</Text>
  </TouchableOpacity >

/**
 * Exibição de carregamento na tela.
 * 
 * @param props Propriedades.
 */
export const AssinaLoading = (props: { visible?: boolean }) =>
  <Spinner visible={props.visible} textContent='Aguarde...' textStyle={{ color: 'white' }} />


/**
 * Separador de conteúdo vertical ou horizontal. Para evitar problemas com os
 * bugs de margin e padding do React Native, é recomendado utilizar este
 * componente ao invés de embutir margens em outros componentes funcionais.
 * 
 * @param props Propriedades.
 */
export const AssinaSeparator = (props: {
  vertical?: ViewStyle['marginTop'];
  horizontal?: ViewStyle['marginLeft'];
}) =>
  <View style={{ marginTop: props.vertical, marginLeft: props.horizontal }} />


/**
 * Estilos padrão dos componentes.
 */
const styles = StyleSheet.create({
  assinaButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#957657',
    borderRadius: 10,
  },
  assinaButtonText: {
    margin: '2%',
    fontFamily: "Roboto-Bold",
    fontWeight: "bold",
    fontStyle: "normal",
    fontSize: 22,
    letterSpacing: 0,
    color: 'white',
  },
});
