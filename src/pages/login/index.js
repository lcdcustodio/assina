import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
		return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Tela Login</Text>
                <Button title="Ir para Pesquisa" onPress={() => this.props.navigation.navigate('SearchAttendance')} />
            </View>
        );
    }
}