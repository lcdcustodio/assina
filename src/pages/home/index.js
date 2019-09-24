import React, { Component } from 'react';
import { Button, View, Text, Picker, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hospitalSelected: null,
            hospitals: []
        }
        this.getUnits();
    }

    async getUnits() {
        api.get('/units').then(response => {
            this.setState({
                hospitals: response.data
            });
        }).catch( error => {
            console.log("Error => ", error);
            alert("Falha na comunicação com o servidor, favor verifar sua conexão com a internet.");
        });
    }

    handleUpdateUnit = async (hospitalSelected) => {
        this.setState({ hospitalSelected });
        await AsyncStorage.setItem('hospitalSelectedId', `${hospitalSelected}` );
    }

    unitList = () => {
        return( this.state.hospitals.map( (item, index) => { 
            return( <Picker.Item label={ item.name } key={ index } value={ item.id } />)
        }));
    }

    goToLogin = () => {
        if (this.state.hospitalSelected !== null) {
            this.props.navigation.navigate('Login');
        } else {
            alert("Selecione uma unidade.");
        }
    }

    render() {
		return (
            <View style={ styles.container }>
                <View style={ styles.containerTitle }>
                    <Text style={ styles.title }>Selecionar Unidade</Text>
                </View>
                
                <View  style={ styles.containerSelect }>
                    <Picker style={ styles.select } selectedValue={this.state.hospitalSelected} onValueChange={ this.handleUpdateUnit }>
                        <Picker.Item label='Unidade' value={ null } />
                        { this.unitList() }
                    </Picker>
                </View>

                <View  style={ styles.containerButton }>
                    <Button style={ styles.button } title='PROSSEGUIR' onPress={ this.goToLogin } color='#957657' />
                </View>

                <ImageBackground source={require('../../../assets/images/footerHome.png')} style={ styles.imgBackground }>
                    <View  style={ styles.footer }>
                        <Text style={ styles.footerTitle }>Selecione a sua Unidade</Text>
                        <Text style={ styles.footerText }>
                            Para fazer login e visualizar os termos, {'\n'}
                            você deve primeiro selecionar a sua unidade.
                        </Text>
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
    containerTitle: {
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Roboto-Bold',
        fontSize: 22,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        color: '#0a0819',
        marginTop: '30%'
    },
    containerSelect: {
        marginLeft: '12.5%',
        width: '75%',
        borderRadius: 2.5,
        backgroundColor: '#efefef',
        marginTop: '10%'
    },
    select: {
        marginLeft: '5%',
        fontFamily: 'Roboto-Bold',
        fontSize: 7,
        fontWeight: 'normal',
        fontStyle: 'normal',
        lineHeight: 13,
        letterSpacing: 0.08,
        textAlign: 'left',
        color: '#707070'
    },
    containerButton: {
        marginTop: '5%',
        marginLeft: '12.5%',
        width: '75%',
        borderRadius: 2.5
    },
    button: {
        fontFamily: "Roboto-Bold",
        fontSize: 8,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 9.5,
        letterSpacing: 0,
        textAlign: "left",
        color: "#ffffff"
    },
    imgBackground: {
        height: '73%',
        marginLeft: '-50%',
        marginRight: '-1%',
        borderColor: 'white',
        borderWidth: 0,
        alignItems: 'center',
	},
    footer: {
        marginLeft: '35%',
        marginTop: '35%',
        borderColor: 'white',
        borderWidth: 0,
    },
    footerTitle: {
        marginBottom: '5%',
        fontFamily: "Roboto-Bold",
        fontSize: 23,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 23,
        letterSpacing: 0.04,
        color: "#ffffff",
        textAlign: "center"
    },
    footerText: {
        marginTop: '5%',
        fontFamily: "Roboto-Light",
        fontSize: 16.5,
        fontWeight: "300",
        fontStyle: "normal",
        lineHeight: 16.5,
        letterSpacing: 0.03,
        color: "#ffffff",
        textAlign: "center"
    }
};