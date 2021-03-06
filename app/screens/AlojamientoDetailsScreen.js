import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import {Image, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {mapStyles, detailsScreenStyles} from '@styles/styles';
import AlojamientosFavService from '@services/AlojamientosFavService';
import CalificacionesService from '@services/CalificacionesService';
import Colors from '@styles/colors';
import IconButton from '@components/IconButton';

export default function AlojamientoDetailsScreen({navigation, route}) {
  const {item} = route.params;
  const [esFavorito, setEsFavorito] = useState(false);
  const [calificaciones, setCalificaciones] = useState([])
  const [alojamientosFavMeta] = AlojamientosFavService();
  const [calificacionesMeta] = CalificacionesService();

  const checkFav = async () => {
    let valor = await alojamientosFavMeta.esFavorito(item);
    setEsFavorito(valor);
  };

  const countCalificaciones = async () =>{
    let response = [];
    response[0] = await calificacionesMeta.countByComercioYCalificacion(item.comercio.id, 1);
    response[1] = await calificacionesMeta.countByComercioYCalificacion(item.comercio.id, 2);
    response[2] = await calificacionesMeta.countByComercioYCalificacion(item.comercio.id, 3);
    setCalificaciones(response);
  }

  useEffect(() => {
    checkFav();
    const unsubscribe = navigation.addListener('focus', () => {
      countCalificaciones();
    });
    return unsubscribe;
  }, [navigation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        esFavorito ? (
          <IconButton
            iconName="heart"
            iconSize={34}
            style={detailsScreenStyles.favBtn}
            onPress={() => {
              alojamientosFavMeta.eliminarFavorito(item);
              setEsFavorito(false);
            }}
          />
        ) : (
          <IconButton
            iconName="heart-outline"
            iconSize={34}
            style={detailsScreenStyles.favBtn}
            onPress={() => {
              alojamientosFavMeta.agregarFavorito(item);
              setEsFavorito(true);
            }}
          />
        ),
    });
  }, [navigation, esFavorito]);

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
          {item.comercio.foto ? (
            <Image
              source={{uri: item.comercio.foto}}
              style={detailsScreenStyles.mainImage}
              PlaceholderContent={<ActivityIndicator />}
            />
          ) : (
            <Image
              source={require('@resources/images/sin-foto.jpg')}
              style={detailsScreenStyles.mainImage}
              PlaceholderContent={<ActivityIndicator />}
            />
          )}
          {esFavorito && (
            <IconButton
              iconName="plus"
              iconSize={30}
              style={detailsScreenStyles.addRecuerdoBtn}
              onPress={() =>
                navigation.navigate('RecuerdosAlojamiento', {item: item})
              }
            />
          )}
          <Text h3 style={detailsScreenStyles.title}>
            {item.comercio.nombre}
          </Text>
          <Text style={detailsScreenStyles.clasificacion}>
            {item.clasificacion.nombre}
          </Text>
          <View style={detailsScreenStyles.subContainer}>
            {_renderEstrellas()}
          </View>
          <Text style={detailsScreenStyles.direccion}>
            {item.comercio.domicilio} - {item.comercio.localidad.nombre}
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
                latitude: item.comercio.lat,
                longitude: item.comercio.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Marker
                coordinate={{
                  latitude: item.comercio.lat,
                  longitude: item.comercio.lng,
                }}>
                <View
                  style={detailsScreenStyles.marker, 
                    {backgroundColor: Colors.HOTELGREEN,}}>
                  <Icon name="hotel" size={20} color="white" />
                </View>
              </Marker>
            </MapView>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center', margin: 10}}>Calificaciones: </Text>
            <TouchableOpacity style={{margin: 5, alignItems: 'flex-start', justifyContent:'center'}}
              onPress={() => navigation.navigate('Calificaciones', {item: item})}>
              <View style={{flexDirection: 'row', margin: 5}}>
                <Icon name="emoticon-happy-outline" size={30} color={Colors.LIGHTGREEN} />
                  <Text style={{margin: 5}}>Buenas: {calificaciones[0]}</Text>
              </View>
              <View style={{flexDirection: 'row', margin: 5}}>
                <Icon name="emoticon-neutral-outline" size={30} color={Colors.GOLD} />
                  <Text style={{margin: 5}}>Medio: {calificaciones[1]}</Text>
              </View>
              <View style={{flexDirection: 'row', margin: 5}}>
                <Icon name="emoticon-sad-outline" size={30} color={Colors.RED} />
                  <Text style={{margin: 5}}>Malas: {calificaciones[2]}</Text>
              </View>
              <Text style={{marginTop: 5, alignSelf: 'center', color: Colors.SKYBLUE}}>Ver más</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
