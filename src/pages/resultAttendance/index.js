import React, { Component } from 'react';
import { Button, View, Text, ImageBackground } from 'react-native';
import { Icon } from 'native-base';

export default class ResultAttendance extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
		return (
            <View style={ styles.container }>
                <ImageBackground source={require('../../../assets/images/general-background.png')} style={ styles.imgBackground }>
                    <View style={ styles.containerMenu }>
                        <View style={ styles.containerIconsLeft }>
                            <Icon type='MaterialCommunityIcons' name='arrow-left' style={ styles.imgExit } />
                        </View>

                        <View style={ styles.containerIconsRight }>
                            <Icon type='MaterialCommunityIcons' name='reload' style={ styles.imgExit } />
                            <Text style={ styles.imgText }>Sair</Text>
                            <Icon type='MaterialIcons' name='exit-to-app' style={ styles.imgExit } />
                        </View>
                    </View>

                    <View style={ styles.containerContent }>
                        <Text style={ styles.textName }>Layssa Belfort Rizzi Ximenes</Text>
                        <Text style={ styles.textBirthday }>11/09/1989 | 30 Anos</Text>

                        <View style={ styles.containerTerm }>
                            <Text style={ styles.textNameTerm }>Termo 123456</Text>
                            <View style={ styles.containerStatusTermGreen }>
                                <Text style={ styles.textStatusTermGreen }>Assinado</Text>
                            </View>
					    </View>

                        <View style={ styles.containerTerm }>
                            <Text style={ styles.textNameTerm }>Termo 123456</Text>
                            <View style={ styles.containerStatusTermRed }>
                                <Text style={ styles.textStatusTermRed }>Pendente</Text>
                            </View>
					    </View>

                        <View style={ styles.containerTerm }>
                            <Text style={ styles.textNameTerm }>Termo 123456</Text>
                            <View style={ styles.containerStatusTermRed }>
                                <Text style={ styles.textStatusTermRed }>Pendente</Text>
                            </View>
					    </View>

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
        marginTop: '4%',
        marginLeft: '5%',
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
        marginLeft: '35%',
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
        marginLeft: '35%',
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