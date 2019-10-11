import api from './api';
import AsyncStorage from '@react-native-community/async-storage';

export async function getTermHTML(termNumber, navigation, callback) {

    if ( termNumber.trim().length === 0) {
        alert("Por favor, informe o número do termo.");
        callback();
    } else {
        const token = await AsyncStorage.getItem('token');
        api.get(`/documents/${termNumber}/unsigned`, { headers: { Authorization: token }}).then(async response => {
            
            if(response.status == 200) {
                if(response.data) {
                    callback(response.data);
                    //navigation.navigate('ResultAttendance', { patient: response.data.patient, documents: response.data.documents });
                }
            } else {
                callback();
                alert("Falha na comunicação com o servidor, dados não encontrados.");
            }
        }).catch( error => {
            callback();
            console.log("Error => ", error);
            alert("Falha na comunicação com o servidor, favor verifar sua conexão com a internet.");
        });
    }
}