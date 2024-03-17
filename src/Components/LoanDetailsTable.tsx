import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';

import formatDate from '../helpers/formatDate';
import { LoanDetail } from '../Configs';

const LoanDetailsTable = ({ loanDetails,TotaloanDetails }: { loanDetails: LoanDetail[],TotaloanDetails:{payDuesAmount: number, payTotalAmount: number, payTotalInterest: number} }) => {
  // console.log(loanDetails.length);
  const renderRow = ({ item }: { item: LoanDetail }) => (
    <View key={item.Dues_num} style={styles.row}>
      <Text style={styles.cell}>{item.Dues_num}</Text>
      <Text style={styles.cell}>{item.Dues_amount}</Text>
      <Text style={styles.cell}>{item.Total_interest}</Text>
      <Text style={styles.cell}>{item.Total_amount}</Text>
      <Text style={styles.cell}>{formatDate(item.Start_date)}</Text>
      <Text style={styles.cell}>{item.StateId}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerCell}>#</Text>
        <Text style={styles.headerCell}>Capital</Text>
        <Text style={styles.headerCell}>Interés</Text>
        <Text style={styles.headerCell}>Cuota</Text>
        <Text style={styles.headerCell}>Fecha</Text>
        <Text style={styles.headerCell}>Estado</Text>
      </View>

      <FlatList
        data={loanDetails}
        renderItem={renderRow}
        keyExtractor={(item) => item.Dues_num.toString()}
        contentContainerStyle={{ flexGrow: 1 }} // Esto asegura que el contenido se expanda adecuadamente
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Total de capital: {TotaloanDetails.payTotalAmount}</Text>
        <Text style={styles.footerText}>Total de interes: {TotaloanDetails.payTotalInterest}</Text>
        <Text style={styles.footerText}>Total a Pagar: {TotaloanDetails.payTotalAmount + TotaloanDetails.payTotalInterest}</Text>

      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginBottom: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 5,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  footer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
    alignItems: 'center',
  },
  footerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoanDetailsTable;
