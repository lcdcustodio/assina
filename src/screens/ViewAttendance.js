import React from 'react';
import { Icon } from 'native-base';
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';

import AbstractScreen, { Loading, styles as baseStyles } from './AbstractScreen';
import { backgroundImage } from '../components/assets';
import api from '../services/api';

export default class ViewAttendance extends AbstractScreen {

  constructor(props) {
    super(props, { attendanceRef: null, attendance: null });
  }

  didFocus = this.props.navigation.addListener('didFocus', async (res) => {
    const { navigation } = this.props;
    await this.searchAttendance(navigation.getParam('attendanceRef'));
    navigation.getParam('stopLoading')();
  });

  refresh = () => {
    this.searchAttendance(this.state.attendanceRef);
  }

  searchAttendance = async (attendanceRef) => {
    this.isLoading = true;
    let attendance;
    try {
      attendance = await api.getAttendance(attendanceRef);
    } catch (apiError) {
      return this.handleApiError(apiError);
    }
    this.isLoading = false;
    this.setState({ attendanceRef, attendance });
  }

  openDocument = (documentRef) => {
    const { patient } = this.state.attendance;
    const stopLoading = () => this.isLoading = false;
    this.isLoading = true;
    this.props.navigation.navigate('SignDocument', { documentRef, patient, stopLoading });
  }

  render() {
    return (
      <View style={styles.container}>
        <Loading visible={this.isLoading} />
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.headerLeft} onPress={this.goBack}>
              <Icon type='MaterialCommunityIcons' name='arrow-left' style={styles.headerIcon} />
            </TouchableOpacity>
            <View style={styles.headerRight}>
              <TouchableOpacity style={[{ marginRight: '10%' }, styles.headerRight]} onPress={this.refresh}>
                <Icon type='MaterialCommunityIcons' name='reload' style={styles.headerIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerRight} onPress={this.goHome}>
                <Text style={styles.headerIconText}>Sair</Text>
                <Icon type='MaterialIcons' name='exit-to-app' style={styles.headerIcon} />
              </TouchableOpacity>
            </View>
          </View>
          {this.state.attendance && this.renderAttendance()}
        </ImageBackground>
      </View>
    );
  }

  renderAttendance = () => {
    const { patient, documents } = this.state.attendance;
    const { birthdate } = patient;
    const birthday = birthdate ? moment(birthdate).format('DD/MM/YYYY') : '';
    const age = birthdate ? moment().diff(birthdate, 'years') + ' anos' : '';
    return (
      <View style={styles.containerContent}>
        <Text style={styles.textName}>{patient.name}</Text>
        <Text style={styles.textBirthday}> {birthday} | {age}</Text>
        <FlatList
          data={documents}
          keyExtractor={item => item.ref}
          renderItem={this.renderAttendanceItem} />
      </View>
    );
  }

  renderAttendanceItem = ({ item }) =>
    <TouchableOpacity onPress={item.signed ? null : () => this.openDocument(item.ref)}>
      <View style={styles.containerTerm}>
        <Text style={styles.textNameTerm}>{item.title}</Text>
        <View style={item.signed ? styles.containerStatusTermGreen : styles.containerStatusTermRed}>
          <Text style={item.signed ? styles.textStatusTermGreen : styles.textStatusTermRed}>
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
  containerStatusTermGreen: {
    height: '50%',
    width: '20%',
    marginLeft: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#42fce9',
  },
  containerStatusTermRed: {
    height: '50%',
    width: '20%',
    marginLeft: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fca791',
  },
  textStatusTermGreen: {
    fontFamily: 'Roboto-Bold',
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 1,
    textAlign: 'left',
    color: '#03664e'
  },
  textStatusTermRed: {
    fontFamily: 'Roboto-Bold',
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 1,
    textAlign: 'left',
    color: '#a72b0a'
  },
}
