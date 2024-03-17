import React, { useContext } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../../Configs';
import { formatID, formatPhoneNumber } from '../../helpers/utils';


export const ProtectedScreen = () => {

    const { user, token, logOut } = useContext( AuthContext );
    const infoId =user?.infoId

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil de Usuario</Text>

          

            <View style={styles.userInfo}>
                <Text style={styles.label}>Nombre Completo:</Text>
                <Text>{user?.infoId.FirstName}{" "}{infoId?.LastName}</Text>
            </View>

            <View style={styles.userInfo}>
                <Text style={styles.label}>Correo Electrónico:</Text>
                <Text>{user?.Email}</Text>
            </View>

            <View style={styles.userInfo}>
                <Text style={styles.label}>Telefono:</Text>
                <Text>{formatPhoneNumber(infoId?.Telefono || '')}</Text>
            </View>

            <View style={styles.userInfo}>
                <Text style={styles.label}>Tipo de DNI:</Text>
                <Text>{infoId?.TypeDNI}</Text>
            </View>

            <View style={styles.userInfo}>
                <Text style={styles.label}>DNI:</Text>
                <Text>{formatID(infoId?.DNI || '')}</Text>
            </View>
            <Button 
                title="Cerrar Sesión"
                color="#5856D6"
                onPress={logOut}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    userInfo: {
        marginTop: 10,
        marginBottom: 20,
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5
    }
});