import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '@styles/colors';
import {TouchableOpacity, StyleSheet} from 'react-native';

export default function IconButton({iconName, iconSize, style, onPress}) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}>
        <Icon
          name = {iconName}
          size = {iconSize}
        />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width:50, height:50,
    backgroundColor: Colors.WHITE,
    borderRadius:30,
    alignItems: 'center',
    justifyContent:'center',
  },
});
