import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import DEFAULT_IP from '@resources/IPConfig';


const CALIFICACIONES_QUERY = gql `
query CalificacionesQuery {
    calificaciones {
        id
        comentario
        calificacion
        usuario {
          nombre
          apellido
          id
        }
    }
}
`;

const client = new ApolloClient({
    uri: `http://${DEFAULT_IP}:8080/v1/graphql`,
});


export default function UsuarioService() {

    const getAllCalificaciones = () => {
        const response = await client.query({
            query: CALIFICACIONES_QUERY
        });
        return response.data.calificaciones;
    };

    const insertCalificacion = (comentario, calificacion, comercio_id, usuario_id) =>{
        const response = await client.query({
            query: gql `
            mutation InsertCalificacion {
                insert_calificaciones(objects: {comentario: "${comentario}",
                 calificacion: "${calificacion}", comercio_id: ${comercio_id}, usuario_id: ${usuario_id}}) {
                  affected_rows
                }
              }
            `
        });
        return response.data;
    };

    const getCalificacion = (email, password) => {
        const response = await client.query({
            query: gql `
            query GetUsuarioByEmail {
                usuarios(where: {email: {_eq: "${email}"}}) {
                nombre
                apellido
                email
                id
                password
                }
            }              
            `
        });
        const usuario = response.usuario;
        if (usuario.password == password){
            return usuario;
        }
        return "Error: el usuario o la contraseña son incorrectos.";
    };

    const updateCalificacion = (email, nombre, apellido, password) => {
        const response = await client.query({
            query: gql `
            mutation UpdateUsuario {
                update_usuarios(where: {email: {_eq: "${email}"}},
                 _set: {apellido: "${apellido}", nombre: "${nombre}", password: "${password}"}) {
                    affected_rows
                }
            }          
            `
        });
        return response;
    };

    return [{
        getAllUsuarios,
        insertUsuario,
        getUsuario,
        updateUsuario,
    }];
};