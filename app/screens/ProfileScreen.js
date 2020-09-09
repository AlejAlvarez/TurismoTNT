import React, {useState, useEffect, useContext} from 'react';
import {View, TouchableOpacity, Alert} from 'react-native';
import {Text, Overlay} from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCmmunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserContext from '@context/UserContext';
import UsuarioService from '@services/UsuarioService';
import FilledButton from '@components/FilledButton';
import TextButton from '@components/TextButton';
import Input from '@components/Input';
import Colors from '@styles/colors';
import { profileScreenStyles } from '@styles/styles';

export default function ProfileScreen({navigation}) {
  const [overlayConfiguracion, setOverlayConfiguracion] = useState(false);
  const [email, setEmail] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [apellido, setApellido] = useState(null);
  const [password, setPassword] = useState(null);
  const [usuarioMeta] = UsuarioService();
  const {usuario} = useContext(UserContext);

  useEffect(() => {
    if (usuario){
      setEmail(usuario.email);
      setNombre(usuario.nombre);
      setApellido(usuario.apellido);
      setPassword(usuario.password);
    }else{
      setEmail(null);
      setNombre(null);
      setApellido(null);
      setPassword(null);
    }
  }, [usuario]);

  const updateUsuario = async () =>{
    const nuevoEmail = email;
    const nuevoNombre = nombre;
    const nuevoApellido = apellido;
    const nuevoPassword = password;
    // Por algun motivo el updateEmail parece no estar funcionando
    if (nuevoEmail != usuario.email){
      isDisponible = await usuarioMeta.checkEmail(nuevoEmail);
      if (isDisponible){
        usuarioMeta.updateEmail(usuario.email, nuevoEmail);
      }
      else{
        Alert.alert("Error", "Email no disponible.")
      }
    }
    if(nuevoNombre != usuario.nombre
      || nuevoApellido != usuario.apellido || nuevoPassword != usuario.password){
        // Utilizamos el email del usuario, porque tal vez se cambio el email en el paso anterior
        // y de ser así probablemente se haya recargado esta pagina, y el usuario que se encuentre
        // en el context, por lo que ese usuario tendra el email actualizado, pero el resto
        // de los datos no
        await usuarioMeta.update(usuario.email, nuevoNombre, nuevoApellido, nuevoPassword);
      }
  };

  const dropUsuario = async () =>{
    await usuarioMeta.drop(email);
    usuarioMeta.logout();
  };

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
                <Text h3 >
                  {usuario.nombre} {usuario.apellido}
                </Text>
                <Text style={{fontSize: 16}}>{usuario.email}</Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', paddingTop: 30}}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  marginRight: 50,
                  marginBottom: 34,
                }}
                onPress={() =>
                  usuarioMeta.logout()
                }>
                <MaterialCmmunityIcon
                  name="logout"
                  size={20}
                  color={Colors.RED}
                />
                <Text
                  style={{
                    fontSize: 14,
                    marginLeft: 5,
                    marginTop: 2,
                    color: Colors.RED,
                  }}>
                  Cerrar Sesión
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flexDirection: 'row', marginLeft: 50, marginBottom: 34}}
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
            </View>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: 'black',
                width: 320,
                bottom: 30,
              }}
            />
          </View>
          <View style={{flex: 2, alignItems: 'center', bottom: 10}}>
            <Text h4 style={{color:Colors.ORANGE, right: 72}}>Calificaciones:</Text>
          </View>
          <Overlay
            isVisible={overlayConfiguracion}
            onBackdropPress={() => setOverlayConfiguracion(false)}
            overlayStyle = {{height:500, width:300, alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>Editar Perfil</Text>
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
                setOverlayConfiguracion(false);
                //console.log(nombre, apellido, email, password);
              }}
            />
            <TextButton
              title={'Eliminar Cuenta'}
              textStyle={profileScreenStyles.dropButton}
              onPress={() => {
                Alert.alert(
                  'Está seguro?',
                  'Desea eliminar la cuenta?',
                  [
                    {
                      text: 'Cancelar',
                      onPress: () => console.log('Cancelo eliminación de cuenta'),
                      style: {backgroundColor: Colors.SKYBLUE}
                    },
                    { text: 'Confirmar',
                    style: {backgroundColor: Colors.RED},
                    onPress: () => {
                      console.log('Elimina cuenta');
                      dropUsuario();
                    } }
                  ],
                );
              }}
            />
          </Overlay>
        </View>
      ) : (
        <View style={profileScreenStyles.container}>
          <Text h3 style={{marginTop: 86, marginBottom:124, marginHorizontal: 42}}>Aún no ha iniciado sesión...</Text>
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
