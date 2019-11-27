import React, { Component, FunctionComponent, ReactElement, ReactNode } from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Icon } from 'native-base';

import { OneOrMany, IconName, IconType, TouchableOnPress, addKey, AssinaSeparator } from './assina-base';
import baseStyles, { IconStyle, TouchableStyle } from './assina-styles';

/**
 * Botão de cabeçalho
 */
type AssinaHeaderButtonProps = {
  onPress?: TouchableOnPress;
  style?: TouchableStyle;
  text?: string;
  textStyle?: TextStyle;
  iconType?: IconType;
  iconName?: IconName;
  iconStyle?: IconStyle;
};

type AssinaHeaderSpecificButtonProps = Omit<AssinaHeaderButtonProps, 'text' | 'iconType' | 'iconName'>;

const AssinaHeaderButton: FunctionComponent<AssinaHeaderButtonProps> = (props) => {
  const { onPress, style, text, textStyle, iconType, iconName, iconStyle } = props;
  const { buttonTouchable, buttonText, buttonIcon } = styles;
  return (
    <TouchableOpacity style={[style, buttonTouchable]} onPress={onPress}>
      {text && <Text style={[textStyle, buttonText]}>{text}</Text>}
      {iconType && iconName && <Icon type={iconType} name={iconName} style={[iconStyle, buttonIcon]} />}
    </TouchableOpacity>
  );
}


/**
 * Cabeçalho
 */
export type AssinaHeaderProps = {
  left?: OneOrMany<ReactElement>;
  right?: OneOrMany<ReactElement>;
  style?: ViewStyle;
  blockStyle?: ViewStyle;
};
export default class AssinaHeader extends Component<AssinaHeaderProps> {

  public static Back: FunctionComponent<AssinaHeaderSpecificButtonProps> = (props) =>
    <AssinaHeaderButton iconType='MaterialCommunityIcons' iconName='arrow-left' {...props} />

  public static Reload: FunctionComponent<AssinaHeaderSpecificButtonProps> = (props) =>
    <AssinaHeaderButton iconType='MaterialCommunityIcons' iconName='reload' {...props} />

  public static Exit: FunctionComponent<AssinaHeaderSpecificButtonProps> = (props) =>
    <AssinaHeaderButton text='Sair' iconType='MaterialIcons' iconName='exit-to-app' {...props} />

  public static Separator: FunctionComponent<{}> = () => <AssinaSeparator horizontal='10%' />

  private constructor(props: Readonly<AssinaHeaderProps>) {
    super(props);
  }

  public render(): ReactNode {
    const { left, right, style, blockStyle, children } = this.props;
    const { mainContainer, centerContainer, block } = styles;
    const actualBlockStyle = { ...block, ...blockStyle };
    return (
      <View style={[mainContainer, style]}>
        {left &&
          <View style={{ ...actualBlockStyle, justifyContent: 'flex-start' }}>{addKey(left)}</View>
        }
        {right &&
          <View style={{ ...actualBlockStyle, justifyContent: 'flex-end' }}>{addKey(right)}</View>
        }
        {children &&
          <View style={centerContainer}>
            <View style={{ ...actualBlockStyle, justifyContent: 'center' }}>{children}</View>
          </View>
        }
      </View>
    );
  }
}


/**
 * Estilos
 */
export const styles = StyleSheet.create({

  mainContainer: {
    width: '100%',
    height: 85,
    paddingHorizontal: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  } as ViewStyle,

  centerContainer: {
    position: 'absolute',
    top: 0, right: 0, bottom: 0, left: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  } as ViewStyle,

  block: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as ViewStyle,

  buttonTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle, // TouchableStyle,

  buttonText: baseStyles.text,
  buttonIcon: baseStyles.icon,
});
