/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {  useColorScheme,} from 'react-native';
import {  Colors,} from 'react-native/Libraries/NewAppScreen';
import { AuthProvider } from './src/Configs';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/Navigations/Navigator';

const AppState = ({ children }: any) => {
  return (

    <AuthProvider>
      {/* <CustomerProvider> */}
        {children}
      {/* </CustomerProvider> */}
    </AuthProvider>



  )
}



function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer >
    <AppState>
      <Navigator />
    </AppState>
  </NavigationContainer>
  );
}



export default App;
