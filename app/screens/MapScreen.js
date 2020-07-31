import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Button, Text, Overlay } from 'react-native-elements';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';
import AlojamientosService from '@services/AlojamientosService';
import GastronomicosService from '@services/GastronomicosService';
import LocalidadesService from '@services/LocalidadesService';
import ClasificacionesService from '@services/ClasificacionesService';
import CategoriasService from '@services/CategoriasService';
import EspecialidadesService from '@services/EspecialidadesService';
import ActividadesService from '@services/ActividadesService';
import {mapStyles} from '@styles/styles';
import Colors from '@styles/colors';

check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
  .then(result => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.warn(
          'Esta función no se encuentra disponible en este dispositivo',
        );
        break;
      case RESULTS.DENIED:
        console.log('Solicitando permiso ACCESS_FINE_LOCATION...');
        request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
          if (result == RESULTS.GRANTED) {
            console.log('Permiso otorgado por el usuario!');
          } else {
            console.warn('Permiso denegado');
          }
        });
        break;
      case RESULTS.GRANTED:
        console.log('El permiso ya se encuentra otorgado');
        break;
      case RESULTS.BLOCKED:
        console.warn(
          'El permiso se encuentra bloqueado. No puede volver a solicitarse.',
        );
        break;
    }
  })
  .catch(error => {
    console.log('Error en chequeo de permisos');
  });

