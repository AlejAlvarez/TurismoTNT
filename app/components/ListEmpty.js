import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ListEmpty() {
    return (
      //View to show when list is empty
      <View style={styles.MainContainer}>
        <Text style={{ textAlign: 'center' }}>No se han encontrado resultados :(</Text>
      </View>
    )};


const styles = StyleSheet.create({
    MainContainer: {
      justifyContent: 'center',
      flex: 1,
      margin: 10,
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });