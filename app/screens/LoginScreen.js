import React, {useState} from 'react';
import {StyleSheet, KeyboardAvoidingView, ScrollView, Alert} from 'react-native';
import UsuarioService from '@services/UsuarioService';
import Heading from '@components/Heading';
import Input from '@components/Input';
import FilledButton from '@components/FilledButton';
import TextButton from '@components/TextButton';

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
      <KeyboardAvoidingView behavior={'height'} style={styles.container}>
        <Heading style={styles.title}>IDENTIFICARSE</Heading>
        <Input
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder={'Email'}
          keyboardType={'email-address'}
        />
        <Input
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder={'Contraseña'}
          secureTextEntry
        />
        <FilledButton
          title={'Iniciar Sesión'}
          style={styles.loginButton}
          onPress={() => {
            handleLogin();
            //console.log(email, password);
          }}
        />
        <TextButton
          title={'No tiene una cuenta? Regístrese'}
          style={styles.registerButton}
          onPress={() => {
            navigation.navigate('Register');
          }}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    marginBottom: 26,
  },
  input: {
    marginVertical: 10,
  },
  loginButton: {
    marginVertical: 30,
  },
  registerButton: {
    marginVertical: 0,
  },
});
