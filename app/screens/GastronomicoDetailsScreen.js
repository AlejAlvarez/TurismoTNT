import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Image, Text, Divider, Button } from 'react-native-elements';
import Colors from '@styles/colors';
import { mapStyles } from '@styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

export default function GastronomicoDetailsScreen({ route }) {
  const { item } = route.params;

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

  // let gastronomico = null;
  // if (data) {
  //   gastronomico = data.gastronomicos[0]
  // }

    return (
      <View style={{ flex: 1 }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image
              source={{ uri: item.foto }}
              style={{ width:350, height:200 }}
              PlaceholderContent={<ActivityIndicator />}
            />
            <Text h4>{item.nombre}</Text>
            <View style={{ width: "100%", height: 20, flexDirection: "row", justifyContent: 'center'}}>
              {_renderActividades()}
            </View>
            <View style={{ width: "100%", height: 20, flexDirection: "row", justifyContent: 'center'}}>
              {_renderEspecialidades()}
            </View>
            <Divider style={{ height:2 }} />
            <Text>{item.domicilio} - {item.localidade.nombre}</Text>
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
      </View>
    );
  }

  
    // <View style={{ flex: 1 }}>
    //   {loading ? (
    //     <ActivityIndicator style={{ flex: 1 }} animating size="large" />
    //   ) : error ? (
    //     <Text>ERROR</Text>
    //   ) : (
    //     <View style={{ flex: 1, alignItems: 'center' }}>
    //       {console.log("data.gastronomicos[0].actividad_gastronomicos: ", gastronomico.actividad_gastronomicos)}
    //       <Image
    //         source={{ uri: gastronomico.foto }}
    //         style={{ width:350, height:200 }}
    //         PlaceholderContent={<ActivityIndicator />}
    //       />
    //       <Text h4>{gastronomico.nombre}</Text>
    //       {_renderActividades(data.gastronomicos[0].actividad_gastronomicos)}
    //       <Divider style={{ height:2 }} />
    //       <Text>{gastronomico.domicilio} - {gastronomico.localidade.nombre}</Text>
    //       <View style={mapStyles.smallContainer}>
    //         <MapView 
    //             provider={PROVIDER_GOOGLE} // remove if not using Google Maps
    //             style={mapStyles.map}
    //             scrollEnabled={false}
    //             zoomEnabled={false}
    //             zoomControlEnabled={false}
    //             minZoomLevel={13}
    //             region={{
    //               latitude: gastronomico.lat,
    //               longitude: gastronomico.lng,
    //               latitudeDelta: 0.0922,
    //               longitudeDelta: 0.0421,
    //             }}>
    //               <Marker
    //               coordinate={{
    //                 latitude:gastronomico.lat,
    //                 longitude:gastronomico.lng
    //               }}>
    //                 <View style={{ backgroundColor: Colors.GOLD, padding: 5, borderRadius: 10, elevation: 3, shadowRadius: 2, shadowColor: 'black', shadowOffset: { width: 10, height: 10 } }}>
    //                   <Icon name="food-fork-drink" size={20} color="white" />
    //                 </View>
    //               </Marker>
    //           </MapView>
    //       </View>
    //     </View>
    //   )}
    // </View>