import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity } from "react-native"
import { Icon } from 'native-base';
import { AssinaButton, AssinaSeparator } from './assina-base';

type EmailModalProps = {
  visible: boolean;
  defaultEmail: string;
  close: () => void;
  send: (email: string) => void;
}
type EmailModalState = {
  email: string;
}
export default class EmailModal extends Component<EmailModalProps, EmailModalState> {

  private constructor(props: EmailModalProps) {
    super(props);
    this.state = { email: props.defaultEmail };
  }

  public render(): JSX.Element {
    const { visible, close, send } = this.props;
    const { email } = this.state;
    return <Modal animationType="fade" transparent={true} visible={visible} >
      <View style={[styles.overlay]}>
        <View style={[styles.container]}>
          <View style={styles.headerContainer}>
            <Text style={styles.text}>E-mail</Text>
            <TouchableOpacity activeOpacity={0.5} onPress={close}>
              <Icon type='MaterialCommunityIcons' name='close-box' style={styles.closeButton} />
            </TouchableOpacity>
          </View>
          <AssinaSeparator vertical='5%' />
          <View style={{ marginHorizontal: '5%' }}>
            <View style={{ marginBottom: '5%' }}>
              <TextInput keyboardType={'email-address'}
                placeholderTextColor='#707070' style={styles.inputText}
                value={email} onChangeText={(email) => this.setState({ email })} />
            </View>
            <View style={styles.containerButton}>
              <AssinaButton text='Enviar' style={styles.button} onPress={() => send(email)} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  }
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flexDirection: "row",
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '50%'
  },
  container: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 4,
    height: 300,
    paddingTop: '3%'
  },
  inputText: {
    width: '100%',
    height: 50,
    color: '#000000',
    borderColor: '#70450e',
    borderWidth: 1,
    fontSize: 30
  },
  containerButton: {
    width: '100%',
  },
  button: {
    height: '50%',
  },
  text: {
    fontFamily: 'Roboto-Light',
    letterSpacing: 0.01,
    fontSize: 30,
    height: 50,
    marginLeft: '5%',
    color: '#957657',
    fontWeight: 'bold'
  },
  closeButton: {
    fontSize: 50,
    color: '#957657',
    paddingRight: '5%'
  },
  headerContainer: {
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center"
  }
})
