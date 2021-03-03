import {useContext} from 'react';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import DEFAULT_IP from '@resources/IPConfig';
import UserContext from '@context/UserContext';


const USUARIOS_QUERY = gql `
query UsuarioQuery {
  usuario {
    id
    nombre
    apellido
    email
    password
  }
}
`;

const client = new ApolloClient({
  uri: `http://${DEFAULT_IP}:8080/v1/graphql`,
});


export default function UsuarioService() {
  const {usuario, setUsuario} = useContext(UserContext);

  // Me parece al pedo esta funcion
  const getAll = async () => {
    const response = await client.query({
      query: USUARIOS_QUERY
    });
    return response.data.usuarios;
  };

  // Nos devuelve un objeto insert_usuarios dentro de data,
  // donde existe un arreglo llamado returning.
  // En este arreglo tenemos el nombre, apellido y email del nuevo usuario.
  const insert = async (nombre, apellido, email, password) =>{
    const response = await client.mutate({
      mutation: gql `
        mutation InsertUsuario {
          insert_usuarios(objects: {nombre: "${nombre}", apellido: "${apellido}",
            email: "${email}", password: "${password}"}) {
            affected_rows
            returning {
              id
            }
          }
        }
      `
    });
    if (response.data.insert_usuarios.returning.length != 0){
      return true;
    }
    return false;
    // if (nombre){
    //   return true;
    // }
    // return false;
  };

  const get = async email =>{
    const response = await client.query({
      query: gql `
        query GetUsuarioByEmail {
            usuarios(where: {email: {_eq: "${email}"}}) {
            nombre
            apellido
            email
            id
          }
        }
      `
    });
    return response.data.usuarios[0];
  };

  const login = async (email, password) => {
    const response = await client.query({
      query: gql `
        query GetUsuarioForLogin {
            usuarios(where: {email: {_eq: "${email}"}, password: {_eq: "${password}"}}) {
            id
            nombre
            apellido
            email
            password
          }
        }
      `
    });
    if (response.data.usuarios.length != 0){
      const usuario = response.data.usuarios[0];
      setUsuario(usuario);
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setUsuario(null);
  };

  const updateUltimaVez = async (user_id) => {
    const response = await client.mutate({
      mutation: gql `
        mutation UpdateUltVez {
          update_usuarios(
            where: {
              id: {_eq: ${user_id}}
            }, 
            _set: {
              ultima_vez: "now()"
            })
            {
              affected_rows
            }
        }
      `
    });
    return response.data;
  }

  const update = async (email, nombre, apellido, password) => {
    const response = await client.mutate({
      mutation: gql `
        mutation UpdateUsuario {
          update_usuarios(where: {email: {_eq: "${email}"}},
            _set: {nombre: "${nombre}", apellido: "${apellido}", password: "${password}"}) {
              affected_rows
              returning {
                id
                nombre
                apellido
                email
                password
              }
          }
        }
      `
    });
    if (response.data.update_usuarios.returning.length != 0){
      const usuario = response.data.update_usuarios.returning[0];
      setUsuario(usuario);
      return true;
    }
    return false;
  };

  const checkEmail = async email => {
    const response = await client.query({
      query: gql `
        query CheckEmail {
          usuarios(where: {email: {_eq: "${email}"}}) {
            id
          }
        }
      `
    });
    if (response.data.usuarios.length === 0) {
      return true;
    }
    return false;
  };

  const updateEmail = async (email, nuevoEmail) => {
    const response = await client.mutate({
      mutation: gql `
        mutation UpdateEmail {
          update_usuarios(where: {email: {_eq: "${email}"}}, _set: {email: "${nuevoEmail}"}) {
            affected_rows
            returning {
              id
              nombre
              apellido
              email
              password
            }
          }
        }
      `
    });
    if (response.data.update_usuarios.returning.length != 0){
      const usuario = response.data.update_usuarios.returning[0];
      setUsuario(usuario);
      return true;
    }
    return false;
  }

  const drop = async email => {
    const response = await client.mutate({
      mutation: gql `
        mutation MyMutation {
          delete_usuarios(where: {email: {_eq: "${email}"}}) {
            affected_rows
            returning {
              nombre
              apellido
              email
            }
          }
        }      
      `
    });
    if (response.data.delete_usuarios.returning.length != 0){
      setUsuario(null);
      return response.data.delete_usuarios.returning[0];
    }
    return false;
  }

  return [{
    getAll,
    get,
    insert,
    update,
    checkEmail,
    updateEmail,
    drop,
    login,
    logout,
    updateUltimaVez,
  }];
};
