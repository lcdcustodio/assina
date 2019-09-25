import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableHighlight, View, Text, ImageBackground, Image } from 'react-native';
import { Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: 'admin',
            password: '123456'
        }
    }

    handleChange(evt, name) {
        const { text } = evt.nativeEvent;
        this.setState({ 
            [name]: text 
        });
    }

    handleLogin = async () => {
        if ( this.state.username.trim().length === 0 || this.state.password.trim().length === 0) {
            alert("Por favor, preencha todos os campos.");
        } else {
            const unitId = await AsyncStorage.getItem('hospitalSelectedId');
            console.log(unitId);
            if (unitId == null) {
                alert("Hospital selecionado não identificado.");
            } else {
                let data = {
                    'username': this.state.username,
                    'password': this.state.password,
                    'unit': {
                        'id': unitId
                    }
                }
    
                api.post('/login', data).then(async response => {
                    if(response.status == 200) {
                        await AsyncStorage.setItem('token', `${response.headers.authorization}` );
                        this.props.navigation.navigate('SearchAttendance');
                    } else {
                        alert("Falha na comunicação com o servidor, dados não reconhecidos.");
                    }
                }).catch( error => {
                    console.log("Error => ", error);
                    alert("Falha na comunicação com o servidor, favor verifar sua conexão com a internet.");
                });
            }
        }
        
    }

    render() {

		return (
            <View style={ styles.container }>
                <ImageBackground source={require('../../../assets/images/dfstar-background.png')} style={ styles.imgBackground }>
                    <View style={ styles.containerLogo }>
                        <Image source={require('../../../assets/images/assinaLogo.png')} style={ styles.imgLogo }/>
                    </View>

                    <View style={ styles.containerForm }>

                        <View style={ styles.inputGroup }>
                            <Text style={ styles.textLabel }>Usuário</Text>
                            <Item>
                                <Icon type='Feather' active name='user' color="#FFFFFF" size={25} />
                                <Input  style={ styles.textInput } 
                                        placeholder='seu.usuario' 
                                        value={ this.state.username } 
                                        placeholderTextColor="#FFFFFF" 
                                        autoCapitalize="none"
                                        autoCorrect={ false } 
                                        onChange={ (evt) => this.handleChange(evt, "username") } />
                            </Item>
                        </View>

                        <View style={ styles.inputGroup }>
                            <Text style={ styles.textLabel }>Senha</Text>
                            <Item>
                                <Icon type='Feather' active name='lock' color="#FFFFFF" size={25} />
                                <Input  style={ styles.textInput } 
                                        placeholder='******' 
                                        value={ this.state.password } 
                                        placeholderTextColor="#FFFFFF" 
                                        autoCapitalize="none" 
                                        autoCorrect={ false } 
                                        secureTextEntry 
                                        onChange={ (evt) => this.handleChange(evt, "password") } />
                            </Item>
                        </View>
                    </View>

                    <View  style={ styles.containerButton }>
                        <TouchableHighlight style={ styles.button } onPress={ this.handleLogin }>
                            <Text style={ styles.textButton }>
                                LOGIN
                            </Text>
                        </TouchableHighlight>
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
    containerLogo: {
        alignItems: 'center'
    },
    imgLogo: {
        marginTop: '10%'
    },
    containerForm: {
        width: '75%',
        height: '35%',
        marginTop: '15%',
        marginLeft: '12.5%',
        borderColor: 'black',
        borderWidth: 0,
        marginBottom: '5%'
    },
    inputGroup: {
        marginTop: '5%',
        marginBottom: '15%',
    },
    textLabel: {
        fontFamily: "Roboto-Bold",
        fontSize: 14,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#ffffff"
    },
    textInput: {
        marginLeft: '3%',
        opacity: 0.6,
        fontFamily: "Roboto",
        fontSize: 14,
        fontWeight: "300",
        fontStyle: "normal",
        lineHeight: 14,
        letterSpacing: 0.02,
        color: "#ffffff"
    },
    containerButton: {
        marginTop: '10%',
        marginLeft: '12.5%',
        width: '75%',
        
    },
    button: {
        padding: '5%',
        alignItems: 'center',
        borderRadius: 2.5,
        backgroundColor: '#FFFFFF'
    },
    textButton: {
        fontSize: 16,
        fontFamily: "Roboto-Bold",
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#957657"
    }
};