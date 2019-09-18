import React, { Component } from 'react';
import { TouchableHighlight, View, Text, ImageBackground, Image } from 'react-native';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
		return (
            <View style={ styles.container }>
                <ImageBackground source={require('../../../assets/images/dfstar-background.png')} style={ styles.imgBackground }>
                    <View style={ styles.containerLogo }>
                        <Image source={require('../../../assets/images/assinaLogo.png')} style={ styles.imgLogo }/>
                    </View>

                    <View style={ styles.containerForm }>
                        <Text>Teste</Text>
                    </View>

                    <View  style={ styles.containerButton }>
                        <TouchableHighlight style={ styles.button } onPress={() => this.props.navigation.navigate('SearchAttendance')}>
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
        height: '50%',
        marginTop: '15%',
        marginLeft: '12.5%',
        borderColor: 'black',
        borderWidth: 1,
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