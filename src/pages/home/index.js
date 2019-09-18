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
            <View style={ styles.container }>
                <View style={ styles.containerTitle }>
                    <Text style={ styles.title }>Selecionar Unidade</Text>
                </View>
                <Button title="Ir para Login" onPress={() => this.props.navigation.navigate('Login')} />
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
    }
};