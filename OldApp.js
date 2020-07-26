import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TurAppLogoTitle from '@components/TurAppLogoTitle';
import PrincipalTabNavigator from '@navigation/PrincipalTabNavigator';

const Stack = createStackNavigator();

function App() {
  return ( 
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerTitle: props => <TurAppLogoTitle/>,
          headerTitleAlign: 'center' }}
          initialRouteName="Navigation"
          headerMode="screen">
        <Stack.Screen name="Navigation" component={PrincipalTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;