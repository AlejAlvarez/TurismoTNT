import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@screens/HomeScreen';
import GastronomicosListScreen from '@screens/GastronomicosListScreen';
import GastronomicosFilterScreen from '@screens/GastronomicosFilterScreen';
import GastronomicoDetailsScreen from '@screens/GastronomicoDetailsScreen';
import AlojamientosListScreen from '@screens/AlojamientosListScreen';
import AlojamientosFilterScreen from '@screens/AlojamientosFilterScreen';
import AlojamientoDetailsScreen from '@screens/AlojamientoDetailsScreen';
import MapScreen from '@screens/MapScreen';
import SearchScreen from '@screens/SearchScreen';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import DEFAULT_IP from '@resources/IPConfig';
import TurAppHeader from '@components/TurAppHeader';

const Stack = createStackNavigator();

const client = new ApolloClient({
    uri: `http://${DEFAULT_IP}:8080/v1/graphql`,
  });


export default function HomeStackNavigator(){
    return(
        <ApolloProvider client={client}>
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
                    name="AlojamientosFilter"
                    component={AlojamientosFilterScreen} />
                <Stack.Screen
                    name="AlojamientoDetails"
                    component={AlojamientoDetailsScreen}
                    options={({ route }) => ({ title: route.params.item.nombre })} />
                <Stack.Screen
                    name="Gastronomicos"
                    component={GastronomicosListScreen} />
                <Stack.Screen
                    name="GastronomicosFilter"
                    component={GastronomicosFilterScreen} />
                <Stack.Screen
                    name="GastronomicoDetails"
                    component={GastronomicoDetailsScreen}
                    options={({ route }) => ({ title: route.params.item.nombre })} />
                <Stack.Screen
                    name="Mapa"
                    component={MapScreen} />
                <Stack.Screen
                    name="Search"
                    component={SearchScreen} />        
            </Stack.Navigator>
        </ApolloProvider>
    );
}