import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { SearchBar, Button, ListItem, Text, Overlay } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import AlojamientosFavService from '@services/AlojamientosFavService';
import GastronomicosFavService from '@services/GastronomicosFavService';
import LocalidadesService from '@services/LocalidadesService';
import ListEmpty from '@components/ListEmpty';

export default function FavoritosListScreen({ navigation }) {
  const [alojamientosFavMeta] = AlojamientosFavService();
  const [gastronomicosFavMeta] = GastronomicosFavService();
  const [localidadesMeta] = LocalidadesService();
  const [favoritos, setFavoritos] = useState([]);
  const [search, setSearch] = useState("");
  const [isVisibleOverlay, setIsVisibleOverlay] = useState(false);
  const [localidad, setLocalidad] = useState(null);

  const getAlojamientosFav = async () => {
    let arrayAlojamientosFav = await alojamientosFavMeta.getFavoritos();
    return arrayAlojamientosFav;
  };

  const getGastronomicosFav = async () => {
    let arrayGastronomicosFav = await gastronomicosFavMeta.getFavoritos();
    return arrayGastronomicosFav;
  };

  const fetchFavoritos = async () =>{
    let arrayAlojamientosFav = await getAlojamientosFav();
    let arrayGastronomicosFav = await getGastronomicosFav();

    setFavoritos([...arrayAlojamientosFav, ...arrayGastronomicosFav]);
  }

  useEffect(() => {
      fetchFavoritos()
  }, []);

  const getFavoritos = () =>{
      let arrayFavoritos = favoritos;
      if (localidad != null){
        arrayFavoritos = arrayFavoritos.filter(favorito => 
            favorito.categoria? 
                favorito.localidad.id == localidad : favorito.localidade?.id == localidad
        );
      };
      if (search === ""){
        return arrayFavoritos;
      } else {
        return arrayFavoritos.filter((favorito) => favorito.nombre.toLowerCase().includes(search.toLowerCase()));    
      };
  };

  const verDetalles = item => {
    console.log(item);
    item.categoria? navigation.navigate('AlojamientoDetails', {item: item})
      : navigation.navigate('GastronomicoDetails', {item: item});
  }

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
        title="Seleccionar Localidad"
        onPress={() => setIsVisibleOverlay(true)}
      />
        <View>
            <FlatList
            data={getFavoritos()}
            keyExtractor={({ id }, index) => id}
            renderItem={( {item} ) => (
                <ListItem
                title={item.nombre}
                subtitle={item.domicilio}
                leftAvatar={{ source: { uri: item.foto } }}
                onPress={() => verDetalles(item)}
                bottomDivider
                chevron
                />
            )}
            ListEmptyComponent={ListEmpty}
            />

            <Overlay
            isVisible={isVisibleOverlay}
            onBackdropPress={() => setIsVisibleOverlay(false)}
            overlayStyle = {{height:200, width:300}}
            >

            <Text h4>Localidades</Text>

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
            <Button
                title="Aceptar"
                onPress={() => {
                setIsVisibleOverlay(false);
                }}
            />
            
            </Overlay>
        </View>
    </View>
  );
}