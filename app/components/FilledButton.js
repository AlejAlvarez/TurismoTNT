import React from 'react';
import {Text} from 'react-native-elements';
import Colors from '@styles/colors';
import {TouchableOpacity, StyleSheet} from 'react-native';

export default function FilledButton({title, style, onPress}) {
  return (
    <TouchableOpacity style={[ styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 250,
    padding: 20,
    backgroundColor: Colors.AQUABLUE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
});
