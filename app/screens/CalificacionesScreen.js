import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList, Alert} from 'react-native';
import {Text, Overlay} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '@styles/colors';
import CalificacionesService from '@services/CalificacionesService';
import UserContext from '@context/UserContext';
import TextArea from '@components/TextArea';
import Comment from '@components/Comment';
import FilledButton from '@components/FilledButton';
import TextButton from '@components/TextButton';

export default (CalificacionesScreen = ({navigation, route}) => {
  const {item} = route.params;
  const {usuario} = useContext(UserContext);
  const [calificacionesMeta] = CalificacionesService();
  const [isVisibleOverlay, setIsVisibleOverlay] = useState(false);
  const [calificacion, setCalificacion] = useState(null);
  const [comentario, setComentario] = useState('');
  const [calificaciones, setCalificaciones] = useState([]);
  const [countCalificaciones, setCountCalificaciones] = useState([]);
  const calificacionesPosibles = [
    {valor: 1, nombre: 'Buena'},
    {valor: 2, nombre: 'Medio'},
    {valor: 3, nombre: 'Mala'},
  ];

  const fetchCalificaciones = async () => {
    let response = await calificacionesMeta.getByComercio(item.comercio.id);
    console.log(response);
    setCalificaciones(response);
  };

  const fetchCountCalificaciones = async () => {
    let response = [];
    response[0] = await calificacionesMeta.countByComercioYCalificacion(
      item.comercio.id,
      1,
    );
    response[1] = await calificacionesMeta.countByComercioYCalificacion(
      item.comercio.id,
      2,
    );
    response[2] = await calificacionesMeta.countByComercioYCalificacion(
      item.comercio.id,
      3,
    );
    setCountCalificaciones(response);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchCountCalificaciones();
      fetchCalificaciones();
    });
    return unsubscribe;
  }, [navigation]);

  const _renderCalificacion = ({item}) => (
    <View>
      <Text style={{
        fontSize: 14, 
        fontWeight: 'bold',
        marginLeft: '2%',
        marginBottom: '2%'}}>
        {item.usuario.nombre} {item.usuario.apellido}:
      </Text>
      <Comment style={{marginBottom: '10%'}}>
        {item.calificacion == 1 ? (
          <Icon
            name="emoticon-happy-outline"
            size={34}
            color={Colors.LIGHTGREEN}
            style={{margin: 5}}
          />
        ) : item.calificacion == 2 ? (
          <Icon
            name="emoticon-neutral-outline"
            size={34}
            color={Colors.GOLD}
            style={{margin: 5}}
          />
        ) : (
          <Icon
            name="emoticon-sad-outline"
            size={34}
            color={Colors.RED}
            style={{margin: 5}}
          />
        )}
        <Text style={{marginLeft: 5, marginRight: '5%'}}>{item.comentario}</Text>
      </Comment>
    </View>
  );

  const handleButtonPress = () => {
    if (usuario != null) {
      setIsVisibleOverlay(true);
    } else {
      Alert.alert(
        'Debe Identificarse',
        'Por favor, inice sesión para realizar un comentario.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'OK', onPress: () => navigation.navigate('Login')},
        ],
      );
    }
  };

  const handleAddCommentButtonPress = async () => {
    let datosNueva = await calificacionesMeta.insert(
      item.comercio.id,
      usuario.id,
      calificacion,
      comentario,
    );
    setCalificacion(null);
    setComentario('');
    let nueva = datosNueva.returning;
    console.log("nueva:")
    console.log(nueva);
    setCalificaciones([...calificaciones, ...nueva])
    console.log(calificaciones);
    setIsVisibleOverlay(false);
  };

  return (
      <View style={{flex: 1, alignItems: 'center', marginTop: '5%'}}>
        <Text h3 style={{margin: 10}}>
          Calificaciones
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: '5%',
            borderBottomColor: Colors.GRAY,
            borderBottomWidth: 1,
            borderTopColor: Colors.GRAY,
            borderTopWidth: 1,
          }}>
          <View style={{flexDirection: 'row', margin: 5}}>
            <Icon
              name="emoticon-happy-outline"
              size={30}
              color={Colors.LIGHTGREEN}
            />
            <Text style={{fontWeight: 'bold', margin: 5}}>
              Buenas: {countCalificaciones[0]}
            </Text>
          </View>
          <View style={{flexDirection: 'row', margin: 5}}>
            <Icon
              name="emoticon-neutral-outline"
              size={30}
              color={Colors.GOLD}
            />
            <Text style={{fontWeight: 'bold', margin: 5}}>
              Medio: {countCalificaciones[1]}
            </Text>
          </View>
          <View style={{flexDirection: 'row', margin: 5}}>
            <Icon name="emoticon-sad-outline" size={30} color={Colors.RED} />
            <Text style={{fontWeight: 'bold', margin: 5}}>
              Malas: {countCalificaciones[2]}
            </Text>
          </View>
          <View
            style={{borderBottomColor: Colors.GRAY, borderBottomWidth: 2}}
          />
        </View>
        <Text h4 style={{marginBottom: '5%'}}>
          Comentarios
        </Text>
        <FlatList
          initialNumToRender={5}
          windowSize={5}
          data={calificaciones}
          ListEmptyComponent={<Text>No hay comentarios aún</Text>}
          ListHeaderComponent={
            <TextButton
              title="Agregar Nuevo Comentario"
              textStyle={{color: Colors.SKYBLUE}}
              onPress={() => handleButtonPress()}
            />}
          ListHeaderComponentStyle={{alignItems: 'center'}}
          renderItem={_renderCalificacion}
          keyExtractor={item => item.id}
          style={{
            flex: 2,
            width: '100%',
            height: '100%',
            borderRadius: 8,
            borderColor: Colors.GRAY,
            borderWidth: 0.5,
          }}
        />
        <Overlay
          isVisible={isVisibleOverlay}
          onBackdropPress={() => setIsVisibleOverlay(false)}
          overlayStyle={{
            width: '80%',
            height: 380,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: '5%'}}>
            Nuevo Comentario:
          </Text>
          <RNPickerSelect
            onValueChange={value => {
              setCalificacion(value);
            }}
            items={calificacionesPosibles.map(calificacion => ({
              label: calificacion.nombre,
              value: calificacion.valor,
            }))}
            value={calificacion}
            placeholder={{label: 'Seleccionar una calificación', value: null}}
          />
          <TextArea
            placeholder={'Escribe un nuevo comentario...'}
            value={comentario}
            style={{marginVertical: '5%', height: '40%'}}
            onChangeText={text => setComentario(text)}
          />
          <FilledButton
            title="Agregar Comentario"
            style={{marginTop: '5%'}}
            onPress={() => handleAddCommentButtonPress()}
          />
        </Overlay>
        {/*<View style={{flex: 1}}>
          {calificaciones.map(calificacion => _renderCalificacion(calificacion))}
        </View>*/}
      </View>
  );
});
