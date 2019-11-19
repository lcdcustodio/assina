import React, { Component } from 'react';
import { Modal, StyleSheet, View, ViewStyle } from 'react-native';
import { RNCamera, RNCameraProps } from 'react-native-camera';

import { AssinaHeaderButton } from './assina-base';

type BarCodeModalProps = {
  getVisibility: () => boolean;
  setVisibility: (isVisible: boolean) => void;
  onRead: (code: string) => void;
}
export default class BarCodeModal extends Component<BarCodeModalProps> {

  private constructor(props: BarCodeModalProps) {
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
        <RNCamera type={RNCamera.Constants.Type.back} captureAudio={false} style={styles.camera}
          onBarCodeRead={this.onGeneralRead} onGoogleVisionBarcodesDetected={this.onMlkitRead} />
      </View>
    </Modal>
  }

  private onRead(code: string) {
    const { setVisibility, onRead } = this.props;
    setVisibility(false);
    onRead(code);
  }

  private onGeneralRead: RNCameraProps['onBarCodeRead'] = ({ data }) => {
    this.onRead(data);
  }

  private onMlkitRead: RNCameraProps['onGoogleVisionBarcodesDetected'] = ({ barcodes }) => {
    if (barcodes.length) {
      this.onRead(barcodes[0].data);
    }
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
