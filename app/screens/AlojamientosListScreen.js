import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { SearchBar, Button, ListItem, Text } from 'react-native-elements';
import ListEmpty from '@components/ListEmpty';

export default function AlojamientosListScreen({ navigation, route }) {
  // Probar reemplazar useState de data con 'useState([])' en lugar del map que hice
  const [data, setData] = useState( [] );
  const [alojamientosListados, setAlojamientosListados] = useState( [] );
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { alojamientosFiltrados } = route.params? route.params : [];

  const _getAlojamientos = () => {
    setIsLoading(true);
    global.storage.load({
      key: 'alojamientos',
      autoSync: true,
      syncInBackground: true
    })
    .then(ret => {
      setData(ret);
      setAlojamientosListados(ret);
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
    if (alojamientosFiltrados){
      setAlojamientosListados(alojamientosFiltrados);
    }
    else{
      const fetchData = async () => {
        _getAlojamientos();
      }
      fetchData();
    };
  }, []);

  const updateSearch = (text) => {
    setSearch(text);
    if (text === ""){
      setAlojamientosListados(data);
    } else {
      setAlojamientosListados(data.filter((alojamiento) => alojamiento.nombre.toLowerCase().includes(text.toLowerCase())));
    }
  };

  return (
    <View style={{ flex: 1}}>
      <SearchBar
        round
        placeholder="Filtrar por nombre..."  
        onChangeText={(text) => updateSearch(text)}
        onClear={() => updateSearch("")}
        value={search}
        lightTheme={true}
      />
      <Button
        title="Configurar Filtros"
        onPress={() => navigation.navigate('AlojamientosFilter')}
      />
      {isLoading ? (
        <ActivityIndicator style={{ flex: 1 }} animating size="large" />
      ) : isError ? (
        <Text>ERROR...</Text>
      ) : (
        <FlatList
          data={alojamientosListados}
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
      )}
    </View>
  );
}


// else{
//   // De esta manera reemplazamos los espacios por %20, para postgREST
//   let encodedText = encodeURIComponent(text.trim())
//   let endUrl = `.nombre=ilike.*${encodedText}*`
//   setUrl(ALOJAMIENTOS_URL.concat(endUrl));
// }