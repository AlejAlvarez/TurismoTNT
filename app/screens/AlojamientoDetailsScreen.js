import React, {useState, useEffect} from 'react';
import {View, ScrollView, ActivityIndicator, TouchableOpacity} from 'react-native';
import {Image, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {mapStyles, detailsScreenStyles} from '@styles/styles';
import AlojamientosFavService from '@services/AlojamientosFavService';
import Colors from '@styles/colors';

export default function AlojamientoDetailsScreen({navigation, route}) {
  const {item} = route.params;
  const [esFavorito, setEsFavorito] = useState(false);
  const [alojamientosFavMeta] = AlojamientosFavService();


  const checkFav = async () => {
    let valor = await alojamientosFavMeta.esFavorito(item); 
    setEsFavorito(valor);
  };

  useEffect(() => {
    checkFav();
  }, []);

  const _renderEstrellas = () => {
    let myloop = [];

    if (item.categoria.valor == 0) {
      return <Text style={{color: Colors.GOLD}}>Categoría Única</Text>;
    } else {
      for (let i = 0; i < item.categoria.valor; i++) {
        myloop.push(<Icon name="star" size={15} color={Colors.GOLD} />);
      }
    }
    return myloop;
  };

  return (
    <ScrollView>
      <View style={{flex: 1}}>
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
          <View style={detailsScreenStyles.subContainer}>{_renderEstrellas()}</View>
          <TouchableOpacity
            style={detailsScreenStyles.favBtn}
            onPress={() => {
              if(esFavorito){
                alojamientosFavMeta.eliminarFavorito(item);
                setEsFavorito(false);
              }else{
                alojamientosFavMeta.agregarFavorito(item);
                setEsFavorito(true);
              }
            }}>
            {esFavorito ? <Icon name="heart" size={30} /> : <Icon name="heart-outline" size={30} />}
          </TouchableOpacity>
          <Text style={{padding: 5}}>
            {item.domicilio} - {item.localidad.nombre}
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
                  latitude: item.lat,
                  longitude: item.lng,
                }}>
                <View
                  style={{
                    backgroundColor: '#40E9A4',
                    padding: 5,
                    borderRadius: 10,
                    elevation: 3,
                    shadowRadius: 2,
                    shadowColor: 'black',
                    shadowOffset: {width: 10, height: 10},
                  }}>
                  <Icon name="hotel" size={20} color="white" />
                </View>
              </Marker>
            </MapView>
          </View>
        </View>
        {esFavorito && 
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
          <TouchableOpacity 
            style={detailsScreenStyles.button}
            onPress={() => navigation.navigate('RecuerdosAlojamiento', { item: item })}>
            <Text style={detailsScreenStyles.buttonText}>* Ver Recuerdos *</Text>
          </TouchableOpacity>
        </View>}
      </View>
    </ScrollView>
  );
}

