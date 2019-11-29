import React, { ReactElement } from 'react';
import { Platform, StatusBar, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import { Icon, NativeBase } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import styles, { IconStyle, TouchableStyle, defaultTouchableActiveOpacity, palette } from './assina-styles';


/**
 * @see https://medium.com/dailyjs/typescript-create-a-condition-based-subset-types-9d902cea5b8c
 */
export type FilterFlags<Base, Condition> = { [Key in keyof Base]: Base[Key] extends Condition ? Key : never };
export type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];
export type SubType<Base, Condition> = Pick<Base, AllowedNames<Base, Condition>>;


export type OneOrMany<T> = T | T[];


export function addKey(elements: OneOrMany<ReactElement>) {
  return Array.isArray(elements)
    ? elements.map((n, i) => React.cloneElement(n, { key: i }))
    : elements;
}


export type IconName = NativeBase.Icon['name'];
export type IconType = NativeBase.Icon['type'];
export type TouchableOnPress = TouchableOpacityProps['onPress'];


/**
 * Assets
 */
export type AppJson = {
  api: {
    baseUrl: string;
    timeoutMillis: number;
  };
};
const rootPath = '../..';
const assetPath = `${rootPath}/assets`;
const imagePath = `${assetPath}/images`;
export const assets = {
  appJson: require(`${rootPath}/app.json`) as AppJson,
  footerUnitImage: require(`${imagePath}/footerHome.png`) as number,
  logoImage: require(`${imagePath}/assinaLogo.png`) as number,
  backgroundImage: require(`${imagePath}/general-background.png`) as number,
  vilaNovaBackgroundImage: require(`${imagePath}/vila-nova-background.jpg`) as number,
  dfStarBackgroundImage: require(`${imagePath}/dfstar-background.png`) as number,
};


/**
 * Botão de uso geral.
 */
export type AssinaButtonProps = {
  onPress?: TouchableOnPress;
  style?: TouchableStyle;
  text?: string;
  textStyle?: TextStyle;
};
export const AssinaButton = (props: AssinaButtonProps) => {
  const { onPress, style, text, textStyle } = props;
  const { touchableDefaults, textDefaults } = assinaButtonDefaultStyles;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={defaultTouchableActiveOpacity} style={[touchableDefaults, style]}>
      <Text style={[textDefaults, textStyle]}>{text ? text.toUpperCase() : ''}</Text>
    </TouchableOpacity >
  );
};
const assinaButtonDefaultStyles = StyleSheet.create({
  touchableDefaults: {
    ...styles.viewRound,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  } as TouchableStyle,
  textDefaults: {
    ...styles.textBold,
    margin: '2%',
  } as TextStyle,
});


/**
 * Ícone pressionável.
 */
export type AssinaIconProps = {
  onPress?: TouchableOnPress;
  style?: TouchableStyle;
  iconType?: IconType;
  iconName?: IconName;
  iconStyle?: IconStyle;
  text?: string;
  textStyle?: TextStyle;
};
export const AssinaIcon = (props: AssinaIconProps) => {
  const { onPress, style, iconType, iconName, iconStyle, text, textStyle } = props;
  const { iconDefaults, textDefaults, touchableDefaults } = assinaIconDefaultStyles;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={defaultTouchableActiveOpacity} style={[touchableDefaults, style]}>
      {text && <Text style={[textDefaults, textStyle]}>{text}</Text>}
      {iconType && iconName && <Icon type={iconType} name={iconName} style={[iconDefaults, iconStyle]} />}
    </TouchableOpacity>
  );
};
export type AssinaIconSpecificProps = Omit<AssinaIconProps, 'iconType' | 'iconName' | 'text'>;
AssinaIcon.Email = (props: AssinaIconSpecificProps) => <AssinaIcon iconType='MaterialCommunityIcons' iconName='email' {...props} />
AssinaIcon.Barcode = (props: AssinaIconSpecificProps) => <AssinaIcon iconType='MaterialCommunityIcons' iconName='barcode-scan' {...props} />
//
const assinaIconDefaultStyles = StyleSheet.create({
  iconDefaults: styles.icon,
  textDefaults: {
    ...styles.textLight,
    textAlign: 'center',
    fontSize: 24,
  } as TextStyle,
  touchableDefaults: {} as TouchableStyle,
});


/**
 * Exibição de carregamento na tela.
 */
export type AssinaLoadingProps = {
  visible?: boolean;
};
export const AssinaLoading = (props: AssinaLoadingProps) =>
  <Spinner visible={props.visible} textContent='Aguarde...' textStyle={styles.text} />


/**
 * Separador de conteúdo vertical ou horizontal. Para evitar problemas com os
 * bugs de margin e padding do React Native, é recomendado utilizar este
 * componente ao invés de embutir margens em outros componentes funcionais.
 */
export type AssinaSeparatorProps = {
  vertical?: ViewStyle['marginTop'];
  horizontal?: ViewStyle['marginLeft'];
};
export const AssinaSeparator = (props: AssinaSeparatorProps) =>
  <View style={{ marginTop: props.vertical, marginLeft: props.horizontal }} />


/**
 * Barra de status do dispositivo.
 */
export const AssinaStatusBar = () => {
  const { viewDefaults } = assinaStatusBarDefaultStyles;
  return (
    <View style={viewDefaults}>
      <StatusBar backgroundColor={viewDefaults.backgroundColor} barStyle='light-content' translucent={true} />
    </View>
  );
}
const assinaStatusBarDefaultStyles = StyleSheet.create({
  viewDefaults: {
    height: (Platform.OS === 'ios' ? 20 : StatusBar.currentHeight),
    backgroundColor: palette.primary,
  } as ViewStyle,
});
