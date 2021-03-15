import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Colors from '@styles/colors';

export default TextArea = ({style, placeholder, value, onChangeText}) => {

  return(
    <TextInput
      style={[styles.container, style]}
      multiline
      scrollEnabled
      onChangeText={onChangeText}
      value={value}
      numberOfLines={10}
      placeholder={placeholder}
    />
  )
}

const styles = StyleSheet.create({
  container:{
    height: '5%',
    width:'80%',
    borderColor: Colors.GRAY,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    textAlign: "left",
    textAlignVertical: "top",
    borderRadius: 10
  }
});
