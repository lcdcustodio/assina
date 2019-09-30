import React, { Component } from 'react';
import { TouchableHighlight, View, Text, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { Icon } from 'native-base';
import { search } from '../../services/searchAttendance';
import Spinner from 'react-native-loading-spinner-overlay';

export default class SearchAttendance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            protocol: '3051240',
            loading: false,
            textContent: 'Aguarde...'
        }
    }

    handleChange(evt, name) {
        const { text } = evt.nativeEvent;
        this.setState({ 
            [name]: text 
        });
    }

    initializeSearch = async () => {
        this.setState({ loading: true });
        await search(this.state.protocol, this.props.navigation, this.hideLoading);
    }

    hideLoading = () => {
        this.setState({ loading: false });
    }

    goToExit = () => {
        this.props.navigation.navigate('Login');
    }

    render() {
		return (
            <View style={ styles.container }>
                <Spinner visible={ this.state.loading } textContent={ this.state.textContent } textStyle={ styles.spinnerTextStyle } />
                <ImageBackground source={require('../../../assets/images/general-background.png')} style={ styles.imgBackground }>
                    <View style={ styles.containerMenu }>
                        <TouchableOpacity style={ styles.containerImgExit } onPress={ this.goToExit }>
                            <Text style={ styles.imgText }>Sair</Text>
                            <Icon type='MaterialIcons' name='exit-to-app' style={ styles.imgExit } />
                        </TouchableOpacity>
                    </View>

                    <View style={ styles.containerForm }>
                        <Text style={ styles.title }> Pesquise o N° de Atendimento </Text>
                        <Text style={ styles.text }> Para ter acesso aos termos do paciente, pesquise pelo número de atendimento. </Text>
                        <TextInput  style={ styles.textInput }
                                    placeholder='Pesquisar' 
                                    placeholderTextColor="#707070"  
                                    value={ this.state.protocol } 
                                    autoCapitalize="none"
                                    autoCorrect={ false } 
                                    onChange={ (evt) => this.handleChange(evt, "protocol") } />

                        <View  style={ styles.containerButton }>
                            <TouchableHighlight style={ styles.button } onPress={ this.initializeSearch } underlayColor="#957657">
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
        fontSize: 40,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#ffffff" 
    },
    text: {
        marginTop: '5%',
        fontFamily: "Roboto-Light",
        fontSize: 22,
        fontWeight: "300",
        fontStyle: "normal",
        letterSpacing: 0.01,
        textAlign: "center",
        color: "#ffffff" 
    },
    textInput: {
        marginTop: '10%',
        fontSize: 22,
        width: '100%',
        height: '13%',
        paddingLeft: '5%',
        borderRadius: 10,
        backgroundColor: "#efefef",
        color: "#707070"
    },
    containerButton: {
        marginTop: '10%',
        width: '100%'
    },
    button: {
        height: '33%',
        paddingTop: '3%',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#957657'
    },
    textButton: {
        fontSize: 22,
        fontFamily: "Roboto-Bold",
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#FFFFFF"
    },
    spinnerTextStyle: {
	    color: '#ffffff'
	}
};