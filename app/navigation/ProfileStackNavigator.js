import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@screens/LoginScreen';
import RegisterScreen from '@screens/RegisterScreen';
import ProfileScreen from '@screens/ProfileScreen';

const Stack = createStackNavigator();


export default function ProfileStackNavigator(){
    return(
        <Stack.Navigator initialRouteName="Profile"
            headerMode="screen">
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{title: "Tu Perfil", headerTitleAlign: 'center', headerTitleStyle: { fontWeight: 'bold' } }} />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{title: "Inicio de Sesión", headerTitleAlign: 'center', headerTitleStyle: { fontWeight: 'bold' } }}/>
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{title: "Nuevo Usuario", headerTitleAlign: 'center', headerTitleStyle: { fontWeight: 'bold' } }} />
        </Stack.Navigator>
    );
}