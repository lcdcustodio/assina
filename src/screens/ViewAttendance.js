import React from 'react';
import { Icon } from 'native-base';
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from 'react-native';

import AbstractScreen, { styles as baseStyles } from './AbstractScreen';
import { AssinaLoading } from '../components/assina-base';
import { backgroundImage } from '../components/assets';
import Context from '../services/Context';

export default class ViewAttendance extends AbstractScreen {

  constructor(props) {
    super(props);
    this.context = null;
  }

  didFocus = this.props.navigation.addListener('didFocus', async () => {
    this.context.callerStopLoading();
    if (this.context.attendance.isDirty) {
      await this.refresh();
    }
  });

  refresh = async () => {
    this.startLoading();
    const { unit, attendance } = this.context;
    try {
      this.context.attendance = await unit.findAttendance(attendance.ref);
    } catch (apiError) {
      return this.handleApiError(apiError);
    }
    this.stopLoading();
  }

  openDocument = async (document) => {
    this.startLoading();
    try {
      await document.downloadUnsignedHtml();
    } catch (apiError) {
      switch (apiError.httpStatus) {
        case 404:
          return this.warn('Modelo de documento não cadastrado.');
        default:
          return this.handleApiError(apiError);
      }
    }
    this.context.document = document;
    this.context.callerStopLoading = this.stopLoading;
    this.props.navigation.navigate('SignDocument');
  }

  render() {
    return <Context.Consumer>{context => {
      this.context = context;
      return this.renderConsumer();
    }}</Context.Consumer>
  }

  renderConsumer() {
    return <View style={styles.container}>
      <AssinaLoading visible={this.isLoading} />
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerLeft} onPress={this.goBack}>
            <Icon type='MaterialCommunityIcons' name='arrow-left' style={styles.headerIcon} />
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity style={[{ marginRight: '10%' }, styles.headerRight]}
              onPress={this.refresh}>
              <Icon type='MaterialCommunityIcons' name='reload' style={styles.headerIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerRight} onPress={this.goHome}>
              <Text style={styles.headerIconText}>Sair</Text>
              <Icon type='MaterialIcons' name='exit-to-app' style={styles.headerIcon} />
            </TouchableOpacity>
          </View>
        </View>
        {this.renderAttendance()}
      </ImageBackground>
    </View>
  }

  renderAttendance = () => {
    const { patient, documents } = this.context.attendance;
    return (
      <View style={styles.containerContent}>
        <Text style={styles.textName}>{patient.name}</Text>
        <Text style={styles.textBirthday}>{patient.birthdateAsString} | {patient.ageAsString}</Text>
        <FlatList
          data={documents}
          keyExtractor={item => item.ref}
          renderItem={this.renderDocument} />
      </View>
    );
  }

  renderDocument = ({ item }) =>
    <TouchableOpacity activeOpacity={0.5}
      onPress={item.signed ? null : () => this.openDocument(item)}>
      <View style={styles.containerTerm}>
        <Text style={styles.textNameTerm}>{item.title}</Text>
        <View style={[styles.containerStatus, item.signed ? styles.containerStatusGreen : styles.containerStatusRed]}>
          <Text style={[styles.textStatus, item.signed ? styles.textStatusGreen : styles.textStatusRed]}>
            {item.signed ? 'Assinado' : 'Pendente'}
          </Text>
        </View>
      </View>
      <Text>{'\n'}</Text>
    </TouchableOpacity>
}

const styles = {
  ...baseStyles,
  containerContent: {
    width: '90%',
    height: '90%',
    marginTop: '5%',
    marginLeft: '5%',
  },
  textName: {
    fontFamily: 'Roboto-Bold',
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#ffffff'
  },
  textBirthday: {
    marginTop: '1%',
    marginBottom: '6%',
    fontFamily: 'Roboto-Regular',
    fontSize: 24,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#ffffff'
  },
  containerTerm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '3%',
    height: 100,
    opacity: 0.5,
    borderRadius: 10,
    backgroundColor: '#70450e',
  },
  textNameTerm: {
    width: '70%',
    fontFamily: 'Roboto-Regular',
    fontSize: 24,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 1,
    textAlign: 'left',
    color: '#ffffff',
  },
  containerStatus: {
    height: '50%',
    width: '20%',
    marginLeft: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  containerStatusGreen: {
    backgroundColor: '#42fce9',
  },
  containerStatusRed: {
    backgroundColor: '#fca791',
  },
  textStatus: {
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: 22,
    letterSpacing: 1,
    textAlign: 'left',
  },
  textStatusGreen: {
    color: '#03664e'
  },
  textStatusRed: {
    color: '#a72b0a'
  },
}
