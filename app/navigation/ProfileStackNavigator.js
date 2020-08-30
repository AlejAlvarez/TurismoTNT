import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@screens/LoginScreen';
import RegisterScreen from '@screens/RegisterScreen';
import ProfileScreen from '@screens/ProfileScreen';

const Stack = createStackNavigator();


export default function ProfileStackNavigator(){
    return(
        <Stack.Navigator initialRouteName="Login"
            headerMode="screen">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{title: "Login", headerTitleAlign: 'center', headerTitleStyle: { fontWeight: 'bold' } }}/>
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={() => ({ title: 'Registro' })} />
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={() => ({ title: "Perfil"})} />
        </Stack.Navigator>
    );
}