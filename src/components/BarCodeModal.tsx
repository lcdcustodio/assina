import React, { Component, ReactNode } from 'react';
import { Modal, StyleSheet, View, ViewStyle } from 'react-native';
import { RNCamera, RNCameraProps } from 'react-native-camera';

import AssinaHeader from './AssinaHeader';

type BarCodeModalProps = {
  getVisibility: () => boolean;
  setVisibility: (isVisible: boolean) => void;
  onRead: (code: string) => void;
}
export default class BarCodeModal extends Component<BarCodeModalProps> {

  private constructor(props: BarCodeModalProps) {
    super(props);
  }

  public render(): ReactNode {
    const { getVisibility, setVisibility } = this.props;
    const { modal, camera } = styles;
    return <Modal visible={getVisibility()}>
      <View style={modal}>
        <AssinaHeader left={<AssinaHeader.Back onPress={() => setVisibility(false)} />} />
        <RNCamera type={RNCamera.Constants.Type.back} captureAudio={false} style={camera}
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
  camera: {
    flex: 1,
    marginTop: '2%',
    marginBottom: '5%',
    marginHorizontal: '5%',
  } as ViewStyle,
})
