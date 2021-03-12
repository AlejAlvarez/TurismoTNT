import React, { useState, useEffect, useContext } from 'react';
import { gql, useSubscription, useQuery, useMutation } from '@apollo/client';
import { ScrollView, KeyboardAvoidingView, View, FlatList, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import Input from '@components/Input';
import Colors from '@styles/colors';
import Comment from '@components/Comment';

const GET_MENSAJES = gql`
  query GetMensajesQuery($last_received_id: Int, $last_received_ts: timestamptz){
    mensajes (
      order_by: {
        timestamp: desc
      }
      where: {
        _and: {
          id: {
            _neq: $last_received_id
          },
          timestamp: {
            _gte: $last_received_ts
          }
        }
      }
    ) {
      id
      texto
      usuario {
        id
        nombre
        apellido
        email
      }
      timestamp
    }
  }
`

const SUBSCRIBE_TO_NEW_MENSAJES = gql`
  subscription SubscribeToNewMessages{
    mensaje ( order_by: id_desc limit: 1) {
      id
      usuario {
        id
        nombre
        apellido
        email
      }
      texto
      timestamp
    }
  }
`

const ADD_MENSAJE = gql `
  mutation MyMutation {
    insert_mensajes(objects: {texto: "Mensaje de prueba 1", usuario_id: 1}) {
      affected_rows
    }
  }
`

export default function ChatScreen({ navigation }) {
  const {usuario} = useContext(UserContext);
  const [lastReceivedId, setLastReceivedId] = useState(-1);
  const [lastReceivedTs, setLastReceivedTs] = useState("2018-08-21T19:58:46.987552+00:00");
  const [mensajes, setMensajes] = useState([]);
  // const [nuevosMensajes, setNuevosMensajes] = useState([]);
  const getMensajesQuery = useQuery(GET_MENSAJES, {
    variables: {$last_received_id: lastReceivedId, $last_received_ts: lastReceivedTs},
    pollInterval: 1000,
  });
  const newMensajeSubscription = useSubscription(SUBSCRIBE_TO_NEW_MENSAJES);
  const [agregarMensaje, { data }] = useMutation(ADD_MENSAJE);
  const [nuevoMensaje, writeNuevoMensaje] = useState("");

  const setLastReceivedVars = () => {
    if (mensajes.length !== 0) {
      console.log("contenido de variable mensajes: " + mensajes);
      setLastReceivedId(mensajes[mensajes.length - 1].id);
      setLastReceivedTs(mensajes[mensajes.length - 1].timestamp);
    } else {
      setLastReceivedId(-1);
      setLastReceivedTs("2018-08-21T19:58:46.987552+00:00");
    }
  }

  // chequeo que haya nuevos mensajes
  const hayNuevosMensajes = (mensajesNuevos) => {
    let resultado = mensajesNuevos.every(msj => mensajes.includes(msj));
    // negamos el resultado, dado que esto nos retorna true para la sentencia
    // "cada mensaje nuevo esta incluido en la lista de mensajes que ya teniamos"
    console.log("resultado de hayNuevosMensajes(): " + resultado);
    return !resultado;
  }

  const actualizarMensajes = (mensajesNuevos) => {
    let mensajesActualizados = [ ...mensajes, ...mensajesNuevos];
    setMensajes(mensajesActualizados);
  }

  const fetchMensajes = async () => {
    if (!getMensajesQuery.loading) {
      if (getMensajesQuery.data) {
        console.log("contenido de getMensajesQuery.data: ");
        console.log(getMensajesQuery.data);
        console.log("contenido de primer mensaje: ");
        console.log(getMensajesQuery.data.mensajes[0]);
        console.log("id de primer mensaje: ");
        console.log(getMensajesQuery.data.mensajes[0].id);
        if (hayNuevosMensajes(getMensajesQuery.data.mensajes)){
          actualizarMensajes(getMensajesQuery.data.mensajes);
          setLastReceivedVars();
        }
      }
    }
  }

  const insertMensaje = async () => {
    if (nuevoMensaje.length !== 0){
      agregarMensaje({ variables: { mensaje: nuevoMensaje }})
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchMensajes();
    });
    return unsubscribe;
  }, [navigation]);

  // la idea es que aparezca del lado izquierdo
  const _renderMensaje = ({item}) => (
    <View>
      <Text style={{
        fontSize: 14, 
        fontWeight: 'bold',
        marginLeft: '2%',
        marginBottom: '2%'}}>
        {item.usuario.nombre} {item.usuario.apellido} - {item.timestamp}:
      </Text>
      <Comment style={{marginBottom: '10%'}}>
        <Text style={{marginLeft: 5, marginRight: '5%'}}>{item.texto}</Text>
      </Comment>
    </View>
  );


    return (
      <KeyboardAvoidingView behavior={'height'} style={{
        flex: 1,
        alignItems: 'center'}}>
        {getMensajesQuery.loading ? (
          <View>
            <ActivityIndicator style={{flex: 1}} animating size="large" />
            <Text>Cargando mensajes...</Text>
          </View>
        ) : getMensajesQuery.error ? (
        <View>
          <Text>Error en la carga de mensajes: </Text>
          <Text>{getMensajesQuery.error}</Text>
        </View>
        ) : (
          <FlatList
            inverted
            initialNumToRender={8}
            windowSize={10}
            data={getMensajesQuery.data.mensajes}
            ListHeaderComponentStyle={{alignItems: 'center'}}
            renderItem={_renderMensaje}
            keyExtractor={item => item.id}
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              borderRadius: 8,
              borderColor: Colors.GRAY,
              borderWidth: 0.5,
              backgroundColor: Colors.WHITE,
              margin: 50,
            }}
          />)}
        <Input
          value={nuevoMensaje}
          onChangeText={text => writeNuevoMensaje(text)}
          onSubmitEditing={agregarMensaje}
          style={{marginBottom: 20}}
          placeholder={'Introduce aquí tu mensaje...'}
        />
      </KeyboardAvoidingView>
    );
  }

  
      {/*<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Acá va a ir un Chat</Text>
        <Button
          title="Ir a Home"
          onPress={() => navigation.navigate('Home')}
        />
    </View>*/}