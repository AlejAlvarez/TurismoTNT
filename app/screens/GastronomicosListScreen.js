import React, { useState } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { SearchBar, Button, ListItem, Text, Overlay } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import GastronomicosService from '@services/GastronomicosService';
import LocalidadesService from '@services/LocalidadesService';
import EspecialidadesService from '@services/EspecialidadesService';
import ActividadesService from '@services/ActividadesService';
import ListEmpty from '@components/ListEmpty';

// APOLLO SERVER para crear el servidor
// APOLLO CLIENT para acceder al servidor
// Usar Apollo Boost en lugar de toda la wea que instala Hasura con GraphQL y Apollo. 
// Esto esta dentro de apollographql.com/docs/react/get-started/
// Todo lo que sea de redes, en Apollo le dicen apollo link y apollo link error
// apollo graphql-tag

// lo copado de graphql es que usa cache en lugar de llamadas consecutivas
// recordar como acceder a la consola de graphql de hasura (o docker, no me acuerdo)

// graphql 3 operaciones -> queries, mutators y subscriptions

// hay un gastronomico que no tiene localidade: para este caso poniendo {gastronomico.localidade?.nombre} se soluciona (nótese el ?)

export default function GastronomicosListScreen({ navigation, route }) {
    const [gastronomicosMeta] = GastronomicosService();
    const [localidadesMeta] = LocalidadesService();
    const [especialidadesMeta] = EspecialidadesService();
    const [actividadesMeta] = ActividadesService();
    const [search, setSearch] = useState("");
    const [isVisibleOverlay, setIsVisibleOverlay] = useState(false);
    const [localidad, setLocalidad] = useState(null);
    const [actividad, setActividad] = useState(null);
    const [especialidad, setEspecialidad] = useState(null);
  

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
    if (search === ""){
      return gastronomicos;
    } else {
      return gastronomicos.filter((gastronomico) => gastronomico.nombre.toLowerCase().includes(search.toLowerCase()));    
    };
  };

  return (
    <View style={{ flex: 1 }}>
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
      {gastronomicosMeta.isLoading ? (
        <ActivityIndicator style={{ flex: 1 }} animating size="large" />
      ) : gastronomicosMeta.isError ? (
        <Text>ERROR</Text>
      ) : (
      <View>
        <FlatList
          initialNumToRender={25}
          windowSize={10}
          data={getGastronomicos()}
          ListEmptyComponent={ListEmpty}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <ListItem
              title={item.nombre}
              subtitle={item.domicilio}
              leftAvatar={{ source: { uri: item.foto } }}
              onPress={() => {
                navigation.navigate('GastronomicoDetails', {
                  item: item
                })
              }}
              bottomDivider
              chevron
            />)}
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
          
          <Text>Selecione una Actividad</Text>
          <RNPickerSelect
              style={{width: '50%', backgroundColor: 'lightyellow'}}
              onValueChange={(value) => {
                  setActividad(value);
              }}
              items={especialidadesMeta.data.map(especialidad => ({label: especialidad.nombre, value: especialidad.id}))}
              value={actividad}
              placeholder={{label: "Todas", value: null}}
          />

          <Text>Selecione una Especialidad</Text>
          <RNPickerSelect
              style={{width: '50%', backgroundColor: 'lightyellow'}}
              onValueChange={(value) => {
                  setEspecialidad(value);
              }}
              items={actividadesMeta.data.map(actividad => ({label: actividad.nombre, value: actividad.id}))}
              value={especialidad}
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
};