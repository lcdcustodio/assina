import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableHighlight, View, Text, ImageBackground, Image } from 'react-native';
import { Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: 'admin',
            password: '123456',
            hospitalSelected: this.props.navigation.getParam('hospitalSelected'),
            loading: false,
            textContent: 'Aguarde...'
        }
    }

    didFocus = this.props.navigation.addListener('didFocus', async (res) => {
        this.setState({
            hospitalSelected: this.props.navigation.getParam('hospitalSelected')
        })
    });

    handleChange(evt, name) {
        const { text } = evt.nativeEvent;
        this.setState({ 
            [name]: text 
        });
    }

    handleLogin = async () => {
        this.setState({ loading: true });

        if ( this.state.username.trim().length === 0 || this.state.password.trim().length === 0) {
            alert("Por favor, preencha todos os campos.");
            this.setState({ loading: false });
        } else {
            if (this.state.hospitalSelected == null) {
                alert("Hospital selecionado não identificado.");
                this.setState({ loading: false });
            } else {
                let data = {
                    'username': this.state.username,
                    'password': this.state.password,
                    'unit': {
                        'id': this.state.hospitalSelected.id
                    }
                }
                
                api.post('/login', data).then(async response => {
                    this.setState({ loading: false });
                    if(response.status == 200) {
                        await AsyncStorage.setItem('token', `${response.headers.authorization}` );
                        this.props.navigation.navigate('SearchAttendance');
                    } else {
                        alert("Falha na comunicação com o servidor, dados não reconhecidos.");
                    }
                }).catch( error => {
                    this.setState({ loading: false });
                    console.log("Error => ", error);
                    alert("Falha na comunicação com o servidor, favor verifar sua conexão com a internet.");
                });
            }
        }
    }

    getBackground() {
        if(this.state.hospitalSelected && this.state.hospitalSelected.id === 1) {
            return require('../../../assets/images/vila-nova-background.jpg');
        } else if(this.state.hospitalSelected && this.state.hospitalSelected.id === 2) {
            return require('../../../assets/images/dfstar-background.png');
        }
    }

    render() {
        return (
            <View style={ styles.container }>
                <Spinner visible={ this.state.loading } textContent={ this.state.textContent } textStyle={ styles.spinnerTextStyle } />
                <ImageBackground source={ this.getBackground() } style={ styles.imgBackground }>
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
                        <TouchableHighlight style={ styles.button } onPress={ this.handleLogin } underlayColor="#ffffff">
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
        marginTop: '5%'
    },
    containerForm: {
        width: '75%',
        height: '35%',
        marginTop: '10%',
        marginLeft: '12.5%',
        borderColor: 'black',
        borderWidth: 0,
        marginBottom: '5%'
    },
    inputGroup: {
        marginTop: '5%',
        marginBottom: '10%',
    },
    textLabel: {
        fontFamily: "Roboto-Bold",
        fontSize: 30,
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
        fontSize: 30,
        fontWeight: "300",
        fontStyle: "normal",
        letterSpacing: 0.02,
        color: "#ffffff"
    },
    containerButton: {
        marginTop: '5%',
        marginLeft: '12.5%',
        width: '75%',
        
    },
    button: {
        padding: '5%',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#FFFFFF'
    },
    textButton: {
        fontSize: 30,
        fontFamily: "Roboto-Bold",
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#957657"
    },
    spinnerTextStyle: {
	    color: '#ffffff'
	}
};