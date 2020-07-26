import React from 'react';
import { Button, View, Text } from 'react-native';

export default function AlojamientosFilterScreen({ navigation }) {

  const _getAlojamientos = () => {
    global.storage.load({
      key: 'localidades',
      autoSync: true,
      syncInBackground: true
    })
    .then(ret => {
      ret.forEach(localidad => (console.log(localidad.nombre)));
    })
    .catch(err => {
      console.warn(err.message);
    });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Alojamientos Filter Screen</Text>
      <Button
        title="Loguear localidades"
        onPress={() => _getAlojamientos()}
      />
      <Button
        title="Ir a Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}