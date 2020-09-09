import React, {useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, ScrollView, Alert} from 'react-native';
import UsuarioService from '@services/UsuarioService';
import Heading from '@components/Heading';
import Input from '@components/Input';
import FilledButton from '@components/FilledButton';
import {registerScreenStyles} from '@styles/styles';

export default function RegisterScreen({navigation}) {
  const [usuarioMeta] = UsuarioService();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');

  const handleRegistro = async () =>{
    const resultado = await usuarioMeta.insert(nombre, apellido, email, password);
    if (resultado){
      navigation.goBack();
      Alert.alert("Felicidades", "Usuario creado con éxito!\n Ahora puede identificarse.")
    }
    else{
      Alert.alert("Error", "No se ha podido crear el usuario.")
    }
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior={'height'} style={registerScreenStyles.container}>
        <Heading style={registerScreenStyles.title}>REGISTRARSE</Heading>
        <Input
          style={registerScreenStyles.input}
          value={nombre}
          onChangeText={text => setNombre(text)}
          placeholder={'Nombre'}
        />
        <Input
          style={registerScreenStyles.input}
          value={apellido}
          onChangeText={text => setApellido(text)}
          placeholder={'Apellido'}
        />
        <Input
          style={registerScreenStyles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder={'Email'}
          keyboardType={'email-address'}
        />
        <Input
          style={registerScreenStyles.input}
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder={'Contraseña'}
          secureTextEntry
        />
        <FilledButton
          title={'Confirmar Registro'}
          style={registerScreenStyles.registerButton}
          onPress={() => {
            handleRegistro();
            //console.log(nombre, apellido, email, password);
          }}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
