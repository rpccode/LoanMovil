import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginData, RegisterData, LoginResponse, UserResponse } from '../interfaces';
import { authReducer, AuthState } from '../Reducer/authReducer';
import axiosConfig from '../axiosConfig';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: UserResponse['User'] | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: (registerData: RegisterData) => void;
    signIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, authInitialState);

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        // console.log({token})
        if (!token) return dispatch({ type: 'notAuthenticated' });

        try {
            // console.log("entro en el try")
            const {data} = await axiosConfig.axiosInstance.get<UserResponse>('/auth');
            const {User, ok} = data
            // console.log(data)
          
            await AsyncStorage.setItem('token', User.token);
// console.log({User})
            dispatch({
                type: 'signUp',
                payload: {
                    token: User.token,
                    user: User
                }
            });
        } catch (error) {
            // console.log(error)
            dispatch({ type: 'notAuthenticated' });
        }
    }

    const signIn = async ({ email, password }: LoginData) => {
        // console.log({email, password});

        try {
         
            const {data} = await axiosConfig.axiosInstance.post<UserResponse>('/auth', {  email, password });
            // console.log(data)
            const {User, ok} = data
            // console.log(User)
            if(ok){
                dispatch({ type: 'signUp', payload: { token: User.token, user: User } });
                await AsyncStorage.setItem('token', User.token);
            }else{
                dispatch({ type: 'addError', payload: 'Usuario y/o Contrasena incorrectos' })
            }
        } catch (error) {
            // console.log({error})
            dispatch({ type: 'addError', payload:  'Información incorrecta'+error });
        }
    };

    const signUp = async ({ nombre, email, password }: RegisterData) => {
        try {
            const { data } = await axiosConfig.axiosInstance.post<LoginResponse>('/usuarios', { email, password, nombre });
            dispatch({ type: 'signUp', payload: { token: data.token, user: data.usuario } });
            await AsyncStorage.setItem('token', data.token);
        } catch (error) {
            dispatch({ type: 'addError', payload: error.response.data.errors[0].msg || 'Revise la información' });
        }
    };

    const logOut = async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout' });
    };

    const removeError = () => {
        dispatch({ type: 'removeError' });
    };

    return (
        <AuthContext.Provider value={{ ...state, signUp, signIn, logOut, removeError }}>
            {children}
        </AuthContext.Provider>
    )
}
