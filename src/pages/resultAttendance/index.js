import React, { Component } from 'react';
import moment from 'moment';
import { View, Text, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import { Icon,  List } from 'native-base';

export default class ResultAttendance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patient: null,
            documents: null
        }
    }

    didFocus = this.props.navigation.addListener('didFocus', (res) => {
        const patient = this.props.navigation.getParam('patient');
        const documents = this.props.navigation.getParam('documents');

        this.setState({
            patient,
            documents
        });
    });

    renderBirthday() {
        if(this.state.patient) {
            let birthday = this.state.patient.birthdate ? moment(this.state.patient.birthdate).format('DD/MM/YYYY') : '';
            let yearsOld = this.state.patient.birthdate ? moment().diff(this.state.patient.birthdate, 'years') + ' anos': '';
    
            return (
                <Text style={ styles.textBirthday }> {birthday} | {yearsOld}</Text>
            );
        }
    }

    renderItem = ({ item }) => (
        <View>
            <View style={ styles.containerTerm }>
                <Text style={ styles.textNameTerm }> { item.title } </Text>
                <View style={ item.signed ? styles.containerStatusTermGreen : styles.containerStatusTermRed }>
                    <Text style={ item.signed ? styles.textStatusTermGreen : styles.textStatusTermRed }>
                        { item.signed ? 'Assinado' : 'Pendente' }
                    </Text>
                </View>
            </View>
            <Text> {"\n"} </Text>
        </View>
        
    );
    
    goBack = () => {
		this.props.navigation.navigate('SearchAttendance');
	}

    goToExit = () => {
        this.props.navigation.navigate('Login');
    }

    render() {

		return (
            <View style={ styles.container }>
                <ImageBackground source={require('../../../assets/images/general-background.png')} style={ styles.imgBackground }>
                    <View style={ styles.containerMenu }>
                        <TouchableOpacity style={ styles.containerIconsLeft } onPress={ this.goBack }>
                            <Icon type='MaterialCommunityIcons' name='arrow-left' style={ styles.imgExit } />
                        </TouchableOpacity>

                        <View style={ styles.containerIconsRight }>
                            <TouchableOpacity style={[ {marginRight: '10%'}, styles.containerIconsRight ]}>
                                <Icon type='MaterialCommunityIcons' name='reload' style={ styles.imgExit } />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={ this.goToExit } style={styles.containerIconsRight}>
                                <Text style={ styles.imgText }>Sair</Text>
                                <Icon type='MaterialIcons' name='exit-to-app' style={ styles.imgExit } />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={ styles.containerContent }>
                        <Text style={ styles.textName }> { this.state.patient ? this.state.patient.name : ''} </Text>
                        <Text style={ styles.textBirthday }> { this.renderBirthday() } </Text>
                        

                        {/* <View style={{ height: '20%'}}> */}

                            <FlatList
                                
                                data={this.state.documents}
                                keyExtractor={item => `${item.ref}`}
                                renderItem={this.renderItem}
                            />
                        {/* </View> */}
                        

                    </View>

                </ImageBackground>
            </View>
        );
    }
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
        height: '50%',
        width: '20%',
        marginLeft: '5%',
        alignItems: "center",
        justifyContent: "center",
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
    }
}