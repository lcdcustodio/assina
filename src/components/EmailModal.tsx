import { Icon } from 'native-base';
import React, { Component } from 'react';
import { Modal, StyleSheet, Switch, Text, TextStyle, TextInput, TouchableOpacity, View, ViewStyle } from "react-native";

import { AssinaButton, AssinaSeparator } from './assina-base';
import baseStyles, { palette, IconStyle } from './assina-styles';

type EmailModalProps = {
  visible: boolean;
  defaultEmail: string;
  close: () => void;
  send: (email: string, sendAllSigned: boolean) => void;
}
type EmailModalState = {
  email: string;
  sendAllSigned: boolean;
}
export default class EmailModal extends Component<EmailModalProps, EmailModalState> {

  private constructor(props: EmailModalProps) {
    super(props);
    this.state = {
      email: props.defaultEmail,
      sendAllSigned: false,
    };
  }

  public render(): JSX.Element {
    const { visible, close, send } = this.props;
    const { email, sendAllSigned } = this.state;
    return <Modal animationType="fade" transparent={true} visible={visible} >
      <View style={baseStyles.viewModalBackground}>
        <View style={[styles.dialog]}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>E-mail</Text>
            <TouchableOpacity activeOpacity={0.5} onPress={close}>
              <Icon type='MaterialCommunityIcons' name='close-box' style={styles.closeButton} />
            </TouchableOpacity>
          </View>
          <AssinaSeparator vertical={20} />
          <TextInput keyboardType={'email-address'}
            placeholderTextColor='#707070' style={styles.textInput}
            value={email} onChangeText={(email) => this.setState({ email })} />
          <AssinaSeparator vertical={20} />
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Enviar todos os termos assinados</Text>
            <Switch value={sendAllSigned}
              onValueChange={(value) => this.setState({ sendAllSigned: value })}
              thumbColor={palette.primary}
              trackColor={{ false: '#ddd', true: 'brown' }} />
          </View>
          <AssinaSeparator vertical={20} />
          <AssinaButton text='Enviar' style={styles.sendButton} onPress={() => send(email, sendAllSigned)} />
        </View>
      </View>
    </Modal>
  }
}

const styles = StyleSheet.create({
  dialog: {
    ...baseStyles.viewRound,
    width: '60%',
    backgroundColor: 'white',
    paddingHorizontal: '3%',
    paddingTop: 20,
    paddingBottom: 30,
  } as ViewStyle,
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
  } as ViewStyle,
  title: {
    ...baseStyles.textBold,
    fontSize: 30,
    color: '#957657',
  } as TextStyle,
  closeButton: {
    marginRight: -7,
    fontSize: 50,
    color: '#957657',
  } as IconStyle,
  textInput: {
    ...baseStyles.text,
    borderWidth: 1,
    borderColor: '#70450e',
    color: '#957657',
  } as TextStyle,
  formItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  } as ViewStyle,
  formLabel: {
    ...baseStyles.text,
    color: '#957657',
  } as TextStyle,
  sendButton: {
    height: 50,
  } as ViewStyle,
})
