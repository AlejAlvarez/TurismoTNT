import React, { useState, useEffect, useContext } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { KeyboardAvoidingView, View, FlatList, ActivityIndicator } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Input from '@components/Input';
import Colors from '@styles/colors';
import Comment from '@components/Comment';
import IconButton from '@components/IconButton';

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

const INSERT_MENSAJE = gql `
  mutation InsertMensaje($text: String!, $userID: Int!) {
    insert_mensajes(objects: {texto: $text, usuario_id: $userID}) {
      affected_rows
    }
  }
`

export default function ChatScreen({ navigation }) {
  const {usuario} = useContext(UserContext);
  const [lastReceivedId, setLastReceivedId] = useState(-1);
  const [lastReceivedTs, setLastReceivedTs] = useState("2020-03-11T19:58:46.987552+00:00");
  // const [nuevosMensajes, setNuevosMensajes] = useState([]);
  const getMensajesQuery = useQuery(GET_MENSAJES, {
    variables: {$last_received_id: lastReceivedId, $last_received_ts: lastReceivedTs},
    pollInterval: 1000,
  });
  const [insertMensaje, { data }] = useMutation(INSERT_MENSAJE);
  const [nuevoMensaje, writeNuevoMensaje] = useState("");


  const agregarNuevoMensaje = async () => {
    if (nuevoMensaje.length !== 0){
      insertMensaje({ variables: { text: nuevoMensaje, userID: usuario.id }})
    }
  }

  // la idea es que aparezca del lado izquierdo
  const _renderMensaje = ({item}) => (
    <View>
      {usuario.email == item.usuario.email ? (
          <Text style={{
            fontSize: 14, 
            fontWeight: 'bold',
            marginLeft: '8%',
            marginBottom: '2%',
            flexDirection: 'row',
            alignSelf: 'flex-start'}}>
            Vos:
          </Text>
      ) : (
          <Text style={{
            fontSize: 14, 
            fontWeight: 'bold',
            marginLeft: '5%',
            marginBottom: '2%',
            flexDirection: 'row',
            alignSelf: 'flex-start'}}>
            {item.usuario.nombre} {item.usuario.apellido}:
          </Text>
      )}
      <Comment style={{marginBottom: '10%'}}>
        <Text style={{marginLeft: '5%', marginRight: 5}}>{item.texto}</Text>
      </Comment>
    </View>
  );


    return (
      <View behavior={'height'} style={{
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
            windowSize={16}
            data={getMensajesQuery.data.mensajes}
            ListHeaderComponentStyle={{alignItems: 'center'}}
            renderItem={_renderMensaje}
            keyExtractor={item => item.id}
            style={{
              flex: 2,
              width: '100%',
              height: '100%',
              borderRadius: 8,
              borderColor: Colors.GRAY,
              borderWidth: 0.5,
              backgroundColor: Colors.WHITE,
              marginBottom: 5,
            }}
          />)}
        <KeyboardAvoidingView behavior={'height'} style={{
        flex: 0.1,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center'}}>
          <Input
            value={nuevoMensaje}
            onChangeText={text => writeNuevoMensaje(text)}
            style={{marginBottom: 10, flex: 8}}
            placeholder={'Introduce aquí tu mensaje...'}
          />
          <IconButton iconName='send' iconSize={30} style={{ position: 'relative', flex:1, justifySelf: 'flex-end', width:35, height: 35 }}
          onPress={() => {
            agregarNuevoMensaje();
            writeNuevoMensaje("");
          }} />
        </KeyboardAvoidingView>
      </View>
    );
  }