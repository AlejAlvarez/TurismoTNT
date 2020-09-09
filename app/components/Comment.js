import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@styles/colors';


export default Comment = ({style, author, children}) => {
  return(
    <View style={[styles.container, style]}>
      <Text style={styles.author}>{author.nombre} {author.apellido}:</Text>
      <View style={styles.comment}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 30,
    marginHorizontal: 20,
  },
  author: {
    fontSize: 14, 
    fontWeight: 'bold', 
    right: 10, 
    marginBottom: 4
  },
  comment: {
    flexDirection: 'row', 
    backgroundColor: Colors.WHITE, 
    borderRadius: 14, 
    width: "100%", 
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 1 
  },
  content: {
    fontSize: 16, 
    textAlign: 'left',
    margin: 10
  },
});