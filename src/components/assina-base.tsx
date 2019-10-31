import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

/**
 * Botão de uso geral.
 * 
 * @param props Props.
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
 * @param props Props.
 */
export const AssinaLoading = (props: { visible?: boolean }) =>
  <Spinner visible={props.visible} textContent='Aguarde...' textStyle={styles.assinaLoading} />


/**
 * Separador de conteúdo vertical ou horizontal. Para evitar problemas com os
 * bugs de margin e padding do React Native, é recomendado utilizar este
 * componente ao invés de embutir margens em outros componentes funcionais.
 * 
 * @param props Props.
 */
export const AssinaSeparator = (props: {
  vertical?: ViewStyle['marginTop'];
  horizontal?: ViewStyle['marginLeft'];
}) =>
  <View style={{ marginTop: props.vertical, marginLeft: props.horizontal }} />

/**
 * Barra de status.
 */
export const AssinaStatusBar = () =>
  <GeneralStatusBarColor backgroundColor={styles.assinaStatusBar.backgroundColor} barStyle="light-content" />

/**
 * Barra de Status com cor de fundo no IOS e Android.
 * 
 * @param props Props.
 * @see https://medium.com/reactbrasil/pt-br-react-native-configurando-a-status-bar-background-color-no-android-e-ios-a21b2f49c1d9
 * @see https://medium.com/reactbrasil/react-native-setting-a-status-bar-background-color-on-android-and-ios-1cba14a4e3f9
 */
const GeneralStatusBarColor = (props: StatusBar['props']) =>
  <View style={{ height: styles.assinaStatusBar.height, backgroundColor: props.backgroundColor }}>
    <StatusBar translucent {...props} />
  </View>

/**
 * Estilos básicos do aplicativo.
 */
const baseStyles = StyleSheet.create({
  theme: {
    color: 'white',
    backgroundColor: '#957657',
  }
});

/**
 * Estilos padrão dos componentes.
 */
const styles = StyleSheet.create({
  ...baseStyles,
  assinaButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: baseStyles.theme.backgroundColor,
    borderRadius: 10,
  },
  assinaButtonText: {
    margin: '2%',
    fontFamily: "Roboto-Bold",
    fontWeight: "bold",
    fontStyle: "normal",
    fontSize: 22,
    letterSpacing: 0,
    color: baseStyles.theme.color,
  },
  assinaLoading: {
    color: baseStyles.theme.color,
  },
  assinaStatusBar: {
    height: (Platform.OS === 'ios' ? 20 : StatusBar.currentHeight),
    backgroundColor: baseStyles.theme.backgroundColor,
  }
});
