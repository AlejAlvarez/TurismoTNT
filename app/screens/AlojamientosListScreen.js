import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { SearchBar, Button, ListItem, Text, Overlay } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import AlojamientosService from '@services/AlojamientosService';
import LocalidadesService from '@services/LocalidadesService';
import ClasificacionesService from '@services/ClasificacionesService';
import CategoriasService from '@services/CategoriasService';
import ListEmpty from '@components/ListEmpty';

export default function AlojamientosListScreen({ navigation }) {
  const [alojamientosMeta] = AlojamientosService();
  const [localidadesMeta] = LocalidadesService();
  const [clasificacionesMeta] = ClasificacionesService();
  const [categoriasMeta] = CategoriasService();
  const [search, setSearch] = useState("");
  const [isVisibleOverlay, setIsVisibleOverlay] = useState(false);
  const [localidad, setLocalidad] = useState(null);
  const [clasificacion, setClasificacion] = useState(null);
  const [categoria, setCategoria] = useState(null);

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
    if (search === ""){
      return alojamientos;
    } else {
      return alojamientos.filter((alojamiento) => alojamiento.nombre.toLowerCase().includes(search.toLowerCase()));    
    };
  };

  return (
    <View style={{ flex: 1}}>
      <SearchBar
        round
        placeholder="Filtrar por nombre..."  
        onChangeText={(text) => setSearch(text)}
        onClear={() => setSearch("")}
        value={search}
        lightTheme={true}
      />
      <Button
        title="Configurar Filtros"
        onPress={() => setIsVisibleOverlay(true)}
      />
      {alojamientosMeta.isLoading ? (
        <ActivityIndicator style={{ flex: 1 }} animating size="large" />
      ) : alojamientosMeta.isError ? (
        <Text>ERROR...</Text>
      ) : (
        <View>
            <FlatList
            data={getAlojamientos()}
            keyExtractor={({ id }, index) => id}
            renderItem={( {item} ) => (
                <ListItem
                title={item.nombre}
                subtitle={item.domicilio}
                leftAvatar={{ source: { uri: item.foto } }}
                onPress={() => {
                    navigation.navigate('AlojamientoDetails', {
                    item: item
                    })
                }}
                bottomDivider
                chevron
                />
            )}
            ListEmptyComponent={ListEmpty}
            />

            <Overlay
            isVisible={isVisibleOverlay}
            onBackdropPress={() => setIsVisibleOverlay(false)}
            overlayStyle = {{height:400, width:300}}
            >

            <Text h4>Filtros</Text>

            <Text>Selecione una Localidad</Text>
            <RNPickerSelect
                style={{width: '50%', backgroundColor: 'lightyellow'}}
                onValueChange={(value) => {
                    setLocalidad(value);
                }}
                items={localidadesMeta.data.map(localidad => ({label: localidad.nombre, value: localidad.id}))}
                value={localidad}
                placeholder={{label: "Todas", value: null}}
            />
            
            <Text>Selecione una Clasificacion</Text>
            <RNPickerSelect
                style={{width: '50%', backgroundColor: 'lightyellow'}}
                onValueChange={(value) => {
                    setClasificacion(value);
                }}
                items={clasificacionesMeta.data.map(clasificacion => ({label: clasificacion.nombre, value: clasificacion.id}))}
                value={clasificacion}
                placeholder={{label: "Todas", value: null}}
            />

            <Text>Selecione una Categoria</Text>
            <RNPickerSelect
                style={{width: '50%', backgroundColor: 'lightyellow'}}
                onValueChange={(value) => {
                    setCategoria(value);
                }}
                items={categoriasMeta.data.map(categoria => ({label: categoria.estrellas, value: categoria.id}))}
                value={categoria}
                placeholder={{label: "Todas", value: null}}
            />

            <Button
                title="Aceptar"
                onPress={() => {
                setIsVisibleOverlay(false);
                }}
            />
            
            </Overlay>
        </View>
      )}
    </View>
  );
}