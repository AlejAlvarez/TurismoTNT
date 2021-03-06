import 'react-native-gesture-handler';
import React, { useState, useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from '@navigation/HomeStackNavigator';
import FavoritosStackNavigator from '@navigation/FavoritosStackNavigator';
import ProfileStackNavigator from '@navigation/ProfileStackNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { initStorage } from '@services/Storage';
import UserContext from '@context/UserContext';
import { ApolloProvider } from "@apollo/client";
import { client } from '@graphql/client';


initStorage();

const Tab = createBottomTabNavigator();

console.disableYellowBox = true;

function App(){
  // Aca si le damos el valor por defecto
  const [usuario, setUsuario] = useState(null);
  const providerValue = useMemo(() => ({usuario, setUsuario}), [usuario, setUsuario]);

  return (
    <UserContext.Provider value={providerValue}>
      <ApolloProvider client={client}>
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
              name="Perfil"  // Esto antes era ProfileScreen 
              component={ProfileStackNavigator}
              options={{
                  tabBarLabel:"Perfil",
                  tabBarIcon: ({ color, size, focused }) => (
                      <MaterialCommunityIcons name="account" color={color} size={focused? 31: size} />
                    ),
              }}/>
          </Tab.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </UserContext.Provider>
  );
}

export default App;
