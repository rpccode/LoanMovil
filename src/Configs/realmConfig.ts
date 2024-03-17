// realmConfig.ts
import Realm from 'realm';

// Define el esquema de la base de datos
export const CustomerSchema: Realm.ObjectSchema = {
  name: 'Customer',
  primaryKey: 'InfoId',
  properties: {
    InfoId: { type: 'int', indexed: true },
    TenantId: { type: 'string' },
    InfoTypeId: { type: 'int' },
    TypeDNI: { type: 'string' },
    DNI: { type: 'string', indexed: true },
    FirstName: { type: 'string' },
    LastName: { type: 'string' },
    AddressID: { type: 'int', optional: true },
    Telefono: { type: 'string' },
    Email: { type: 'string' },
    Position: { type: 'int', optional: true },
    state: { type: 'bool', default: true },
    LoadedFromAPI: { type: 'bool', default: true },
  },
};

// Define el esquema de la base de datos de Realm para LoanDetail
export const LoanDetailSchema: Realm.ObjectSchema = {
  name: 'LoanDetail',
  primaryKey: 'id',
  properties: {
      id:{ type: 'int', indexed: true },
      LoanId: { type: 'int'},
      TenantId: { type: 'string' },
      Dues_num: { type: 'int' },
      Dues_amount: { type: 'float' },
      Total_amount: { type: 'float' },
      Total_interest: { type: 'float' },
      Start_date: { type: 'date' },
      StateId: { type: 'int' },
      LoadedFromAPI: { type: 'bool', default: true }
  }
};
// Define el esquema de la base de datos de Realm para LoanHeader
export const LoanHeaderSchema: Realm.ObjectSchema = {
  name: 'LoanHeader',
  primaryKey: 'LoanId',
  properties: {
      LoanId: { type: 'int', indexed: true },
      TenantId: { type: 'string' },
      UserId: { type: 'string' },
      infoId: { type: 'int' },
      FrequencyId: { type: 'int' },
      Amount: { type: 'float' },
      Dues: { type: 'int' },
      Interest: { type: 'float' },
      Start_date: { type: 'date' },
      StateId: { type: 'int' },
      LoadedFromAPI: { type: 'bool', default: true }
  }
};

// Define el esquema de la base de datos de Realm para Payment
export const PaymentSchema: Realm.ObjectSchema = {
  name: 'Payment',
  primaryKey: 'paymentId',
  properties: {
      paymentId: { type: 'int', indexed: true },
      LoanId: { type: 'int' },
      TenantId: { type: 'string' },
      UserId: { type: 'string' },
      PaymentNumber: { type: 'int', optional: true },
      Balance: { type: 'float' },
      Capital: { type: 'float' },
      Interest: { type: 'float' },
      Dues: { type: 'float' },
      Payment_amount: { type: 'float' },
      StateId: { type: 'int' },
     
  }
};
// Exporta la configuración de la base de datos
export const realmConfig = {
  schema: [CustomerSchema,LoanDetailSchema,LoanHeaderSchema],
  schemaVersion: 11
};

export const deleteAllData = async () => {
  const realm = new Realm(realmConfig)
  try {
      // Inicia una transacción
      realm.write(() => {
          // Obtén todos los objetos de todas las colecciones y elimínalos
          realm.deleteAll();
      });
      console.log('Todos los datos han sido eliminados correctamente');
  } catch (error) {
      console.error('Error al eliminar todos los datos:', error);
  }
};