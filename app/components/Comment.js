import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@styles/colors';


export default Comment = ({style, author, children}) => {
  return(
      <View style={[styles.comment, style]}>
        {children}
      </View>
  )
}

const styles = StyleSheet.create({
  author: {
    fontSize: 14, 
    fontWeight: 'bold', 
    right: 10, 
    marginBottom: 4
  },
  comment: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: '5%',
    backgroundColor: Colors.WHITE, 
    borderRadius: 14,
    borderWidth: 1,
    width: "90%",
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 1,
  },
});