import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, Image, FlatList } from 'react-native';
import {Divider, Text, Overlay, Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GastronomicosFavService from '@services/GastronomicosFavService';
import { recuerdosScreenStyles } from '@styles/styles';
import Colors from '@styles/colors';

export default function RecuerdosGastronomicoScreen ({route}) {
  const {item} = route.params;
  const [gastronomicosFavMeta] = GastronomicosFavService();
  const [recuerdos, setRecuerdos] = useState([]);
  const [fotoId, setFotoId] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [fotoOverlay, setFotoOverlay] = useState(null);

  const fetchRecuerdos = async () => {
    let result = await gastronomicosFavMeta.getRecuerdos(item);
    console.log(result);
    let arrayRecuerdos = [];
    let id = fotoId;
    result.forEach( src =>{
      arrayRecuerdos.push({id: id, uri: src});
      id = id + 1;
    });
    setFotoId(id);
    setRecuerdos(arrayRecuerdos);
  }
  
  useEffect(() => {
    fetchRecuerdos();
  }, []);
  
  const agregarNuevoRecuerdo = async source =>{
    await gastronomicosFavMeta.agregarRecuerdo(item, source);
  }
  const seleccionarArchivo = () => {
    var options = {
      title: 'Nuevo Recuerdo',
      takePhotoButtonTitle: 'Tomar Foto',
      chooseFromLibraryButtonTitle: 'Seleccionar de la Galería',
      cancelButtonTitle: 'Cancelar',
      storageOptions: {
        skipBackup: true,
        path: 'TurismoRecuerdos',
      },
    };

    ImagePicker.showImagePicker(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        let source = res;
        agregarNuevoRecuerdo(source);
        setRecuerdos([...recuerdos, { id: fotoId, uri: source.uri }]);
        setFotoId(fotoId + 1);
      }
    });
  };

  const seleccionarFoto = foto =>{
    setFotoOverlay(foto);
    setIsVisible(true);
  };

  const eliminarRecuerdo = async source =>{
    await gastronomicosFavMeta.eliminarRecuerdo(item, source);
    let arrayRecuerdos = recuerdos;

    let i = recuerdos.findIndex(recuerdo => recuerdo.uri === source.uri);

    if (i !== -1){
      arrayRecuerdos = arrayRecuerdos
          .slice(0, i)
          .concat(arrayRecuerdos.slice(i + 1, arrayRecuerdos.length));
      
      setRecuerdos(arrayRecuerdos);
    };

    setIsVisible(false);
    setFotoOverlay(null);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.WHITE}}>
        <Text h4>Tus Recuerdos</Text>
        <Text>en</Text>
        <Text h2>{item.comercio.nombre}</Text>
      </View>
      <Divider />
      <View style={{justifyContent: 'center', flex: 1, paddingTop: 30, paddingBottom:15}}>
        <FlatList
          data={recuerdos}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
              <TouchableOpacity
                onPress={() => seleccionarFoto(item)}>
                <Image source={{uri: item.uri}} style={recuerdosScreenStyles.imageThumbnail} />
              </TouchableOpacity>
            </View>
          )}
          numColumns={3}
          keyExtractor={(i, index) => index.toString()}
          ListEmptyComponent={
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text> Aún no ha agregado recuerdos </Text>
          </View>}
        />              
      </View>
      <Divider />
      <View style={{alignItems: 'center', padding: 15, backgroundColor: Colors.WHITE}}>
        <TouchableOpacity
        style={recuerdosScreenStyles.button}
        onPress={() => seleccionarArchivo()}>
          <Text style={recuerdosScreenStyles.buttonText}>Agregar Recuerdo</Text>
        </TouchableOpacity>
      </View>
      <Overlay
          isVisible={isVisible}
          onBackdropPress={() => {
            setFotoOverlay(null);
            setIsVisible(false);
          }}
          overlayStyle = {{height:450, width:300}}>

          { fotoOverlay &&
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image source={{ uri: fotoOverlay.uri }} style={{ height: 380, width: 280 }} />
            <TouchableOpacity
              style={recuerdosScreenStyles.buttonDelete}
              onPress={() => eliminarRecuerdo(fotoOverlay)}>
                <Icon
                  name="delete-outline"
                  size={23}
                  color={Colors.WHITE}
                />
            </TouchableOpacity>
          </View>}

      </Overlay>
    </View>
  );
}