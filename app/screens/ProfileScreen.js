import React, {useContext} from 'react';
import { Button, View} from 'react-native';
import { Text } from 'react-native-elements';
import UserContext from '@context/UserContext';
import UsuarioService from '@services/UsuarioService';


export default function ProfileScreen({navigation}){
  const [usuarioMeta] = UsuarioService();
  const {usuario, setUsuario} = useContext(UserContext);

  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {
        usuario ? 
        <View>
          <Text h2>Bienvenido, {usuario.nombre}</Text>
          <Button
            title="Salir"
            onPress={() => usuarioMeta.logout()}
          />
        </View>
         : 
        <View>
          <Text>Usted no se encuentra logueado</Text>
          <Button
            title="Iniciar Sesión"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      }
    </View>
  );
}

/*
export default function ProfileScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile Screen</Text>
        <Button
          title="Ir a Home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    );
  }
  */