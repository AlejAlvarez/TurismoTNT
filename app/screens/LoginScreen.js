import React, {useState} from 'react';
import {KeyboardAvoidingView, ScrollView, Alert} from 'react-native';
import UsuarioService from '@services/UsuarioService';
import Heading from '@components/Heading';
import Input from '@components/Input';
import FilledButton from '@components/FilledButton';
import TextButton from '@components/TextButton';
import Colors from '@styles/colors';
import {loginScreenStyles} from '@styles/styles';

export default function LoginScreen({navigation}) {
  const [usuarioMeta] = UsuarioService();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () =>{
    const resultado = await usuarioMeta.login(email, password);
    if (resultado){
      navigation.goBack();
    }
    else{
      Alert.alert("Error", "Usuario o contraseña inválidos")
    }
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior={'height'} style={loginScreenStyles.container}>
        <Heading style={loginScreenStyles.title}>IDENTIFICARSE</Heading>
        <Input
          style={loginScreenStyles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder={'Email'}
          keyboardType={'email-address'}
        />
        <Input
          style={loginScreenStyles.input}
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder={'Contraseña'}
          secureTextEntry
        />
        <FilledButton
          title={'Iniciar Sesión'}
          style={loginScreenStyles.loginButton}
          onPress={() => {
            handleLogin();
            //console.log(email, password);
          }}
        />
        <TextButton
          title={'No tiene una cuenta? Regístrese'}
          style={loginScreenStyles.registerButton}
          textStyle={{color: Colors.SKYBLUE}}
          onPress={() => {
            navigation.navigate('Register');
          }}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

