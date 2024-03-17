import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CreditCard = () => {
  return (
    <LinearGradient
      colors={['#ffcc00', '#ff6666']}  // Colores para el fondo degradado
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.creditCard}
    >

      <View style={styles.cardHeader}>
        {/* <Image style={styles.logo} source={require('./card-logo.png')} /> */}
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardNumber}>**** **** **** 1234</Text>
        <Text style={styles.cardHolder}>John Doe</Text>
        <Text style={styles.expires}>Expira: 12/23</Text>
      </View>



    </LinearGradient>
   
  );
};

const styles = StyleSheet.create({
  creditCard: {
    width: 350,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 40,
  },
  cardBody: {},
  cardNumber: {
    fontSize: 18,
    marginBottom: 15,
    color: '#333',
  },
  cardHolder: {
    fontSize: 14,
    marginBottom: 10,
    color: '#555',
  },
  expires: {
    fontSize: 14,
    color: '#555',
  },
});

export default CreditCard;
