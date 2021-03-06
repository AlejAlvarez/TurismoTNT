import React from 'react';
import { Button, View, Text } from 'react-native';

export default function FavouritesScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Favourites Screen</Text>
        <Button
          title="Ir a Home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    );
  }