import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

export default class SearchAttendance extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
		return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Tela Pesquisa</Text>
                <Button title="Ir para Resultado" onPress={() => this.props.navigation.navigate('ResultAttendance')} />
            </View>
        );
    }
}