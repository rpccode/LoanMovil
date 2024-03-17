import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AuthContext, COLORS, loanWhitDues } from '../Configs';
import { calcularDetallesCuotas, formatDate } from '../helpers';
import LoanDetailsTable from '../Components/LoanDetailsTable';
import HeaderTitle from '../Components/HeaderTitle';
import ModalForm from '../Components/ModalForm';
import { generatePDF } from '../helpers/generatePDF';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import PreviewPDFScreen from './PreviewPDFScreen';

const CalculateScreen = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [loanDetails, setLoanDetails] = useState<loanWhitDues | null>(null);
    const [TotaloanDetails, setTotaLoanDetails] = useState<{ payDuesAmount: number, payTotalAmount: number, payTotalInterest: number }>({ payDuesAmount: 0, payTotalAmount: 0, payTotalInterest: 0 });
    const [pdfURI, setPdfURI] = useState('');
    const [showPDFPreview, setShowPDFPreview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        Amount: '',
        Dues: '',
        Interest: '',
        Frequency: '1'
    });
    const { user, token, logOut } = useContext(AuthContext);


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const handleInputChange = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const calculateLoan = async () => {
        setLoading(true);

        try {
            const calculatedLoan: loanWhitDues = {
                "loan": {
                    "LoanId": 1,
                    "TenantId": user?.TenantId || '',
                    "UserId": user?.UserId || '',
                    "infoId": 1,
                    "FrequencyId": parseInt(formData.Frequency),
                    "Amount": parseFloat(formData.Amount),
                    "Dues": parseInt(formData.Dues),
                    "Interest": parseFloat(formData.Interest),
                    "Start_date": "2024-01-27",
                    "StateId": 2,
                },
                "dues": []
            };

            const cuota = await calcularDetallesCuotas(calculatedLoan);
            setTotaLoanDetails({
                payDuesAmount: cuota.payDuesAmount,
                payTotalAmount: cuota.payTotalAmount,
                payTotalInterest: cuota.payTotalInterest
            })
            setLoanDetails({
                loan: calculatedLoan.loan,
                dues: cuota.cuotas
            });
        } catch (error) {
            console.error("Error calculating loan:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePDF = async () => {
        try {
            const pdfUri = await generatePDF(loanDetails); // Generar el PDF
            setPdfURI(pdfUri || '');
            setShowPDFPreview(true);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <View style={styles.container}>
            <HeaderTitle title='Calculadora de' name='Prestamos' color={COLORS.primary} bw={1} />
            <View style={styles.formContainer}>
                <Text>Frecuencia de Pago:</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={formData.Frequency}
                        style={styles.picker}
                        onValueChange={(itemValue) => handleInputChange('Frequency', itemValue.toString())}
                    >
                        <Picker.Item label="Semanal" value="1" />
                        <Picker.Item label="Quincenal" value="2" />
                        <Picker.Item label="Mensual" value="3" />
                        <Picker.Item label="Trimestral" value="4" />
                        <Picker.Item label="Semi Anual" value="5" />
                        <Picker.Item label="Anual" value="6" />
                    </Picker>
                </View>

                <Text>Loan Amount:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={formData.Amount}
                    onChangeText={(text) => handleInputChange('Amount', text)}
                />

                <Text>Number of Dues:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={formData.Dues}
                    onChangeText={(text) => handleInputChange('Dues', text)}
                />

                <Text>Interest Rate:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={formData.Interest}
                    onChangeText={(text) => handleInputChange('Interest', text)}
                />

                <Button title="Calculate Loan" onPress={calculateLoan} />
            </View>

            {loading && <ActivityIndicator size="large" color={COLORS.blue} />}
            {loanDetails && (
                <View style={styles.loanContainer}>
                    <View style={styles.loanItem}>
                        <Text style={styles.title}>Préstamo</Text>
                        <Text>Cantidad: {loanDetails.loan.Amount}</Text>
                        <Text>Fecha de inicio: {formatDate(loanDetails.loan.Start_date)}</Text>
                        <Text>Interés: {loanDetails.loan.Interest}%</Text>
                        <Text>Numero de Cuotas: {loanDetails.loan.Dues}</Text>
                    </View>

                    <Text>Cuotas:</Text>
                    <Button title="Visualizar Cuotas" onPress={toggleModal} />

                    <TouchableOpacity style={styles.button} onPress={handleCreatePDF}>
                        <Text>Create PDF</Text>
                    </TouchableOpacity>
                </View>
            )}
            <ModalForm isVisible={isModalVisible} onClose={toggleModal}>
                <LoanDetailsTable loanDetails={loanDetails?.dues || []} TotaloanDetails={TotaloanDetails} />
            </ModalForm>

            {showPDFPreview && (
    <PreviewPDFScreen
        pdfURI={pdfURI}
        onClose={() => setShowPDFPreview(false)}
    />
)}
        </View>
    );
};

const styles = StyleSheet.create({
    picker: {
        height: 50,
        width: 350,
    },
    button: {
        padding: 16,
        alignContent: 'center',
        backgroundColor: COLORS.red,
        borderColor: COLORS.primary,
        borderWidth: 1,
        color: COLORS.base
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: COLORS.blue,
        borderRadius: 6,
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: COLORS.blue,
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
        borderRadius: 6,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    formContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    loanContainer: {
        flex: 1,
        marginTop: 20,
    },
    loanItem: {
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
});

export default CalculateScreen;
