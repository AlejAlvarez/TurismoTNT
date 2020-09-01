import React from 'react';
import { View } from 'react-native';
import { Divider, Text } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { homeScreenStyles as Style } from '@styles/styles';
import HomeButtonCard from '@components/HomeButtonCard';

export default function HomeScreen({ navigation }) {
    return (
      <ScrollView>
        <View style={{ alignItems:'center', justifyContent:'center', marginTop:10 }}>
        </View>
        <Divider style={{ marginTop:12, marginBottom:15 }} />
        <View style={{ alignItems:'center', justifyContent:'center', marginBottom:10 }}>
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
                onPress={() => navigation.navigate('Chat')}>
                <HomeButtonCard  icon='chat' text='Chat' />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }