import React from 'react';
import { Text } from 'react-native-elements';
import Colors from '@styles/colors';
import { TouchableOpacity, StyleSheet } from 'react-native';

export default function FilledButton({title, style, onPress}){
    return(
        <TouchableOpacity
            style={[style, styles.button]}
            onPress={onPress}>
            <Text style={styles.text}>{title.toUpperCase()}</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    button: {
      width: '90%',
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
    },
    text: {
        textAlign: 'center',
        fontSize: 13,
        color: Colors.SKYBLUE,
    }
  });
