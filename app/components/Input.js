import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import Colors from '@styles/colors';

export default function Input({style, ...props}) {
    return <TextInput {...props} style={[style, styles.input]} />
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: Colors.LIGHTGRAY,
        width: '90%',
        padding: 8,
        borderRadius: 8,
    }
})