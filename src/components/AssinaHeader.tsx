import React, { Component, FunctionComponent, ReactElement, ReactNode } from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import { Icon, NativeBase } from 'native-base';

import { AssinaSeparator, styles as baseStyles } from './assina-base';

type ReactElements = ReactElement | ReactElement[];
type TouchableStyle = TouchableOpacityProps['style'];
type IconStyle = NativeBase.Icon['style'];

/**
 * Botão de cabeçalho
 */
type AssinaHeaderButtonProps = {
  onPress?: TouchableOpacityProps['onPress'];
  style?: TouchableStyle;
  text?: string;
  textStyle?: TextStyle;
  iconType?: NativeBase.Icon['type'];
  iconName?: NativeBase.Icon['name'];
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
  left?: ReactElements;
  right?: ReactElements;
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
          <View style={{ ...actualBlockStyle, justifyContent: 'flex-start' }}>{this.index(left)}</View>
        }
        {right &&
          <View style={{ ...actualBlockStyle, justifyContent: 'flex-end' }}>{this.index(right)}</View>
        }
        {children &&
          <View style={centerContainer}>
            <View style={{ ...actualBlockStyle, justifyContent: 'center' }}>{children}</View>
          </View>
        }
      </View>
    );
  }

  private index(nodes: ReactElements): ReactElements {
    return Array.isArray(nodes)
      ? nodes.map((n, i) => React.cloneElement(n, { key: i }))
      : nodes;
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

  buttonText: {
    ...baseStyles.text,
  } as TextStyle,

  buttonIcon: {
    fontSize: 40,
    color: baseStyles.main.color,
  } as IconStyle,
});
