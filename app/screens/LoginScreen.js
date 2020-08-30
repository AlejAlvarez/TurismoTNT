import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import Heading from '@components/Heading';
import Input from '@components/Input';
import FilledButton from '@components/FilledButton';
import TextButton from '@components/TextButton';

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return(
        <View style={styles.container}>
            <Heading style={styles.title}>IDENTIFICARSE</Heading>
            <Input
                style={styles.input}
                value={email}
                onChangeText={text => setEmail(text)}
                placeholder={'Email'}
                keyboardType={'email-address'} />
            <Input
                style={styles.input}
                value={password}
                onChangeText={text => setPassword(text)}
                placeholder={'Contraseña'}
                secureTextEntry />
            <FilledButton
                title={'Iniciar Sesión'}
                style={styles.loginButton}
                onPress={() =>{console.log(email, password)}} />
            <TextButton
                title={'No tiene una cuenta? Regístrese'}
                style={styles.registerButton}
                onPress={() =>{navigation.navigate("Register")}} />
        </View>
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