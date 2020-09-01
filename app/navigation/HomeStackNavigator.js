import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@screens/HomeScreen';
import GastronomicosListScreen from '@screens/GastronomicosListScreen';
import GastronomicoDetailsScreen from '@screens/GastronomicoDetailsScreen';
import RecuerdosGastronomicoScreen from '@screens/RecuerdosGastronomicoScreen';
import AlojamientosListScreen from '@screens/AlojamientosListScreen';
import AlojamientoDetailsScreen from '@screens/AlojamientoDetailsScreen';
import RecuerdosAlojamientoScreen from '@screens/RecuerdosAlojamientoScreen';
import MapScreen from '@screens/MapScreen';
import ChatScreen from '@screens/ChatScreen';
import TurAppHeader from '@components/TurAppHeader';

const Stack = createStackNavigator();


export default function HomeStackNavigator(){
    return(
        <Stack.Navigator initialRouteName="Home"
            headerMode="screen">
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{header: TurAppHeader }}/>
            <Stack.Screen
                name="Alojamientos"
                component={AlojamientosListScreen} />
            <Stack.Screen
                name="AlojamientoDetails"
                component={AlojamientoDetailsScreen}
                options={({ route }) => ({ title: route.params.item.nombre })} />
            <Stack.Screen
                name="RecuerdosAlojamiento"
                component={RecuerdosAlojamientoScreen}
                options={() => ({ title: "Recuerdos"})} />
            <Stack.Screen
                name="Gastronomicos"
                component={GastronomicosListScreen} />
            <Stack.Screen
                name="GastronomicoDetails"
                component={GastronomicoDetailsScreen}
                options={({ route }) => ({ title: route.params.item.nombre })} />
            <Stack.Screen
                name="RecuerdosGastronomico"
                component={RecuerdosGastronomicoScreen}
                options={() => ({ title: "Recuerdos"})} />
            <Stack.Screen
                name="Mapa"
                component={MapScreen} />
            <Stack.Screen
                name="Chat"
                component={ChatScreen} />
        </Stack.Navigator>
    );
}