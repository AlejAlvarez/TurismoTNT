import React, {useEffect, useState} from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import ListEmpty from '@components/ListEmpty';
import {loadGastronomicos, getAll, getOne, filterByNombre, isError, isLoading} from '@redux/GastronomicosSlice';
import {connect} from 'react-redux';

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

const GastronomicosListScreen = props => {
  const [gastronomicosListados, setGastronomicosListados] = useState( [] );
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    if (props.gastronomicos.length === 0){
        props.loadGastronomicos();
    }
    setGastronomicosListados(props.gastronomicos);
  }, []);

  const updateSearch = (text) => {
    setSearch(text);
    if (text === ""){
      setGastronomicosListados(props.gastronomicos);
    } else {
      setGastronomicosListados(props.filtrarPorNombre(text));
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {props.isLoading ? (
        <ActivityIndicator style={{ flex: 1 }} animating size="large" />
      ) : props.isError ? (
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
      </View>
      )}
    </View>
  );
};


const mapStateToProps = state => {
  return {
    gastronomicos: getAll(state),
    isLoading: isLoading(state),
    isError: isError(state),
    singleGastronomico: id => getOne(state, id),
    filtrarPorNombre: nombre => filterByNombre(state, nombre),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadGastronomicos: () => dispatch(loadGastronomicos()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GastronomicosListScreen);

