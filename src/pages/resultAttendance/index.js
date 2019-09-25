import React, { Component } from 'react';
import moment from 'moment';
import { View, Text, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

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
        <View style={ styles.containerTerm }>
            <Text style={ styles.textNameTerm }> { item.title } </Text>
            <View style={ item.signed ? styles.containerStatusTermGreen : styles.containerStatusTermRed }>
                <Text style={ item.signed ? styles.textStatusTermGreen : styles.textStatusTermRed }>
                    { item.signed ? 'Assinado' : 'Pendente' }
                </Text>
            </View>
        </View>
    );
    
    goBack = () => {
		this.props.navigation.navigate('SearchAttendance');
	}

    goToExit = () => {
        this.props.navigation.navigate('Login');
    }

    render() {
        console.log("patient=>", this.state.patient);
        console.log("documents=>", this.state.documents);

		return (
            <View style={ styles.container }>
                <ImageBackground source={require('../../../assets/images/general-background.png')} style={ styles.imgBackground }>
                    <View style={ styles.containerMenu }>
                        <TouchableOpacity style={ styles.containerIconsLeft } onPress={ this.goBack }>
                            <Icon type='MaterialCommunityIcons' name='arrow-left' style={ styles.imgExit } />
                        </TouchableOpacity>

                        <View style={ styles.containerIconsRight }>
                            <TouchableOpacity >
                                <Icon type='MaterialCommunityIcons' name='reload' style={ styles.imgExit } />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={ this.goToExit } style={ styles.containerIconsRight }>
                                <Text style={ styles.imgText }>Sair</Text>
                                <Icon type='MaterialIcons' name='exit-to-app' style={ styles.imgExit } />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={ styles.containerContent }>
                        <Text style={ styles.textName }> { this.state.patient ? this.state.patient.name : ''} </Text>
                        <Text style={ styles.textBirthday }> { this.renderBirthday() } </Text>
                        
                        <FlatList
                            // contentContainerStyle={baseStyles.container}
                            data={this.state.documents}
                            keyExtractor={item => `${item.ref}`}
                            renderItem={this.renderItem}
                        />

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
        flexDirection: 'row'
    },
    containerIconsLeft: {
        paddingLeft: '3%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderColor: 'black',
        borderWidth: 0
    },
    containerIconsRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
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
        color: 'white',
        marginRight: '5%',
        marginLeft: '1%'
    },
    imgText: {
        fontFamily: "Roboto-Light",
        fontSize: 12,
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
        fontSize: 15,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#ffffff"
    },
    textBirthday: {
        marginTop: '1%',
        fontFamily: "Roboto-Regular",
        fontSize: 12,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#ffffff"
    },
    containerTerm: {
        flexDirection: 'row',
        height: 50,
        marginTop: '5%',
        opacity: 0.5,
        borderRadius: 2.5,
        backgroundColor: "#70450e",
        borderColor: 'black',
        borderWidth: 0,
    },
    textNameTerm: {
        width: '70%',
        marginTop: '2%',
        marginLeft: '2%',
        fontFamily: "Roboto-Regular",
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 1,
        textAlign: "left",
        color: "#ffffff"
    },
    containerStatusTermGreen: {
        marginTop: '3%',
        marginLeft: '0%',
        height: 25,
        width: 85,
        borderColor: 'black',
        borderWidth: 0,
        paddingTop: '1.5%',
        paddingLeft: '4%',
        borderRadius: 2.5,
        backgroundColor: "#42fce9"
    },
    containerStatusTermRed: {
        marginTop: '3%',
        marginLeft: '0%',
        height: 25,
        width: 85,
        borderColor: 'black',
        borderWidth: 0,
        paddingTop: '1.5%',
        paddingLeft: '4%',
        borderRadius: 2.5,
        backgroundColor: "#fca791"
    },
    textStatusTermGreen: {
        fontFamily: "Roboto-Bold",
        fontSize: 12,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 1,
        textAlign: "left",
        color: "#03664e"
    },
    textStatusTermRed: {
        fontFamily: "Roboto-Bold",
        fontSize: 12,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 1,
        textAlign: "left",
        color: "#a72b0a"
    }
}