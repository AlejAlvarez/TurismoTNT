import React, { useContext } from 'react';
import { View, Alert } from 'react-native';
import { Text } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { homeScreenStyles as Style } from '@styles/styles';
import HomeButtonCard from '@components/HomeButtonCard';
import UserContext from '@context/UserContext';

export default function HomeScreen({ navigation }) {
  const {usuario} = useContext(UserContext);
    return (
      <ScrollView style={{marginTop: '15%'}}>
        <View style={{ alignItems:'center', justifyContent:'center', marginBottom:'5%' }}>
          <Text>Seleccione una de las opciones para continuar</Text>
        </View>
        <View style={{flex: 1}}>
          <View style={Style.rowView}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Alojamientos')}>
                <HomeButtonCard  icon='hotel' text='Alojamientos' />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Gastronomicos')}>
                <HomeButtonCard  icon='local-dining' text='Gastronómicos' />
            </TouchableOpacity>
          </View>
          <View style={Style.rowView}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Mapa')}>
                <HomeButtonCard  icon='map' text='Mapa' />
            </TouchableOpacity>
            <TouchableOpacity                
                onPress={() => {
                  if (usuario == null) {
                    Alert.alert(
                      'Debe Identificarse',
                      'Por favor, inice sesión para acceder al chat.',
                      [
                        {
                          text: 'Cancel',
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: () => navigation.navigate('Login')},
                      ],
                    );
                  } else {
                    navigation.navigate('Chat');
                  }}
                }>
                <HomeButtonCard  icon='chat' text='Chat' />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }