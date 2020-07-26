import React, {useEffect, useState} from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { SearchBar, Button, ListItem } from 'react-native-elements';
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
  const [data, setData] = useState( [] );
  const [gastronomicosListados, setGastronomicosListados] = useState( [] );
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { gastronomicosFiltrados } = route.params? route.params : [];
  
  const _getGastronomicos = () => {
    setIsLoading(true);
    global.storage.load({
      key: 'gastronomicos',
      autoSync: true,
      syncInBackground: true
    })
    .then(ret => {
      setData(ret);
      setGastronomicosListados(ret);
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
    if (gastronomicosFiltrados){
      setGastronomicosListados(gastronomicosFiltrados);
    }
    else{
      const fetchData = async () => {
        _getGastronomicos();
      }
      fetchData();
    };
  }, []);

  const updateSearch = (text) => {
    setSearch(text);
    if (text === ""){
      setGastronomicosListados(data);
    } else {
      setGastronomicosListados(data.filter((gastronomico) => gastronomico.nombre.toLowerCase().includes(text.toLowerCase())));
    }
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={{ flex: 1 }} animating size="large" />
      ) : isError ? (
        <Text>ERROR</Text>
      ) : (
      <View>
        <SearchBar
          round
          placeholder="Filtrar por nombre..."  
          onChangeText={text => updateSearch(text)}
          onClear={() => updateSearch("")}
          value={search}
          lightTheme={true}
        />
        <FlatList
          initialNumToRender={25}
          windowSize={10}
          data={gastronomicosListados}
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

          {/* {data.gastronomicos.forEach (gastronomico=>console.log(gastronomico.nombre))} */}
      </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  line: {
    padding: 10,
    borderBottomColor: '#920747',
    borderBottomWidth: 3,
  },
});

