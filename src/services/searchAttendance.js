import api from './api';
import AsyncStorage from '@react-native-community/async-storage';

export async function search(protocol, navigation, callback) {

    if ( protocol.trim().length === 0) {
        alert("Por favor, preencha o número de atendimento.");
        callback();
    } else {
        const token = await AsyncStorage.getItem('token');
        api.get(`/attendance/${protocol}`, { headers: { Authorization: token }}).then(async response => {
            callback();
            if(response.status == 200) {
                if(response.data.patient && response.data.documents) {
                    navigation.navigate('ResultAttendance', { patient: response.data.patient, documents: response.data.documents });
                }
            } else {
                alert("Falha na comunicação com o servidor, dados não reconhecidos.");
            }
        }).catch( error => {
            callback();
            console.log("Error => ", error);
            alert("Falha na comunicação com o servidor, favor verifar sua conexão com a internet.");
        });
    }
}