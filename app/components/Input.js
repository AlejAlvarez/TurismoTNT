import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import Colors from '@styles/colors';

export default function Input({style, ...props}) {
    return <TextInput {...props} style={[style, styles.input]} />
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: Colors.WHITE,
        width: '90%',
        padding: 8,
        borderRadius: 8,
        elevation: 2,
    }
})