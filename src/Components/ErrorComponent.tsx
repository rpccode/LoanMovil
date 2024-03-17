import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ErrorComponentProps {
    message: string;
    onClose: () => void;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message, onClose }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>{message}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffcccc',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    message: {
        flex: 1,
        color: '#ff0000',
    },
    closeButton: {
        marginLeft: 10,
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#ff0000',
    },
    closeButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});

export default ErrorComponent;
