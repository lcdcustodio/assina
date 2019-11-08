import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity } from "react-native"
import { Icon } from 'native-base';
import { AssinaButton, AssinaSeparator } from '../components/assina-base';

type ModalEmailProps = {
  visible: boolean;
  email: string;
  close: () => void;
  send: (email: string) => void;
}

type ModalEmailState = {
  email: string;
}
export default class ModalEmail extends Component<ModalEmailProps, ModalEmailState>{

  constructor(props: ModalEmailProps) {
    super(props);
    this.state = { email: this.props.email };
  }

  validate = (email: string) => {
    this.setState({ email });
  }

  send = () => {
    this.props.send(this.state.email)
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible} >
        <View style={[styles.overlay]}>
          <View style={[styles.container]}>
            <View style={styles.headerContainer}>
              <Text style={styles.text}>E-mail</Text>
              <TouchableOpacity activeOpacity={0.5} onPress={this.props.close}>
                <Icon type='MaterialCommunityIcons' name='close-box' style={styles.closeButton} />
              </TouchableOpacity>
            </View>
            <AssinaSeparator vertical='5%' />
            <View style={{ marginHorizontal: '5%' }}>
              <View style={{ marginBottom: '5%' }}>
                <TextInput editable={true} value={this.state.email}
                  onChangeText={(text) => this.validate(text)}
                  placeholderTextColor='#707070'
                  keyboardType={'email-address'}
                  style={styles.inputText} />
              </View>
              <View style={styles.containerButton}>
                <AssinaButton text='Enviar' style={styles.button} onPress={this.send} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: "row",
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '30%'
  },
  container: {
    paddingBottom: '2%',
    margin: '0%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: '#000000',
    borderStyle: 'solid',
    borderWidth: 1,
    height: 350 
  },
  inputText: {
    marginBottom: '5%',
    width: '100%',
    height: 50,
    color: '#000000',
    borderColor: '#70450e',
    borderWidth: 1,
    fontSize: 30
  },
  containerButton: {
    width: '100%'
  },
  button: {
    height: '40%'
  },
  text: {
    fontFamily: 'Roboto-Light',
    letterSpacing: 0.01,
    fontSize: 40, 
    height: 50,
    alignSelf: "center", 
    marginLeft: '5%',
    color: '#957657',
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 80, 
    color: '#957657'
  },
  headerContainer: {
    width: '100%', 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignContent: "center"
  }

})

