import React, { Component } from 'react';
import { Button, View, Text, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import { Content, Picker } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';

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
                    <Picker mode="dropdown"
                            iosHeader="Selecione a sua Unidade"
                            headerBackButtonText="Voltar"
                            style={ styles.select }
                            textStyle={{
                                fontFamily: 'Roboto-Bold',
                                fontSize: 24,
                                color: '#707070',
                            }}
                            iosIcon={<Icon name="chevron-down" />} 
                            selectedValue={this.state.hospitalSelected} 
                            onValueChange={ this.handleUpdateUnit } >

                        <Picker.Item label='Unidade' value={ null } />
                        { this.unitList() }
                    </Picker>
                </View>
                

                <View  style={ styles.containerButton }>
                    <Button style={ styles.button } title='PROSSEGUIR' onPress={ this.goToLogin } color='#FFFFFF' />
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
        alignItems: 'center',
    },
    title: {
        marginTop: '20%',
        fontFamily: 'Roboto-Bold',
        fontSize: 37,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        color: '#0a0819',
    },
    containerSelect: {
        marginTop: '10%',
        paddingTop: '3.8%',
        marginLeft: '12.5%',
        width: '75%',
        height: '7%',
        borderRadius: 10,
        backgroundColor: '#efefef',
        borderColor: 'black',
        borderWidth: 0,
        justifyContent: 'center',
    },
    select: {
        marginLeft: '3%',
        marginRight: '3%'
    },
    containerButton: {
        marginTop: '3%',
        paddingTop: '1.2%',
        marginLeft: '12.5%',
        width: '75%',
        height:'4%',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#957657',
        fontFamily: "Roboto-Bold",
        fontSize: 50,
    },
    button: {
        marginTop: '4%',
        fontFamily: "Roboto-Bold",
        fontSize: 30,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
    },
    imgBackground: {
        height: '73%',
        marginTop: '14%',
        marginLeft: '-15%',
        marginRight: '-1%',
        borderColor: 'white',
        borderWidth: 0,
        alignItems: 'center',
	},
    footer: {
        marginTop: '30%',
        marginLeft: '15%',
        borderColor: 'white',
        borderWidth: 0,
    },
    footerTitle: {
        marginBottom: '2.5%',
        fontFamily: "Roboto-Bold",
        fontSize: 46,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0.04,
        color: "#ffffff",
        textAlign: "center"
    },
    footerText: {
        marginTop: '2.5%',
        fontFamily: "Roboto-Light",
        fontSize: 30,
        fontWeight: "300",
        fontStyle: "normal",
        letterSpacing: 0.03,
        color: "#ffffff",
        textAlign: "center"
    }
};