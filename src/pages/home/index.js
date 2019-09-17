import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
		return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Tela Unidades</Text>
                <Button title="Ir para Login" onPress={() => this.props.navigation.navigate('Login')} />
            </View>
        );
    }
}