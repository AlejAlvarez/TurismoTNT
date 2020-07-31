import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList } from 'react-native';
import {Divider, Text, Button, Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import Colors from '@styles/colors';
import {detailsViewStyles} from '@styles/styles';

export default function App () {
  const [recuerdos, setRecuerdos] = useState([]);
  const [fotoId, setFotoId] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [fotoOverlay, setFotoOverlay] = useState(null);

  // useEffect(() => {
  //   let items = Array.apply(null, Array(60)).map( (v, i) => {
  //     return {id: i, src:'https://www.ivertech.com/Articles/Images/KoalaBear200x200.jpg'};
  //   });
  //   items.forEach(item => console.log(item.id, item.src));
  //   setRecuerdos(items);
  // }, []);

  const selectFile = () => {
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
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        let source = res;
        setRecuerdos([...recuerdos, { id: fotoId, src: source.uri }]);
        setFotoId(fotoId + 1);
      }
    });
  };

  const seleccionarFoto = foto =>{
    setFotoOverlay(foto);
    setIsVisible(true);
  };

  return (
    <View style={{flex: 1}}>
      <Text h2>Recuerdos</Text>
      <Divider />
      <View style={{justifyContent: 'center', flex: 1, paddingTop: 30, paddingBottom:15}}>
        <FlatList
          data={recuerdos}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
              <TouchableOpacity
                onPress = {() => seleccionarFoto(item)}>
                <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
              </TouchableOpacity>
            </View>
          )}
          numColumns={3}
          keyExtractor={(i, index) => index.toString()}
          ListEmptyComponent={<Text> Aún no ha agregado recuerdos </Text>}
        />              
      </View>
      <View style={{alignItems: 'center', paddingBottom:20}}>
        <TouchableOpacity
        style={detailsViewStyles.addRecuerdoBtn}
        onPress={() => selectFile()}>
          <Icon
            name="plus"
            size={23}
            color={Colors.WHITE}
          />
        </TouchableOpacity>
      </View>
      <Overlay
          isVisible={isVisible}
          onBackdropPress={() => {
            setFotoOverlay(null);
            setIsVisible(false);
          }}
          overlayStyle = {{height:400, width:300}}
      >
        { fotoOverlay &&
          <Image source={{ uri: fotoOverlay.src }} style={{ height: 370, width: 270 }} />
        }
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: Colors.AQUABLUE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom:12
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff'
  },
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  imageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    flex: 1,
    margin: 1,
  },  
});


{/* <View style={styles.container}>
  <View style={styles.container}>
    <Image
      source={{
        uri: 'data:image/jpeg;base64,' + foto.uri,
      }}
      style={{ width: 100, height: 100 }}
    />
    <Image
      source={{ uri: foto.uri }}
      style={{ width: 200, height: 200 }}
    />
    <Text style={{ alignItems: 'center' }}>
      {foto.uri}
    </Text>

    <TouchableOpacity onPress={() => selectFile()} style={styles.button}  >
        <Text style={styles.buttonText}>Agregar Recuerdo</Text>
    </TouchableOpacity>
  </View>
</View> */}