const initialPosition = {
  latitude: -54.7999968,
  longitude: -68.2999988,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function MapScreen({navigation}) {
  const [alojamientosMeta] = AlojamientosService();
  const [gastronomicosMeta] = GastronomicosService();
  const [localidadesMeta] = LocalidadesService();
  const [clasificacionesMeta] = ClasificacionesService();
  const [categoriasMeta] = CategoriasService();
  const [especialidadesMeta] = EspecialidadesService();
  const [actividadesMeta] = ActividadesService();
  const [currentPosition, setCurrentPosition] = useState(initialPosition);
  const [item, setItem] = useState(null);
  const [activeMarker, setActiveMarker] = useState(false);
  const [isVisibleOverlay, setIsVisibleOverlay] = useState(false);
  const [localidad, setLocalidad] = useState(1);
  const [clasificacion, setClasificacion] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const [actividad, setActividad] = useState(null);
  const [especialidad, setEspecialidad] = useState(null);


  const getAlojamientos = () => {
    let alojamientos = alojamientosMeta.data;
    if (localidad != null){
        alojamientos = alojamientos.filter((alojamiento) => alojamiento.localidad.id == localidad);
    };
    if (clasificacion != null){
        alojamientos = alojamientos.filter((alojamiento) => alojamiento.clasificacion.id == clasificacion);
    };
    if (categoria != null){
        alojamientos = alojamientos.filter((alojamiento) => alojamiento.categoria.id == categoria);
    };
    return alojamientos;
  };

  const getGastronomicos = () => {
    let gastronomicos = gastronomicosMeta.data;
    if (localidad != null){
      gastronomicos = gastronomicos.filter((gastronomico) => gastronomico.localidade?.id == localidad);
    };
    if (actividad != null){
      const checkAct = (item) => item.actividade.id === actividad;
      gastronomicos = gastronomicos.filter((gastronomico) => gastronomico.actividad_gastronomicos?.some(checkAct));
    };
    if (especialidad != null){
      const checkEsp = (item) => item.especialidade.id === especialidad;
      gastronomicos = gastronomicos.filter((gastronomico) => gastronomico.especialidad_gastronomicos?.some(checkEsp));
    };
    return gastronomicos;
  };

  const verDetalles = item => {
    setActiveMarker(false);
    item.categoria? navigation.navigate('AlojamientoDetails', {item: item})
      : navigation.navigate('GastronomicoDetails', {item: item});
  }

  useEffect(() => {
    // Conseguimos la posicion desde donde se esta conectando
    Geolocation.getCurrentPosition(
      position => {
        const {longitude, latitude} = position.coords;
        setCurrentPosition({
          ...currentPosition,
          latitude,
          longitude,
        });
      },
      error => alert(error.message),
      {timeout: 15000, maximumAge: 10000},
    );
  }, []);

  return (
    <View style={mapStyles.container}>
      {(alojamientosMeta.isLoading || gastronomicosMeta.isLoading) ? (
        <ActivityIndicator style={{flex: 1}} animating size="large" />
      ) : (alojamientosMeta.isError || gastronomicosMeta.isError) ? (
        <Text>Error...</Text>
      ) : (
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={mapStyles.map}
          showsUserLocation
          initialRegion={currentPosition}>
          {getAlojamientos().map(item => (
            <Marker
              coordinate={{
                latitude: item.lat,
                longitude: item.lng,
              }}
              onPress={event => {
                event.stopPropagation();
                setActiveMarker(true);
                setItem(item);
              }}>
              <View
                style={{
                  backgroundColor: Colors.LIGHTGREEN,
                  padding: 5,
                  borderRadius: 10,
                  elevation: 3,
                  shadowRadius: 2,
                  shadowColor: 'black',
                  shadowOffset: {width: 10, height: 10},
                }}>
                <Icon name="hotel" size={15} color="white" />
              </View>
            </Marker>
          ))}
          {getGastronomicos().map(gastronomico => (
            <Marker
              coordinate={{
                latitude: gastronomico.lat,
                longitude: gastronomico.lng,
              }}
              onPress={event => {
                event.stopPropagation();
                setActiveMarker(true);
                setItem(gastronomico);
              }}>
              <View
                style={{
                  backgroundColor: Colors.GOLD,
                  padding: 5,
                  borderRadius: 10,
                  elevation: 3,
                  shadowRadius: 2,
                  shadowColor: 'black',
                  shadowOffset: {width: 10, height: 10},
                }}>
                <Icon name="food-fork-drink" size={15} color="white" />
              </View>
            </Marker>
          ))}
        </MapView> 
      )}
      <TouchableOpacity
        style={mapStyles.filterBtn}
        onPress={() => setIsVisibleOverlay(true)}>
          <Icon
            name="magnify"
            size={30}
          />
      </TouchableOpacity>
      <Overlay
        isVisible={activeMarker}
        onBackdropPress={() => setActiveMarker(false)}
        overlayStyle = {{height:420, width:280}}>
        { activeMarker && 
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.WHITE }}>
          { item.foto ? (
            <Image
              source={{ uri: item.foto }}
              style={{ width:250, height:200, padding: 10 }}
              PlaceholderContent={<ActivityIndicator />}
            />) : (
            <Image
              source={require('@resources/images/sin-foto.jpg')}
              style={{ width:350, height:200, padding: 10 }}
              PlaceholderContent={<ActivityIndicator />}              
            />
          )}
          <Text h3 style={{padding: 10}}>{item.nombre}</Text>
          <TouchableOpacity
            style={mapStyles.button}
            onPress={() => verDetalles(item)}>
              <Text style={mapStyles.buttonText}>Ver Más</Text>
          </TouchableOpacity>
        </View>}
      </Overlay>

      <Overlay
          isVisible={isVisibleOverlay}
          onBackdropPress={() => setIsVisibleOverlay(false)}
          overlayStyle = {{height:520, width:300}}>
          <Text h3>Filtros</Text>
          <Text>Selecione una Localidad</Text>
          <RNPickerSelect
              style={{width: '50%', backgroundColor: 'lightyellow'}}
              onValueChange={(value) => {
                  setLocalidad(value);
              }}
              items={localidadesMeta.data.map(localidad => ({label: localidad.nombre, value: localidad.id}))}
              value={localidad}
              placeholder={{label: "Todas", value: null}}/>
          <Text h4>Alojamientos</Text>
          <Text>Selecione una Clasificacion</Text>
          <RNPickerSelect
              style={{width: '50%', backgroundColor: 'lightyellow'}}
              onValueChange={(value) => {
                  setClasificacion(value);
              }}
              items={clasificacionesMeta.data.map(clasificacion => ({label: clasificacion.nombre, value: clasificacion.id}))}
              value={clasificacion}
              placeholder={{label: "Todas", value: null}}/>
          <Text>Selecione una Categoria</Text>
          <RNPickerSelect
              style={{width: '50%', backgroundColor: 'lightyellow'}}
              onValueChange={(value) => {
                  setCategoria(value);
              }}
              items={categoriasMeta.data.map(categoria => ({label: categoria.estrellas, value: categoria.id}))}
              value={categoria}
              placeholder={{label: "Todas", value: null}}/>
          <Text h4>Gastronomicos</Text>
        <Text>Selecione una Actividad</Text>
        <RNPickerSelect
            style={{width: '50%', backgroundColor: 'lightyellow'}}
            onValueChange={(value) => {
                setActividad(value);
            }}
            items={especialidadesMeta.data.map(especialidad => ({label: especialidad.nombre, value: especialidad.id}))}
            value={actividad}
            placeholder={{label: "Todas", value: null}}/>
        <Text>Selecione una Especialidad</Text>
        <RNPickerSelect
            style={{width: '50%', backgroundColor: 'lightyellow'}}
            onValueChange={(value) => {
                setEspecialidad(value);
            }}
            items={actividadesMeta.data.map(actividad => ({label: actividad.nombre, value: actividad.id}))}
            value={especialidad}
            placeholder={{label: "Todas", value: null}}/>
        <Button
            title="Aceptar"
            onPress={() => {
            setIsVisibleOverlay(false);
            }}/>
      </Overlay>
    </View>
  );
}
