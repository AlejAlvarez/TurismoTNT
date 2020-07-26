import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import { mapStyles } from '@styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '@styles/colors';


check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
 .then((result) => {
  switch (result) {
    case RESULTS.UNAVAILABLE:
      console.warn(
        'Esta función no se encuentra disponible en este dispositivo',
      );
      break;
    case RESULTS.DENIED:
      console.log('Solicitando permiso ACCESS_FINE_LOCATION...')
      request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
        if (result == RESULTS.GRANTED){
          console.log('Permiso otorgado por el usuario!');
        }
        else {
          console.warn('Permiso denegado');
        }
      });
      break;
    case RESULTS.GRANTED:
      console.log('El permiso ya se encuentra otorgado');
      break;
    case RESULTS.BLOCKED:
      console.warn('El permiso se encuentra bloqueado. No puede volver a solicitarse.');
      break;
  }
 })
 .catch((error) => {
   console.log('Error en chequeo de permisos');
 });


const initialPosition = {
  latitude: -54.7999968,
  longitude: -68.2999988,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function MapScreen({ navigation }) {  
  const [alojamientos, setAlojamientos] = useState([]);
  const [gastronomicos, setGastronomicos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(initialPosition);
  const [item, setItem] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  
  const _getAlojamientos = () => {
    setIsLoading(true);
    global.storage.load({
      key: 'alojamientos',
      autoSync: true,
      syncInBackground: true
    })
    .then(ret => {
      setAlojamientos(ret);
      setIsError(false);
      setIsLoading(false);
    })
    .catch(err => {
      console.warn(err.message);
      setIsLoading(false);
      setIsError(true);
    });
  };

  const _getGastronomicos = () => {
    setIsLoading(true);
    global.storage.load({
      key: 'gastronomicos',
      autoSync: true,
      syncInBackground: true
    })
    .then(ret => {
      setGastronomicos(ret);
      setIsError(false);
      setIsLoading(false);
    })
    .catch(err => {
      console.warn(err.message);
      setIsLoading(false);
      setIsError(true);
    });
  };
  
  useEffect(() => {
    const fetchData = async () => {
      _getAlojamientos();
      _getGastronomicos();
    }

    // Conseguimos la posicion desde donde se esta conectando
    Geolocation.getCurrentPosition(position => {
      const { longitude, latitude } = position.coords;
      setCurrentPosition({
        ...currentPosition,
        latitude,
        longitude,
      })
    },
      error => alert(error.message),
      { timeout: 15000, maximumAge: 10000 }
    );

    fetchData();
  }, []);

  return (
    <View style={mapStyles.container}>
      {isLoading ? (
        <ActivityIndicator style={{ flex: 1 }} animating size="large" />
        ) : isError? (<Text>Error...</Text>) : 
        (
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={mapStyles.map}
          showsUserLocation
          initialRegion={currentPosition}
          onPress={()=>{setActiveMarker(false)}}
          >
          {alojamientos.map(item => (
            <Marker
              coordinate={{
                latitude:item.lat,
                longitude:item.lng
              }}
              onPress={(event) => {
                event.stopPropagation()
                setActiveMarker(true)
                setItem(item)
              }}>
              <View style={{ backgroundColor: Colors.LIGHTGREEN, padding: 5,
                borderRadius: 10, elevation: 3, shadowRadius: 2, shadowColor: 'black',
                shadowOffset: { width: 10, height: 10 } }}>
                <Icon name="hotel" size={15} color="white" />
              </View>              
            </Marker>
          ))}
          {gastronomicos.map(gastronomico => (
            <Marker
              coordinate={{
                latitude:gastronomico.lat,
                longitude:gastronomico.lng
              }}
              onPress={(event) => {
                event.stopPropagation()
                setActiveMarker(true)
                setItem(gastronomico)
              }}>
              <View style={{ backgroundColor: Colors.GOLD, padding: 5,
                borderRadius: 10, elevation: 3, shadowRadius: 2, shadowColor: 'black',
                shadowOffset: { width: 10, height: 10 } }}>
                <Icon name="food-fork-drink" size={15} color="white" />
              </View>
            </Marker>
          ))}
        </MapView>
      )}
      {activeMarker ?
       (<View style={{ position: 'absolute', left: 100, right:100, top:70, backgroundColor: 'white' }}>
         <TouchableOpacity 
            onPress={() => {item.clasificacion ?
                navigation.navigate('AlojamientoDetails', {item:item}) : 
                navigation.navigate('GastronomicoDetails', {item:item})}} 
          >
         <Image source={{uri: item.foto}} style={{height: 100, width:200 }} />
         <Text>
          {item.nombre}
         </Text>
         </TouchableOpacity>
       </View>)
       : null}      
    </View>
  );
  }
   
  