import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { SearchBar, ListItem, Text } from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import ListEmpty from '@components/ListEmpty';
import {loadAlojamientos, getAll, getOne, filterByNombre, isError, isLoading} from '@redux/AlojamientosSlice';
import {connect} from 'react-redux';

const AlojamientosListScreen = props => {
  const [search, setSearch] = useState("");
  const [alojamientosListados, setAlojamientosListados] = useState([]);
  const navigation = useNavigation();
  
  useEffect(() => {
    if (props.alojamientos.length === 0){
        props.loadAlojamientos();
    }
    setAlojamientosListados(props.alojamientos);
  }, []);

  const updateSearch = (text) => {
    setSearch(text);
    if (text === ""){
      setAlojamientosListados(props.alojamientos);
    } else {
      setAlojamientosListados(props.filtrarPorNombre(text));
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
      {props.isLoading ? (
        <ActivityIndicator style={{ flex: 1 }} animating size="large" />
      ) : props.isError ? (
        <Text>ERROR...</Text>
      ) : (
        <FlatList
          data={alojamientosListados}
          keyExtractor={({ id }, index) => id}
          renderItem={( {item} ) => (
            <ListItem
              initialNumToRender={25}
              windowSize={10}
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


const mapStateToProps = state => {
  return {
    alojamientos: getAll(state),
    isLoading: isLoading(state),
    isError: isError(state),
    singleAlojamiento: id => getOne(state, id),
    filtrarPorNombre: nombre => filterByNombre(state, nombre),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAlojamientos: () => dispatch(loadAlojamientos()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlojamientosListScreen);


// else{
//   // De esta manera reemplazamos los espacios por %20, para postgREST
//   let encodedText = encodeURIComponent(text.trim())
//   let endUrl = `.nombre=ilike.*${encodedText}*`
//   setUrl(ALOJAMIENTOS_URL.concat(endUrl));
// }