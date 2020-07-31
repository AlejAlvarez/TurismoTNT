import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavoritosListScreen from '@screens/FavoritosListScreen';
import GastronomicoDetailsScreen from '@screens/GastronomicoDetailsScreen';
import RecuerdosGastronomicoScreen from '@screens/RecuerdosGastronomicoScreen';
import AlojamientoDetailsScreen from '@screens/AlojamientoDetailsScreen';
import RecuerdosAlojamientoScreen from '@screens/RecuerdosAlojamientoScreen';

const Stack = createStackNavigator();


export default function FavoritosStackNavigator(){
    return(
        <Stack.Navigator initialRouteName="Home"
            headerMode="screen">
            <Stack.Screen
                name="FavoritosList"
                component={FavoritosListScreen}
                options={{title: "Tus Favoritos", headerTitleAlign: 'center', headerTitleStyle: { fontWeight: 'bold' } }}/>
            <Stack.Screen
                name="AlojamientoDetails"
                component={AlojamientoDetailsScreen}
                options={({ route }) => ({ title: route.params.item.nombre })} />
            <Stack.Screen
                name="RecuerdosAlojamiento"
                component={RecuerdosAlojamientoScreen}
                options={() => ({ title: "Recuerdos"})} />
            <Stack.Screen
                name="GastronomicoDetails"
                component={GastronomicoDetailsScreen}
                options={({ route }) => ({ title: route.params.item.nombre })} />
            <Stack.Screen
                name="RecuerdosGastronomico"
                component={RecuerdosGastronomicoScreen}
                options={() => ({ title: "Recuerdos"})} />
        </Stack.Navigator>
    );
}