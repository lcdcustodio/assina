import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { NativeBase } from 'native-base';

export type IconStyle = NativeBase.Icon['style'];
export type TouchableStyle = ViewStyle; //TouchableOpacityProps['style'];

export const defaultTouchableActiveOpacity = 0.5;

/**
 * Palheta de cores
 */
export const pallete = {
    primary: '#957657',
    secondary: 'white',
};


/**
 * Icon (NativeBase)
 */
const iconStyle: IconStyle = {
    color: pallete.secondary,
    fontSize: 40,
};


/**
 * Text
 */
const textStyle: TextStyle = {
    color: pallete.secondary,
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
};


/**
 * View
 */
const viewStyle: ViewStyle = {
};
const viewBackgroundStyle: ViewStyle = {
    backgroundColor: pallete.primary,
};
const viewModalBackgroundStyle: ViewStyle = {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
};
const viewRoundStyle: ViewStyle = {
    ...viewBackgroundStyle,
    borderRadius: 10,
};


/**
 * Público
 */
const styles = StyleSheet.create({
    icon: iconStyle,
    text: textStyle,
    textBold: textBoldStyle,
    textLight: textLightStyle,
    view: viewStyle,
    viewBackground: viewBackgroundStyle,
    viewModalBackground: viewModalBackgroundStyle,
    viewRound: viewRoundStyle,
});
export default styles;
