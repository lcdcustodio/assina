import React, { Component } from 'react';
import { Modal, StyleSheet, View, ViewStyle } from 'react-native';
import { RNCamera } from 'react-native-camera';

import { AssinaHeaderButton } from './assina-base';

type BarcodeModalProps = {
  getVisibility: () => boolean;
  setVisibility: (isVisible: boolean) => void;
  onRead: (attendanceRef: string) => void;
}
export default class BarcodeModal extends Component<BarcodeModalProps> {

  private constructor(props: BarcodeModalProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { getVisibility, setVisibility, onRead } = this.props;
    return <Modal visible={getVisibility()}>
      <View style={styles.modal}>
        <View style={styles.header}>
          <AssinaHeaderButton.Back viewStyle={styles.button}
            onPress={() => setVisibility(false)} />
        </View>
        <RNCamera type={RNCamera.Constants.Type.back} captureAudio={false}
          style={styles.camera}
          onBarCodeRead={(event) => { setVisibility(false); onRead(event.data); }} />
      </View>
    </Modal>
  }
}

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  } as ViewStyle,
  header: {
    height: 85,
    paddingHorizontal: '3%',
    backgroundColor: '#957657',
    flexDirection: 'row',
    justifyContent: 'space-between',
  } as ViewStyle,
  button: {
    justifyContent: 'center',
  } as ViewStyle,
  camera: {
    flex: 1,
    margin: '5%',
  } as ViewStyle,
})
