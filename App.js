import 'react-native-gesture-handler';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from '@navigation/HomeStackNavigator';
import FavoritosStackNavigator from '@navigation/FavoritosStackNavigator';
import ProfileScreen from '@screens/ProfileScreen';
import TestsScreen from '@screens/TestsScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { initStorage } from '@services/Storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import AlojamientosReducer from '@redux/AlojamientosSlice';
import GastronomicosReducer from '@redux/GastronomicosSlice';
import FiltrosReducer from '@redux/FiltrosSlice';

initStorage();


const rootReducer = combineReducers({
  alojamientos: AlojamientosReducer,
  gastronomicos: GastronomicosReducer,
  filtros: FiltrosReducer,
});

const store = configureStore({reducer: rootReducer});


const Tab = createBottomTabNavigator();

console.disableYellowBox = true;

function App(){
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
        initialRouteName="Home">
            <Tab.Screen
            name="Home"
            component={HomeStackNavigator} 
            options={{
                tabBarLabel:"Inicio",          
                tabBarIcon: ({ color, size, focused }) => (
                    <MaterialCommunityIcons name="home" color={color} size={focused? 31: size} />
                  ),
            }}/>
            <Tab.Screen
            name="Favoritos" 
            component={FavoritosStackNavigator}
            options={{
                tabBarLabel:"Favoritos",          
                tabBarIcon: ({ color, size, focused }) => (
                    <MaterialCommunityIcons name="heart" color={color} size={focused? 31 : size} />
                  ),
            }}/>
            <Tab.Screen
            name="Tests"  // Esto antes era ProfileScreen 
            component={TestsScreen}
            options={{
                tabBarLabel:"Tests",
                tabBarIcon: ({ color, size, focused }) => (
                    <MaterialCommunityIcons name="account" color={color} size={focused? 31: size} />
                  ),
            }}/>
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
