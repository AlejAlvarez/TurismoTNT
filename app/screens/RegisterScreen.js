import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Heading from '@components/Heading';
import Input from '@components/Input';
import FilledButton from '@components/FilledButton';

export default function RegisterScreen({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");

    return(
        <View style={styles.container}>
            <Heading style={styles.title}>REGISTRARSE</Heading>
            <Input
                style={styles.input}
                value={nombre}
                onChangeText={text => setNombre(text)}
                placeholder={'Nombre'} />
            <Input
                style={styles.input}
                value={apellido}
                onChangeText={text => setApellido(text)}
                placeholder={'Email'} />
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
                style={styles.registerButton}
                onPress={() =>{console.log(nombre, apellido, email, password)}} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
    },
    title: {
        marginBottom: 26,
    },
    input: {
        marginVertical: 10,
    },
    registerButton: {
        marginVertical: 30,
    },
});