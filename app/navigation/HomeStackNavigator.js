import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@screens/HomeScreen';
import GastronomicosListScreen from '@screens/GastronomicosListScreen';
import GastronomicoDetailsScreen from '@screens/GastronomicoDetailsScreen';
import RecuerdosGastronomicoScreen from '@screens/RecuerdosGastronomicoScreen';
import AlojamientosListScreen from '@screens/AlojamientosListScreen';
import AlojamientoDetailsScreen from '@screens/AlojamientoDetailsScreen';
import RecuerdosAlojamientoScreen from '@screens/RecuerdosAlojamientoScreen';
import LoginScreen from '@screens/LoginScreen';
import RegisterScreen from '@screens/RegisterScreen';
import MapScreen from '@screens/MapScreen';
import ChatScreen from '@screens/ChatScreen';
import CalificacionesScreen from '@screens/CalificacionesScreen';
import TurAppTitleLogo from '@components/TurAppTitleLogo';
import IconButton from '@components/IconButton';
import { homeScreenStyles } from '@styles/styles';

const Stack = createStackNavigator();


export default function HomeStackNavigator(){
    return(
        <Stack.Navigator initialRouteName="Home"
            headerMode="screen">
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={({navigation}) => ({
                  headerTitle: () => <TurAppTitleLogo/>,
                  headerTitleAlign: 'center',
                  headerRight: () => <IconButton iconName="chat" iconSize={30} style={homeScreenStyles.chatBtn}
                  onPress={() => navigation.navigate('Chat')}/>})}/>
            <Stack.Screen
                name="Alojamientos"
                component={AlojamientosListScreen} />
            <Stack.Screen
                name="AlojamientoDetails"
                component={AlojamientoDetailsScreen}
                options={({ navigation, route }) => ({ title: route.params.item.comercio.nombre })} />
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
                options={({ navigation, route }) => ({title: route.params.item.comercio.nombre})} />
            <Stack.Screen
                name="RecuerdosGastronomico"
                component={RecuerdosGastronomicoScreen}
                options={() => ({ title: "Recuerdos"})} />
            <Stack.Screen
                name="Calificaciones"
                component={CalificacionesScreen}
                options={({route}) => ({ title: route.params.item.comercio.nombre })} />
            <Stack.Screen
                name="Mapa"
                component={MapScreen} />
            <Stack.Screen
                name="Chat"
                component={ChatScreen} />
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