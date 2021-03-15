import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Button, Text, Overlay, SearchBar} from 'react-native-elements';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';
import AlojamientosService from '@services/AlojamientosService';
import GastronomicosService from '@services/GastronomicosService';
import AlojamientosFavService from '@services/AlojamientosFavService';
import GastronomicosFavService from '@services/GastronomicosFavService';
import LocalidadesService from '@services/LocalidadesService';
import ClasificacionesService from '@services/ClasificacionesService';
import CategoriasService from '@services/CategoriasService';
import EspecialidadesService from '@services/EspecialidadesService';
import ActividadesService from '@services/ActividadesService';
import {mapStyles} from '@styles/styles';
import Colors from '@styles/colors';
import IconButton from '@components/IconButton';

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
  const [alojamientosFavMeta] = AlojamientosFavService();
  const [gastronomicosFavMeta] = GastronomicosFavService();
  const [currentPosition, setCurrentPosition] = useState(initialPosition);
  const [item, setItem] = useState(null);
  const [activeMarker, setActiveMarker] = useState(false);
  const [isVisibleOverlay, setIsVisibleOverlay] = useState(false);
  const [localidad, setLocalidad] = useState(1);
  const [clasificacion, setClasificacion] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const [actividad, setActividad] = useState(null);
  const [especialidad, setEspecialidad] = useState(null);
  const [showFavoritos, setShowFavoritos] = useState(false);
  const [alojamientosFav, setAlojamientosFav] = useState([]);
  const [gastronomicosFav, setGastronomicosFav] = useState([]);
  const [search, setSearch] = useState('');

  const getAlojamientos = () => {
    let alojamientos = alojamientosMeta.data;
    if (localidad != null) {
      alojamientos = alojamientos.filter(
        alojamiento => alojamiento.comercio.localidad.id == localidad,
      );
    }
    if (clasificacion != null) {
      alojamientos = alojamientos.filter(
        alojamiento => alojamiento.clasificacion.id == clasificacion,
      );
    }
    if (categoria != null) {
      alojamientos = alojamientos.filter(
        alojamiento => alojamiento.categoria.id == categoria,
      );
    }
    if (search === '') {
      return alojamientos;
    } else {
      return alojamientos.filter(alojamiento =>
        alojamiento.comercio.nombre
          .toLowerCase()
          .includes(search.toLowerCase()),
      );
    }
  };

  const getGastronomicos = () => {
    let gastronomicos = gastronomicosMeta.data;
    if (localidad != null) {
      gastronomicos = gastronomicos.filter(
        gastronomico => gastronomico.comercio.localidad.id == localidad,
      );
    }
    if (actividad != null) {
      const checkAct = item => item.actividad.id === actividad;
      gastronomicos = gastronomicos.filter(gastronomico =>
        gastronomico.actividades_gastronomico?.some(checkAct),
      );
    }
    if (especialidad != null) {
      const checkEsp = item => item.especialidade.id === especialidad;
      gastronomicos = gastronomicos.filter(gastronomico =>
        gastronomico.especialidades_gastronomico?.some(checkEsp),
      );
    }
    if (search === '') {
      return gastronomicos;
    } else {
      return gastronomicos.filter(gastronomico =>
        gastronomico.comercio.nombre.toLowerCase().includes(search.toLowerCase()),
      );
    }
  };

  const getAlojamientosFav = () => {
    let alojamientos = alojamientosFav;
    if (localidad != null) {
      alojamientos = alojamientos.filter(
        alojamiento => alojamiento.comercio.localidad.id == localidad,
      );
    }
    if (clasificacion != null) {
      alojamientos = alojamientos.filter(
        alojamiento => alojamiento.clasificacion.id == clasificacion,
      );
    }
    if (categoria != null) {
      alojamientos = alojamientos.filter(
        alojamiento => alojamiento.categoria.id == categoria,
      );
    }
    if (search === '') {
      return alojamientos;
    } else {
      return alojamientos.filter(alojamiento =>
        alojamiento.comercio.nombre
          .toLowerCase()
          .includes(search.toLowerCase()),
      );
    }
  };

  const getGastronomicosFav = () => {
    let gastronomicos = gastronomicosFav;
    if (localidad != null) {
      gastronomicos = gastronomicos.filter(
        gastronomico => gastronomico.comercio.localidad?.id == localidad,
      );
    }
    if (actividad != null) {
      const checkAct = item => item.actividade.id === actividad;
      gastronomicos = gastronomicos.filter(gastronomico =>
        gastronomico.actividades_gastronomico?.some(checkAct),
      );
    }
    if (especialidad != null) {
      const checkEsp = item => item.especialidade.id === especialidad;
      gastronomicos = gastronomicos.filter(gastronomico =>
        gastronomico.especialidades_gastronomico?.some(checkEsp),
      );
    }
    if (search === '') {
      return gastronomicos;
    } else {
      return gastronomicos.filter(gastronomico =>
        gastronomico.comercio.nombre
          .toLowerCase()
          .includes(search.toLowerCase()),
      );
    }
  };

  const getAlojamientosFavService = async () => {
    let arrayAlojamientosFav = await alojamientosFavMeta.getFavoritos();
    return arrayAlojamientosFav;
  };

  const getGastronomicosFavService = async () => {
    let arrayGastronomicosFav = await gastronomicosFavMeta.getFavoritos();
    return arrayGastronomicosFav;
  };

  const fetchFavoritos = async () => {
    let arrayAlojamientosFav = await getAlojamientosFavService();
    let arrayGastronomicosFav = await getGastronomicosFavService();

    setAlojamientosFav(arrayAlojamientosFav);
    setGastronomicosFav(arrayGastronomicosFav);
  };

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

    fetchFavoritos();
  }, []);

  const verDetalles = item => {
    setActiveMarker(false);
    item.categoria
      ? navigation.navigate('AlojamientoDetails', {item: item})
      : navigation.navigate('GastronomicoDetails', {item: item});
  };

  return (
    <View style={mapStyles.container}>
      {alojamientosMeta.isLoading || gastronomicosMeta.isLoading ? (
        <ActivityIndicator style={{flex: 1}} animating size="large" />
      ) : alojamientosMeta.isError || gastronomicosMeta.isError ? (
        <Text>Error...</Text>
      ) : showFavoritos ? (
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={mapStyles.map}
          showsUserLocation
          initialRegion={currentPosition}>
          {getAlojamientosFav().map(alojamiento => (
            <Marker
              coordinate={{
                latitude: alojamiento.comercio.lat,
                longitude: alojamiento.comercio.lng,
              }}
              tracksViewChanges={false}
              onPress={event => {
                event.stopPropagation();
                setActiveMarker(true);
                setItem(alojamiento);
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
          {getGastronomicosFav().map(gastronomico => (
            <Marker
              coordinate={{
                latitude: gastronomico.comercio.lat,
                longitude: gastronomico.comercio.lng,
              }}
              tracksViewChanges={false}
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
      ) : (
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={mapStyles.map}
          showsUserLocation
          initialRegion={currentPosition}>
          {getAlojamientos().map(alojamiento => (
            <Marker
              coordinate={{
                latitude: alojamiento.comercio.lat,
                longitude: alojamiento.comercio.lng,
              }}
              tracksViewChanges={false}
              onPress={event => {
                event.stopPropagation();
                setActiveMarker(true);
                setItem(alojamiento);
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
                latitude: gastronomico.comercio.lat,
                longitude: gastronomico.comercio.lng,
              }}
              tracksViewChanges={false}
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
      <SearchBar
        round
        placeholder="Filtrar por nombre..."
        onChangeText={text => setSearch(text)}
        onClear={() => setSearch('')}
        value={search}
        lightTheme={true}
        containerStyle={{width: "100%", top: 2, position: "absolute"}}
      />
      <IconButton
        iconName={'magnify'}
        iconSize={30}
        style={{bottom: 20, right: 20}}
        onPress={() => setIsVisibleOverlay(true)}
      />
      {showFavoritos ? (
        <IconButton
          style={{bottom: 80, right: 20}}
          onPress={() => setShowFavoritos(!showFavoritos)}
          iconName="heart"
          iconSize={30}
        />
      ) : (
        <IconButton
          style={{bottom: 80, right: 20}}
          onPress={() => setShowFavoritos(!showFavoritos)}
          iconName="heart-outline"
          iconSize={30}
        />
      )}
      <Overlay
        isVisible={activeMarker}
        onBackdropPress={() => setActiveMarker(false)}
        overlayStyle={{height: 420, width: 280, borderRadius: 10}}>
        {activeMarker && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.WHITE,
            }}>
            {item.comercio.foto ? (
              <Image
                source={{uri: item.comercio.foto}}
                style={{width: 250, height: 200, padding: 10}}
                PlaceholderContent={<ActivityIndicator />}
              />
            ) : (
              <Image
                source={require('@resources/images/sin-foto.jpg')}
                style={{width: 350, height: 200, padding: 10}}
                PlaceholderContent={<ActivityIndicator />}
              />
            )}
            <Text h3 style={{padding: 10}}>
              {item.comercio.nombre}
            </Text>
            <TouchableOpacity
              style={mapStyles.button}
              onPress={() => verDetalles(item)}>
              <Text style={mapStyles.buttonText}>Ver Más</Text>
            </TouchableOpacity>
          </View>
        )}
      </Overlay>

      <Overlay
        isVisible={isVisibleOverlay}
        onBackdropPress={() => setIsVisibleOverlay(false)}
        overlayStyle={{height: 600, width: 300}}>
        <Text h3>Filtros</Text>
        <Text h4>Localidad</Text>
        <RNPickerSelect
          style={{width: '50%', backgroundColor: 'lightyellow'}}
          onValueChange={value => {
            setLocalidad(value);
          }}
          items={localidadesMeta.data.map(localidad => ({
            label: localidad.nombre,
            value: localidad.id,
          }))}
          value={localidad}
          placeholder={{label: 'Todas', value: null}}
        />
        <Text h4>Alojamientos</Text>
        <Text>Selecione una Clasificacion</Text>
        <RNPickerSelect
          style={{width: '50%', backgroundColor: 'lightyellow'}}
          onValueChange={value => {
            setClasificacion(value);
          }}
          items={clasificacionesMeta.data.map(clasificacion => ({
            label: clasificacion.nombre,
            value: clasificacion.id,
          }))}
          value={clasificacion}
          placeholder={{label: 'Todas', value: null}}
        />
        <Text>Selecione una Categoria</Text>
        <RNPickerSelect
          style={{width: '50%', backgroundColor: 'lightyellow'}}
          onValueChange={value => {
            setCategoria(value);
          }}
          items={categoriasMeta.data.map(categoria => ({
            label: categoria.estrellas,
            value: categoria.id,
          }))}
          value={categoria}
          placeholder={{label: 'Todas', value: null}}
        />
        <Text h4>Gastronomicos</Text>
        <Text>Selecione una Actividad</Text>
        <RNPickerSelect
          style={{width: '50%', backgroundColor: 'lightyellow'}}
          onValueChange={value => {
            setActividad(value);
          }}
          items={especialidadesMeta.data.map(especialidad => ({
            label: especialidad.nombre,
            value: especialidad.id,
          }))}
          value={actividad}
          placeholder={{label: 'Todas', value: null}}
        />
        <Text>Selecione una Especialidad</Text>
        <RNPickerSelect
          style={{width: '50%', backgroundColor: 'lightyellow'}}
          onValueChange={value => {
            setEspecialidad(value);
          }}
          items={actividadesMeta.data.map(actividad => ({
            label: actividad.nombre,
            value: actividad.id,
          }))}
          value={especialidad}
          placeholder={{label: 'Todas', value: null}}
        />
        <Button
          title="Aceptar"
          onPress={() => {
            setIsVisibleOverlay(false);
          }}
          style={{marginTop: 10}}
        />
      </Overlay>
    </View>
  );
}
