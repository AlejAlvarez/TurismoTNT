import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/HomeScreen';
import DetailsScreen from '@screens/DetailsScreen';
import ProfileScreen from '@screens/ProfileScreen';
import FavouritesScreen from '@screens/FavouritesScreen';
import GastronomicosScreen from '@screens/GastronomicosScreen';
import AlojamientosScreen from '@screens/AlojamientosScreen';
import MapScreen from '@screens/MapScreen';
import SearchScreen from '@screens/SearchScreen';

const Tab = createBottomTabNavigator();

export default function NavigationScreen(){
    return (
        <Tab.Navigator
        initialRouteName="Home"
        headerMode="screen">
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Details" component={DetailsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Favourites" component={FavouritesScreen} />
            <Tab.Screen name="Gastronomicos" component={GastronomicosScreen} />
            <Tab.Screen name="Alojamientos" component={AlojamientosScreen} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
        </Tab.Navigator>        
    );
}