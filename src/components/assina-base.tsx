import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import { Icon, NativeBase } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';


/**
 * TODO Obter o tipo de estilo de qualquer componente.
 */
type StyledProps<T> = { style?: T };
//type StyledFunctional<T> = new (Pick<>)
export type Style<T> = T extends StyledProps<infer S> ? S : never;


/**
 * Botão de uso geral.
 */
export type AssinaButtonProps = {
  onPress?: TouchableOpacityProps['onPress'];
  style?: TouchableOpacityProps['style'];
  text?: string;
  textStyle?: TextStyle;
};
export const AssinaButton = (props: AssinaButtonProps) =>
  <TouchableOpacity style={[styles.assinaButton, props.style]} activeOpacity={0.5} onPress={props.onPress}>
    <Text style={[styles.assinaButtonText, props.textStyle]}>{props.text ? props.text.toUpperCase() : ''}</Text>
  </TouchableOpacity >


/**
 * Ícone pressionável.
 */
type AssinaIconProps = {
  onPress?: TouchableOpacityProps['onPress'];
  viewStyle?: TouchableOpacityProps['style'];
  iconType?: NativeBase.Icon['type'];
  iconName?: NativeBase.Icon['name'];
  iconStyle?: NativeBase.Icon['style'];
  text?: string;
  textStyle?: TextStyle;
};
type AssinaIconSpecificProps = Omit<AssinaIconProps, 'iconType' | 'iconName' | 'text'>;
export const AssinaIcon = (props: AssinaIconProps) =>
  <TouchableOpacity style={[baseStyles.assinaIcon_View, props.viewStyle]} activeOpacity={0.5} onPress={props.onPress}>
    {props.text &&
      <Text style={[baseStyles.assinaIcon_Text, props.textStyle]}>{props.text}</Text>
    }
    {props.iconType && props.iconName &&
      <Icon type={props.iconType} name={props.iconName} style={[baseStyles.assinaIcon_Icon, props.iconStyle]} />
    }
  </TouchableOpacity>
AssinaIcon.Email = (props: AssinaIconSpecificProps) => <AssinaIcon iconType='MaterialCommunityIcons' iconName='email' {...props} />
AssinaIcon.Barcode = (props: AssinaIconSpecificProps) => <AssinaIcon iconType='MaterialCommunityIcons' iconName='barcode-scan' {...props} />


/**
 * Exibição de carregamento na tela.
 * 
 * @param props Props.
 */
export const AssinaLoading = (props: { visible?: boolean }) =>
  <Spinner visible={props.visible} textContent='Aguarde...' textStyle={styles.text} />


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
  <View style={styles.assinaStatusBar}>
    <StatusBar backgroundColor={styles.assinaStatusBar.backgroundColor} barStyle='light-content' translucent={true} />
  </View>


/*********************************** STYLES ***********************************/

const theme = StyleSheet.create({
  main: {
    backgroundColor: '#957657',
    color: 'white',
  },
});

const textStyle: TextStyle = {
  color: theme.main.color,
  fontFamily: 'Roboto',
  fontSize: 22,
  fontStyle: 'normal',
  fontWeight: 'normal',
  letterSpacing: 0,
  textAlign: 'left',
};
const textBoldStyle: TextStyle = {
  ...textStyle,
  fontFamily: 'Roboto-Bold',
  fontWeight: 'bold',
};
const textLightStyle: TextStyle = {
  ...textStyle,
  fontFamily: 'Roboto-Light',
  fontWeight: '300',
  letterSpacing: 0.01,
}

const viewStyle: ViewStyle = {
}
const viewBackgroundStyle: ViewStyle = {
  backgroundColor: theme.main.backgroundColor,
}
const viewRoundStyle: ViewStyle = {
  ...viewBackgroundStyle,
  borderRadius: 10,
};

const baseStyles = StyleSheet.create({
  /* AssinaButton */
  assinaButton: {
    ...viewRoundStyle,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  assinaButtonText: {
    ...textBoldStyle,
    margin: '2%',
  },
  /* AssinaIcon */
  assinaIcon_View: {},
  assinaIcon_Icon: {
    fontSize: 40,
    color: theme.main.color,
  },
  assinaIcon_Text: {
    ...textLightStyle,
    textAlign: 'center',
    fontSize: 24,
  },
  /* AssinaStatusBar */
  assinaStatusBar: {
    height: (Platform.OS === 'ios' ? 20 : StatusBar.currentHeight),
    backgroundColor: theme.main.backgroundColor,
  },
});

export const styles = StyleSheet.create({
  ...theme,
  text: textStyle,
  textBold: textBoldStyle,
  textLight: textLightStyle,
  view: viewStyle,
  viewBackground: viewBackgroundStyle,
  viewRound: viewRoundStyle,
  ...baseStyles,
});
