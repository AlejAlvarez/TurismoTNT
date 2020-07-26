import 'react-native-gesture-handler';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from '@navigation/HomeStackNavigator';
import ProfileScreen from '@screens/ProfileScreen';
import FavouritesScreen from '@screens/FavouritesScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { initStorage } from '@services/Storage';
// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { Provider } from 'react-redux';
// import AlojamientosReducer from '@redux/AlojamientosSlice';

initStorage();


// const rootReducer = combineReducers({
//   alojamientos: AlojamientosReducer,
// });

// const store = configureStore({reducer: rootReducer});
// <Provider store={store}>

// </Provider>

const Tab = createBottomTabNavigator();

function App(){
  return (
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
          name="Favourites" 
          component={FavouritesScreen}
          options={{
              tabBarLabel:"Favoritos",          
              tabBarIcon: ({ color, size, focused }) => (
                  <MaterialCommunityIcons name="heart" color={color} size={focused? 31 : size} />
                ),
          }}/>
          <Tab.Screen
          name="Profile" 
          component={ProfileScreen}
          options={{
              tabBarLabel:"Perfil",          
              tabBarIcon: ({ color, size, focused }) => (
                  <MaterialCommunityIcons name="account" color={color} size={focused? 31: size} />
                ),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
