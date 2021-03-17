import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import {View, TouchableOpacity, Alert, FlatList, KeyboardAvoidingView} from 'react-native';
import {Text, Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
import UserContext from '@context/UserContext';
import UsuarioService from '@services/UsuarioService';
import CalificacionesService from '@services/CalificacionesService';
import FilledButton from '@components/FilledButton';
import TextButton from '@components/TextButton';
import IconButton from '@components/IconButton';
import Comment from '@components/Comment';
import Input from '@components/Input';
import Colors from '@styles/colors';
import {profileScreenStyles} from '@styles/styles';

export default function ProfileScreen({navigation}) {
  const [usuarioMeta] = UsuarioService();
  const {usuario} = useContext(UserContext);
  const [calificacionesMeta] = CalificacionesService();
  const [overlayConfiguracion, setOverlayConfiguracion] = useState(false);
  const [email, setEmail] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [apellido, setApellido] = useState(null);
  const [password, setPassword] = useState(null);
  const [calificaciones, setCalificaciones] = useState([]);
  const [calificacionSelecc, setCalificacionSelecc] = useState(null);
  const [isVisibleOverlay, setIsVisibleOverlay] = useState(false);
  const [calificacion, setCalificacion] = useState(null);
  const [comentario, setComentario] = useState('');
  const calificacionesPosibles = [
    {valor: 1, nombre: 'Buena'},
    {valor: 2, nombre: 'Medio'},
    {valor: 3, nombre: 'Mala'},
  ];

  const fetchCalificaciones = async () => {
    let response = await calificacionesMeta.getByUsuario(usuario.id);
    console.log(response);
    setCalificaciones(response);
  };

  useEffect(() => {
    if (usuario == null) {
      setEmail(null);
      setNombre(null);
      setApellido(null);
      setPassword(null);
      setCalificaciones(null);
    } else {
      setEmail(usuario.email);
      setNombre(usuario.nombre);
      setApellido(usuario.apellido);
      setPassword(usuario.password);
      fetchCalificaciones();
    }
  }, [usuario]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () =>
        usuario && (
          <IconButton
            name="gear"
            iconSize={34}
            iconColor="black"
            onPress={() => {
              Alert.alert('Aiuda', 'NO ME VEO');
            }}
          />
        ),
      headerRight: () =>
        usuario ? (
          <IconButton
            iconName="login"
            iconSize={34}
            iconColor={Colors.RED}
            onPress={() => {
              usuarioMeta.logout();
            }}
          />
        ) : (
          <IconButton
            iconName="logout"
            iconSize={34}
            iconColor={Colors.AQUABLUE}
            onPress={() => {
              navigation.navigate('Login');
            }}
          />
        ),
    });
  }, [navigation, usuario]);

  const updateUsuario = async () => {
    const nuevoEmail = email;
    const nuevoNombre = nombre;
    const nuevoApellido = apellido;
    const nuevoPassword = password;
    // Por algun motivo el updateEmail parece no estar funcionando
    if (nuevoEmail != usuario.email) {
      isDisponible = await usuarioMeta.checkEmail(nuevoEmail);
      if (isDisponible) {
        usuarioMeta.updateEmail(usuario.email, nuevoEmail);
      } else {
        Alert.alert('Error', 'Email no disponible.');
      }
    }
    if (
      nuevoNombre != usuario.nombre ||
      nuevoApellido != usuario.apellido ||
      nuevoPassword != usuario.password
    ) {
      // Utilizamos el email del usuario, porque tal vez se cambio el email en el paso anterior
      // y de ser así probablemente se haya recargado esta pagina, y el usuario que se encuentre
      // en el context, por lo que ese usuario tendra el email actualizado, pero el resto
      // de los datos no
      await usuarioMeta.update(
        usuario.email,
        nuevoNombre,
        nuevoApellido,
        nuevoPassword,
      );
    }
    setOverlayConfiguracion(false);
  };

  const dropUsuario = async () => {
    await usuarioMeta.drop(email);
    usuarioMeta.logout();
  };

  const handleUpdateButtonPress = async () => {
    await calificacionesMeta.update(calificacionSelecc.id, calificacion, comentario);
    let index = calificaciones.findIndex(c => c.id == calificacionSelecc.id);
    let calificacionesActualizadas = [...calificaciones];
    let calificacionMin = {
      calificacion,
      comentario
    };
    let calificacionActualizada = {...calificacionSelecc, ...calificacionMin};
    calificacionesActualizadas.splice(index, 1, calificacionActualizada);
    setCalificaciones(calificacionesActualizadas);
    setIsVisibleOverlay(false);
  };

  const handleDeleteButtonPress = async () => {
    await calificacionesMeta.drop(calificacionSelecc.id);
    let index = calificaciones.findIndex(c => c.id == calificacionSelecc.id);
    let calificacionesActualizadas = [...calificaciones];
    calificacionesActualizadas.splice(index, 1);
    setCalificaciones(calificacionesActualizadas);
    setIsVisibleOverlay(false);
  };
  
  const _renderCalificacion = ({item}) => (
    <View>
      <Text style={{fontSize: 12, fontWeight: 'bold', margin: '2%' }}>
        En {item.comercio.nombre}
      </Text>
      <TouchableOpacity
        onPress={() => {
          setCalificacionSelecc(item);
          setCalificacion(item.calificacion);
          setComentario(item.comentario);
          setIsVisibleOverlay(true);
        }}>
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
            <Text style={{marginLeft: 5, marginRight: '5%'}}>
              {item.comentario}
            </Text>
        </Comment>
      </TouchableOpacity>
    </View>
  );

  const getCalificaciones = () => {
    return calificaciones;
  }

  return (
    <View style={{flex: 1}}>
      {usuario ? (
        <View style={profileScreenStyles.mainContainer}>
          <View style={profileScreenStyles.profileContainer}>
            <View style={profileScreenStyles.profileDataContainer}>
              <FontAwesomeIcon
                name="user-circle-o"
                size={80}
                color="black"
                style={{alignSelf: 'flex-start'}}
              />
              <View style={{alignSelf: 'flex-end', paddingLeft: 20}}>
                <Text h3>
                  {usuario.nombre} {usuario.apellido}
                </Text>
                <Text style={{fontSize: 16}}>{usuario.email}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignSelf: 'flex-start',
                marginTop: '6%',
              }}
              onPress={() => setOverlayConfiguracion(true)}>
              <FontAwesomeIcon name="gear" size={20} color={Colors.SKYBLUE} />
              <Text
                style={{
                  fontSize: 14,
                  marginLeft: 5,
                  marginTop: 2,
                  color: Colors.SKYBLUE,
                }}>
                Editar Perfil
              </Text>
            </TouchableOpacity>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: 'black',
                width: 320,
                bottom: 30,
              }}
            />
          </View>
          <View style={{flex: 2, alignItems: 'center'}}>
            <Text h4 style={{color: Colors.ORANGE, marginBottom: '4%'}}>
              Calificaciones:
            </Text>
            <FlatList
              initialNumToRender={5}
              windowSize={5}
              data={getCalificaciones()}
              ListEmptyComponent={
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text>
                    No has realizado ningún comentario aún
                  </Text>
                </View>
              }
              renderItem={_renderCalificacion}
              keyExtractor={item => item.id}
              style={{
                borderRadius: 8,
                borderColor: Colors.GRAY,
                borderWidth: 0.5,
              }}
            />
          </View>
          {calificacionSelecc &&
          <KeyboardAvoidingView behavior="heigth">
            <Overlay
              isVisible={isVisibleOverlay}
              onBackdropPress={() => setIsVisibleOverlay(false)}
              overlayStyle={{
                width: '80%',
                height: 450,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10}}>
                Comentario en {calificacionSelecc.comercio.nombre}:
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
                style={{marginVertical: 10, height: 140}}
                onChangeText={text => setComentario(text)}
              />
              <FilledButton
                title="Editar Comentario"
                style={{marginTop: 10}}
                onPress={() => handleUpdateButtonPress()}
              />
              <FilledButton
                title="Eliminar Comentario"
                style={{marginTop: 10, backgroundColor: Colors.RED}}
                onPress={() => handleDeleteButtonPress()}
              />
            </Overlay>
          </KeyboardAvoidingView>}
          <Overlay
            isVisible={overlayConfiguracion}
            onBackdropPress={() => setOverlayConfiguracion(false)}
            overlayStyle={{height: 540, width: '84%', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>
              Editar Perfil
            </Text>
            <Text style={profileScreenStyles.inputText}>Nombre:</Text>
            <Input
              style={profileScreenStyles.input}
              value={nombre}
              onChangeText={text => setNombre(text)}
              placeholder={'Nombre'}
            />
            <Text style={profileScreenStyles.inputText}>Apellido:</Text>
            <Input
              style={profileScreenStyles.input}
              value={apellido}
              onChangeText={text => setApellido(text)}
              placeholder={'Apellido'}
            />
            <Text style={profileScreenStyles.inputText}>Email:</Text>
            <Input
              style={profileScreenStyles.input}
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder={'Email'}
              keyboardType={'email-address'}
            />
            <Text style={profileScreenStyles.inputText}>Contraseña:</Text>
            <Input
              style={profileScreenStyles.input}
              value={password}
              onChangeText={text => setPassword(text)}
              placeholder={'Contraseña'}
              secureTextEntry
            />
            <FilledButton
              title={'Confirmar'}
              style={profileScreenStyles.confirmButton}
              onPress={() => {
                updateUsuario();
                //console.log(nombre, apellido, email, password);
              }}
            />
            <TextButton
              title={'Eliminar Cuenta'}
              textStyle={profileScreenStyles.dropButton}
              onPress={() => {
                Alert.alert('Está seguro?', 'Desea eliminar la cuenta?', [
                  {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancelo eliminación de cuenta'),
                    style: {backgroundColor: Colors.SKYBLUE},
                  },
                  {
                    text: 'Confirmar',
                    style: {backgroundColor: Colors.RED},
                    onPress: () => {
                      console.log('Elimina cuenta');
                      dropUsuario();
                    },
                  },
                ]);
              }}
            />
          </Overlay>
        </View>
      ) : (
        <View style={profileScreenStyles.container}>
          <Text
            h3
            style={{marginTop: 86, marginBottom: 124, marginHorizontal: 42}}>
            Aún no ha iniciado sesión...
          </Text>
          <FilledButton
            title={'Identificarse'}
            style={profileScreenStyles.loginButton}
            onPress={() => {
              navigation.navigate('Login');
            }}
          />
        </View>
      )}
    </View>
  );
}
