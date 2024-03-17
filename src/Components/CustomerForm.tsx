import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { useForm } from '../hooks';
import { checkInternetConnectivity } from '../helpers/checkInternetConnectivity';
import { checkApiAvailability } from '../helpers/checkApiAvailability';
import ErrorComponent from './ErrorComponent';

const CustomerForm = () => {
    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        DNI: '',
        TypeDNI: '',
        InfoTypeId: 4, // Valor predeterminado para InfoTypeId
    };
    const validationRules = {
        firstName: (value: string) => (!value ? 'El nombre es requerido' : null),
        lastName: (value: string) => (!value ? 'El apellido es requerido' : null),
        email: (value: string) => (!value ? 'El email es requerido' : null),
    };
    const [error, setError] = useState<string | null>(null);

    // Llama al hook useForm
    const { firstName,
        lastName,
        email,
        phoneNumber,
        DNI,
        TypeDNI,
        InfoTypeId, formState, onChange, validateField, validateForm } = useForm(initialState, validationRules);


     // Función para manejar el envío del formulario
     const handleSubmit = async () => {
        const errors = validateForm(); // Validar el formulario
        if (Object.keys(errors).length === 0) {
            try {
                // Verificar la conectividad a Internet
                const isConnected = await checkInternetConnectivity();
                if (!isConnected) {
                    setError('No hay conexión a Internet');
                    return;
                }

                // Verificar la disponibilidad de la API
                const isApiAvailable = await checkApiAvailability();
                if (!isApiAvailable) {
                    setError('La API no está disponible');
                    return;
                }

                // Si hay conectividad a Internet y la API está disponible, enviar el formulario
                console.log('Formulario válido:', formState);
                // Aquí puedes enviar los datos del formulario a tu servidor u otras acciones
            } catch (error) {
                setError('Error al verificar la conectividad o la disponibilidad de la API: ' + error);
            }
        }
    };
  return (
    <View>
       <Text style={styles.modalTitle}>Crear/Modificar Cliente</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre"
                        value={firstName.value}
                        onChangeText={(value) => onChange(value, 'firstName')}
                    />
                    {firstName.error && <Text style={styles.errorText}>{firstName.error}</Text>}
                    <TextInput
                        style={styles.input}
                        placeholder="Apellido"
                        onChangeText={(value) => onChange(value, 'lastName',)}
                        value={lastName.value}
                    />
                    {lastName.error && <Text style={styles.errorText}>{lastName.error}</Text>}
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email.value}
                        onChangeText={(value) => onChange(value, 'email')}
                    />
                    {email.error && <Text style={styles.errorText}>{email.error}</Text>}
                    <TextInput
                        style={styles.input}
                        placeholder="Teléfono"
                        value={phoneNumber.value}
                        onChangeText={(value) => onChange(value, 'phoneNumber')}
                    />
                    <View style={styles.select}>
                        <Picker
                            selectedValue={TypeDNI.value}

                            onValueChange={(itemValue: string) => onChange(itemValue, 'TypeDNI')}
                        >
                            <Picker.Item label="Tipo de DNI" value="" />
                            <Picker.Item label="Cedula" value="cedula" />
                            <Picker.Item label="Licencia" value="licencia" />
                            <Picker.Item label="Pasaporte" value="pasaporte" />

                            {/* Agrega más opciones según sea necesario */}
                        </Picker>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="DNI"
                        value={DNI.value}
                        onChangeText={(value) => onChange(value, 'DNI')}
                    />

                    <View style={styles.select}>
                        <Picker
                            selectedValue={InfoTypeId.value}

                            onValueChange={(itemValue) => onChange(itemValue, 'InfoTypeId')}
                        >
                            <Picker.Item label="Tipo de Información" value={3} />
                            <Picker.Item label="Administrador" value={3} />
                            <Picker.Item label="Cliente" value={4} />
                            <Picker.Item label="Invitado" value={5} />
                        </Picker>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Enviar</Text>
                    </TouchableOpacity>
                    {error && <ErrorComponent message={error} onClose={function (): void {
                    throw new Error('Function not implemented.');
                }} />}
    </View>
  )
}
const styles = StyleSheet.create({
  
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    select: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 2,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginBottom: 5,
    },
});


export default CustomerForm