import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../Configs';
import { LoginScreen, ProtectedScreen, RegisterScreen } from '../Modules/Auth';
import Tabs from '../Components/Tab';
import CalculateScreen from '../Modules/CalculateScreen';


const Stack = createStackNavigator();

export const Navigator = () => {

  const { status } = useContext(AuthContext);
  // console.log(status)
  // if ( status === 'checking' ) return <LoadingScreen />

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >

      {
        (status !== 'authenticated')
          ? (
            <>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            </>
          )
          : (
            <>
              <Stack.Screen name="HomeTabs" component={Tabs} />

              <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
              <Stack.Screen name="Calculate" component={CalculateScreen} />
             
              {/* <Stack.Screen name="Customer" component={ CustomerScreen } />
            <Stack.Screen name="DetalleCliente" component={ CustomerPerfileScreen } />
            <Stack.Screen name="HomeTabs" component={BottomNavbar} /> */}


            </>

          )
      }

    </Stack.Navigator>
  );
}