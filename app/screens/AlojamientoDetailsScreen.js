import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Image, Text, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { mapStyles } from '@styles/styles';
import Colors from '@styles/colors';

export default function AlojamientoDetailsScreen({ route }) {
  
  // const [localidad, setLocalidad] = useState('');
  const { item } = route.params;
  
  // const getLocalidad = async (localidadId) => {
  //   // esto se llama destructuring
  //   const {data} = await axios.get(`http://${DEFAULT_IP}:3000/localidades?id=eq.${localidadId}`);
  //   setLocalidad(data[0].nombre);
  // }

  // useEffect(() => {
  //   getLocalidad(item.localidad_id);
  // },
  // [])

  const _renderEstrellas = () => {
    let myloop = [];

    if (item.categoria.valor == 0){
      return <Text style={{color: Colors.GOLD}}>Categoría Única</Text>
    }
    else{
      for (let i = 0; i < item.categoria; i++) {
        myloop.push(
          <Icon
            name="star" color={Colors.GOLD}
          />
          );
        }
      return myloop;
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Image
        source={{ uri: item.foto }}
        style={{ width:350, height:200 }}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Text h4>{item.nombre}</Text>
      <View style={{ width: "100%", height: 20, flexDirection: "row", justifyContent: 'center'}}>
        {_renderEstrellas()}
      </View>
      <Divider style={{ height:2 }} />
      <Text>{item.domicilio} - {item.localidad.nombre}</Text>
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
                <View style={{ backgroundColor: '#40E9A4', padding: 5, borderRadius: 10, elevation: 3, shadowRadius: 2, shadowColor: 'black', shadowOffset: { width: 10, height: 10 } }}>
                  <Icon name="hotel" size={20} color="white" />
                </View>
              </Marker>
          </MapView>
      </View>
    </View>
  );
}
