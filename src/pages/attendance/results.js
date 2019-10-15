import moment from 'moment';
import { Icon } from 'native-base';
import React from 'react';
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from 'react-native';

import AbstractPage, { Loading } from '../AbstractPage';
import api from '../../services/api';

export default class AttendanceResultsPage extends AbstractPage {

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      attendanceRef: null,
      attendance: null,
    }
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
    } catch (apiException) {
      return this.handleApiException(apiException);
    }
    this.isLoading = false;
    this.setState({ attendanceRef, attendance });
  }

  openDocument = (documentRef) => {
    this.isLoading = true;
    const stopLoading = () => this.isLoading = false;
    this.props.navigation.navigate('Document', { documentRef, stopLoading });
  }

  render() {
    return (
      <View style={styles.container}>
        <Loading visible={this.isLoading} />
        <ImageBackground source={require('../../../assets/images/general-background.png')} style={styles.imgBackground}>
          <View style={styles.containerMenu}>
            <TouchableOpacity style={styles.containerIconsLeft} onPress={this.goBack}>
              <Icon type='MaterialCommunityIcons' name='arrow-left' style={styles.imgExit} />
            </TouchableOpacity>
            <View style={styles.containerIconsRight}>
              <TouchableOpacity style={[{ marginRight: '10%' }, styles.containerIconsRight]} onPress={this.refresh}>
                <Icon type='MaterialCommunityIcons' name='reload' style={styles.imgExit} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.containerIconsRight} onPress={this.goHome}>
                <Text style={styles.imgText}>Sair</Text>
                <Icon type='MaterialIcons' name='exit-to-app' style={styles.imgExit} />
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
    <TouchableOpacity onPress={() => this.openDocument(item.ref)}>
      <View style={styles.containerTerm}>
        <Text style={styles.textNameTerm}> {item.title} </Text>
        <View style={item.signed ? styles.containerStatusTermGreen : styles.containerStatusTermRed}>
          <Text style={item.signed ? styles.textStatusTermGreen : styles.textStatusTermRed}>
            {item.signed ? 'Assinado' : 'Pendente'}
          </Text>
        </View>
      </View>
      <Text>{"\n"}</Text>
    </TouchableOpacity>
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  imgBackground: {
    width: '100%',
    height: '100%'
  },
  containerMenu: {
    height: '6%',
    paddingTop: '2%',
    borderColor: 'black',
    borderWidth: 0,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 0,
  },
  containerIconsLeft: {
    paddingLeft: '3%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    borderColor: 'black',
    borderWidth: 0,
    marginRight: '55%'
  },
  containerIconsRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
    borderColor: 'black',
    borderWidth: 0,
  },
  iconBack: {
    color: 'white',
    marginRight: '5%',
    marginLeft: '1%',
    justifyContent: 'flex-start',
  },
  imgExit: {
    fontSize: 40,
    color: 'white',
    marginRight: '5%',
    marginLeft: '1%'
  },
  imgText: {
    fontFamily: "Roboto-Light",
    fontSize: 24,
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0.01,
    textAlign: "center",
    color: "#ffffff"
  },
  containerContent: {
    width: '90%',
    height: '90%',
    marginTop: '5%',
    marginLeft: '5%',
    borderColor: 'black',
    borderWidth: 0,
  },
  textName: {
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff"
  },
  textBirthday: {
    marginTop: '1%',
    marginBottom: '3%',
    fontFamily: "Roboto-Regular",
    fontSize: 24,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff"
  },
  containerTerm: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    opacity: 0.5,
    borderRadius: 10,
    backgroundColor: "#70450e",
    borderColor: 'black',
    borderWidth: 0,
  },
  textNameTerm: {
    paddingLeft: '1%',
    width: '70%',
    fontFamily: "Roboto-Regular",
    fontSize: 28,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 1,
    textAlign: "left",
    color: "#ffffff",
    borderColor: 'black',
    borderWidth: 0,
  },
  containerStatusTermGreen: {
    paddingTop: '0.8%',
    height: '50%',
    width: '20%',
    marginLeft: '5%',
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#42fce9",
    borderColor: 'black',
    borderWidth: 0,
  },
  containerStatusTermRed: {
    paddingTop: '0.8%',
    height: '50%',
    width: '20%',
    marginLeft: '5%',
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#fca791",
    borderColor: 'black',
    borderWidth: 0,
  },
  textStatusTermGreen: {
    fontFamily: "Roboto-Bold",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 1,
    textAlign: "left",
    color: "#03664e"
  },
  textStatusTermRed: {
    fontFamily: "Roboto-Bold",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 1,
    textAlign: "left",
    color: "#a72b0a"
  },
  spinnerTextStyle: {
    color: '#ffffff'
  }
}