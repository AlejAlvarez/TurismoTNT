import React, {useState, useEffect} from 'react';
import {View, ScrollView, ActivityIndicator, TouchableOpacity} from 'react-native';
import {Image, Text, Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {mapStyles, detailsScreenStyles} from '@styles/styles';
import GastronomicosFavService from '@services/GastronomicosFavService';
import Colors from '@styles/colors';

export default function GastronomicoDetailsScreen({ navigation, route }) {
  const { item } = route.params;
  const [esFavorito, setEsFavorito] = useState(false);
  const [gastronomicosFavMeta] = GastronomicosFavService();

  const checkFav = async () => {
    let valor = await gastronomicosFavMeta.esFavorito(item); 
    setEsFavorito(valor);
  };

  useEffect(() => {
    checkFav();
  }, []);

  const _renderActividades = () => {
    let myloop = [];

    item.actividad_gastronomicos.forEach(actividad_gastronomico => {
      myloop.push(
        <Text style={{color: Colors.GREEN}}> -{actividad_gastronomico.actividade.nombre}- </Text>
      );
    });

    return myloop;

  };

  const _renderEspecialidades = () => {
    let myloop = [];

    item.especialidad_gastronomicos.forEach(especialidad_gastronomico => {
      myloop.push(
        <Text style={{color: Colors.ORANGE}}> -{especialidad_gastronomico.especialidade.nombre}- </Text>
      );
    });

    return myloop;
  };

  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
          <View style={detailsScreenStyles.container}>
            { item.foto ? (
              <Image
                source={{ uri: item.foto }}
                style={{ width:350, height:200 }}
                PlaceholderContent={<ActivityIndicator />}
              />) : (
              <Image
                source={require('@resources/images/sin-foto.jpg')}
                style={{ width:350, height:200 }}
                PlaceholderContent={<ActivityIndicator />}              
              />
            )}
            <Text h3 style={{padding: 10}}>{item.nombre}</Text>
            <Text>Actividades: </Text>
            <View style={detailsScreenStyles.subContainer}>
              {_renderActividades()}
            </View>
            <Text>Especialidades: </Text>
            <View style={detailsScreenStyles.subContainer}>
              {_renderEspecialidades()}
            </View>
            <TouchableOpacity
              style={detailsScreenStyles.favBtn}
              onPress={() => {
                if(esFavorito){
                  gastronomicosFavMeta.eliminarFavorito(item);
                  setEsFavorito(false);
                }else{
                  gastronomicosFavMeta.agregarFavorito(item);
                  setEsFavorito(true);
                }
              }}>
              {esFavorito ? <Icon name="heart" size={30} /> : <Icon name="heart-outline" size={30} />}
            </TouchableOpacity>
            <Text style={{paddingTop: 15}}>
              {item.domicilio} - {item.localidade?.nombre}
            </Text>
            <View style={mapStyles.smallContainer}>
              <MapView 
                  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                  style={mapStyles.map}
                  scrollEnabled={false}
                  zoomEnabled={false}
                  zoomControlEnabled={false}
                  minZoomLevel={13}
                  region={{
                    latitude: item.lat,
                    longitude: item.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}>
                    <Marker
                    coordinate={{
                      latitude:item.lat,
                      longitude:item.lng
                    }}>
                      <View style={{ backgroundColor: Colors.GOLD, padding: 5, borderRadius: 10, elevation: 3, shadowRadius: 2, shadowColor: 'black', shadowOffset: { width: 10, height: 10 } }}>
                        <Icon name="food-fork-drink" size={20} color="white" />
                      </View>
                    </Marker>
                </MapView>
            </View>
          </View>
        {esFavorito && 
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
          <TouchableOpacity 
            style={detailsScreenStyles.button}
            onPress={() => navigation.navigate('RecuerdosGastronomico', { item: item })}>
            <Text style={detailsScreenStyles.buttonText}>* Ver Recuerdos *</Text>
          </TouchableOpacity>
        </View>}
      </View>      
    </ScrollView>
  );
}
