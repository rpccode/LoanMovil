import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const ModalForm = ({ isVisible, onClose, children }: { isVisible: boolean; onClose: () => void; children?: React.ReactNode }) => {
  

   
    return (
        <Modal visible={isVisible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {children}
                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
              
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 10,
        width: '90%',
        height:'90%'
    },
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

export default ModalForm;
