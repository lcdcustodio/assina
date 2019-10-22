import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export const AssinaButton = (props) =>
  <TouchableOpacity style={[styles.assinaButton, props.style]} activeOpacity={0.5} onPress={props.onPress}>
    <Text style={[styles.assinaButtonText, props.textStyle]}>{props.text.toUpperCase()}</Text>
  </TouchableOpacity >

export const AssinaLoading = (props) =>
  <Spinner visible={props.visible} textContent='Aguarde...' textStyle={styles.assinaLoading} />

export const AssinaSeparator = (props) =>
  <View style={{ marginTop: props.vertical, marginLeft: props.horizontal }}></View>

export const styles = StyleSheet.create({
  assinaButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#957657',
    borderRadius: 10,
  },
  assinaButtonText: {
    margin: '2%',
    fontFamily: "Roboto-Bold",
    fontWeight: "bold",
    fontStyle: "normal",
    fontSize: 22,
    letterSpacing: 0,
    color: 'white',
  },
  assinaLoading: {
    color: 'white',
  },
});
