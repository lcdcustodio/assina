import React, { Component } from 'react';
import { TouchableHighlight, View, Text, Button, ImageBackground, Image, TextInput } from 'react-native';
import { Icon } from 'native-base';

export default class SearchAttendance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            protocol: ""
        }
    }

    render(){
		return (
            <View style={ styles.container }>
                <ImageBackground source={require('../../../assets/images/general-background.png')} style={ styles.imgBackground }>
                    <View style={ styles.containerMenu }>
                        <View style={ styles.containerImgExit }>
                            <Text style={ styles.imgText }>Sair</Text>
                            <Icon type='MaterialIcons' name='exit-to-app' style={ styles.imgExit } />
                        </View>
                    </View>

                    <View style={ styles.containerForm }>
                        <Text style={ styles.title }> Pesquise o N° de Atendimento </Text>
                        <Text style={ styles.text }> Para ter acesso aos termos do paciente, pesquise pelo número de atendimento. </Text>
                        <TextInput placeholder='Pesquisar' placeholderTextColor="#707070" style={ styles.textInput } value={ this.state.protocol } onChangeText={protocol => this.setState({ protocol })} />

                        <View  style={ styles.containerButton }>
                            <TouchableHighlight style={ styles.button } onPress={() => this.props.navigation.navigate('ResultAttendance')}>
                                <Text style={ styles.textButton }>
                                    PESQUISAR
                                </Text>
                            </TouchableHighlight>
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
    },
    containerImgExit: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 0,
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
    containerForm: {
        marginLeft: '7.5%',
        width: '85%',
        marginTop: '10%',
        borderColor: 'black',
        borderWidth: 0,
        alignItems: 'center'
    },
    title: {
        fontFamily: "Roboto-Bold",
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#ffffff" 
    },
    text: {
        marginTop: '5%',
        fontFamily: "Roboto-Light",
        fontSize: 12,
        fontWeight: "300",
        fontStyle: "normal",
        letterSpacing: 0.01,
        textAlign: "center",
        color: "#ffffff" 
    },
    textInput: {
        marginTop: '10%',
        fontSize: 15,
        width: '100%',
        paddingLeft: '5%',
        borderRadius: 2.5,
        backgroundColor: "#efefef",
        color: "#707070"
    },
    containerButton: {
        marginTop: '10%',
        width: '100%'
    },
    button: {
        height: '33%',
        paddingTop: '2.5%',
        alignItems: 'center',
        borderRadius: 2.5,
        backgroundColor: '#957657'
    },
    textButton: {
        fontSize: 11,
        fontFamily: "Roboto-Bold",
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#FFFFFF"
    }
};