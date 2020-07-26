import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { SearchBar, Button, ListItem } from 'react-native-elements';
import {fetchAlojamientos, getAll, getOne, getByName, isError, isFetching} from '@redux/AlojamientosSlice';
import {connect} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ListEmpty from '@components/ListEmpty';

const AlojamientosListScreen = props => {
  const [search, setSearch] = useState("");
  const [alojamientos, setAlojamientos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (!props.alojamientos){
        props.fetchAlojamientos();
        setAlojamientos(props.alojamientos)
    }
    if (search === ""){
      setAlojamientos(props.alojamientos);
    } else{
      setAlojamientos(props.buscarPorNombre(search));
    }
  }, [search]);

  return (
    <View style={{ flex: 1}}>
      <SearchBar
        round
        placeholder="Filtrar por nombre..."  
        onChangeText={text => setSearch(text)}
        onClear={() => setSearch("")}
        value={search}
        lightTheme={true}
      />
      <Button
        title="Configurar Filtros"
        onPress={() => navigation.navigate('AlojamientosFilter')}
      />
      {props.isFetching ? (
        <ActivityIndicator style={{ flex: 1 }} animating size="large" />
      ) : props.isError ? (
          <Text>ERROR</Text>
      ) : (
        <FlatList
          data={alojamientos}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
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

const mapStateToProps = state => {
    return {
      alojamientos: getAll(state),
      isFetching: isFetching(state),
      isError: isError(state),
      singleAlojamiento: id => getOne(state, id),
      buscarPorNombre: nombre => getByName(state, nombre),
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      fetchAlojamientos: () => dispatch(fetchAlojamientos()),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AlojamientosListScreen);