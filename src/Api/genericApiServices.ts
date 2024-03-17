import axios from 'axios';
import Realm from 'realm';
import { realmConfig } from '../Configs';
import axiosConfig from '../Configs/axiosConfig';

interface IterableType {
    [Symbol.iterator]: () => Iterator<any>;
}

interface CRUDService {
    getAll: () => Promise<any[]>;
    getOne: (id: number) => Promise<any | null>;
    update: (id: number, newData: any) => Promise<boolean>;
    deleteOne: (id: number) => Promise<boolean>;
    InsertDataFromApi: (apiEndpoint: string, dataType: any,ite:string) => Promise<boolean>; 

}

function createCRUDService(tableName: string, filtered: string): CRUDService {
    return {
        getAll: async () => {
            let realm: Realm | null = null;
            try {
                realm = await initializeDatabase();
                const data = await getDataFromDB(realm, tableName);
                return data;
            } catch (error) {
                console.log(error);
                return [];
            } finally {
                if (realm !== null) {
                    realm.close();
                }
            }
        },
        getOne: async (id: number) => {
            let realm: Realm | null = null;
            try {
                realm = await initializeDatabase();
                const data = await getDataFromDB(realm, tableName);
                return data.find(item => item[filtered] === id) || null;
            } catch (error) {
                console.log(error);
                return null;
            } finally {
                if (realm !== null) {
                    realm.close();
                }
            }
        },
        update: async (id: number, newData: any) => {
            let realm: Realm | null = null;
            try {
                realm = await initializeDatabase();
                // Lógica para actualizar el elemento con el id proporcionado
                return true; // Suponiendo que la actualización se realiza correctamente
            } catch (error) {
                console.log(error);
                return false;
            } finally {
                if (realm !== null) {
                    realm.close();
                }
            }
        },
        deleteOne: async (id: number) => {
            let realm: Realm | null = null;
            try {
                realm = await initializeDatabase();
                // Lógica para eliminar el elemento con el id proporcionado
                return true; // Suponiendo que la eliminación se realiza correctamente
            } catch (error) {
                console.log(error);
                return false;
            } finally {
                if (realm !== null) {
                    realm.close();
                }
            }
        },
        InsertDataFromApi: async (apiEndpoint: string,dataType: any, ite: string) => {
            // console.log({apiEndpoint})
            let realm: Realm | null = null;
            try {
                // console.log({dataType,realm, tableName,apiEndpoint,filtered,ite})
                realm = await initializeDatabase();
                await insertDataFromAPI(dataType,realm, tableName,apiEndpoint,filtered,ite);
                return true;
            } catch (error) {
                console.log(error);
                return false;
            } finally {
                if (realm !== null) {
                    realm.close();
                }
            }
        }
    };
}

async function initializeDatabase(): Promise<Realm> {
    try {
        const realm = await Realm.open(realmConfig); // Utiliza la configuración de Realm desde realmConfig
        console.log('Database initialized successfully');
        return realm;
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

async function getDataFromDB(realm: Realm, tableName: string): Promise<any[]> {
    try {
        const data = realm.objects(tableName);
        return data.toJSON();
    } catch (error) {
        console.error(`Error al obtener datos de ${tableName}:`, error);
        throw error;
    }
}

function getDataByKey<T>(data: T, key: keyof T) {
    return data[key];
}
async function insertDataFromAPI<T extends IterableType>(dataType: T, realm: Realm, tableName: string, apiEndpoint: string, filtered: string,arr:keyof T): Promise<void> {
    try {
        // console.log({dataType})
        // console.log({apiEndpoint})
        // console.log(arr)
        const response = await axiosConfig.axiosInstance.get<typeof dataType>(apiEndpoint);
        const data = getDataByKey(response.data, arr) as T;
    //  console.log(data)

        realm.write(() => {
            for (const item of data) {
                const existingData = realm.objects(tableName).filtered(`${filtered} = "${item[filtered]}"`);
                if (existingData.length === 0) {
                    realm.create(tableName, { ...item }, Realm.UpdateMode.Never);
                }
            }
        });
        console.log('Datos insertados correctamente');
    } catch (error) {
        console.error('Error al obtener datos de la API o insertar en la base de datos:', error);
        throw error;
    }
}

export {
    initializeDatabase,
    createCRUDService
};
