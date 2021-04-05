import { gql, useMutation } from '@apollo/client';
import { client } from '@graphql/client';
import { CALIFICACIONES_QUERY } from '@graphql/queries';

const ELIMINAR_CALIFICACION = gql`
mutation eliminar_calificacion ($calificacion_id: Int!) {
  delete_calificaciones(where: {id: {_eq: $calificacion_id}}) {
    affected_rows
  }
}`

export default function CalificacionesService() {
  const [eliminarCalificacion] = useMutation(ELIMINAR_CALIFICACION, {
    refetchQueries: [{
      query: CALIFICACIONES_QUERY
    }]
  });
  
  const getAll = async () => {
    const response = await client.query({
      query: CALIFICACIONES_QUERY,
    });
    return response.data.calificaciones;
  };

  const getByComercio = async comercio_id => {
    const response = await client.query({
      query: gql`
            query getCalificacionesComercio {
              calificaciones(where: {comercio_id: {_eq: ${comercio_id}}}) {
                id
                calificacion
                comentario
                comercio {
                  nombre
                }
                usuario {
                  nombre
                  apellido
                }
              }
            }
            `,
    });
    return response.data.calificaciones;
  };  
  
  const getByID = async id => {
    const response = await client.query({
      query: gql`
          query MyQuery {
            calificaciones(where: {id: {_eq: ${id}}}) {
              id
              calificacion
              comentario
              comercio {
                nombre
              }
              usuario {
                nombre
                apellido
              }
            }
          }
            `,
    });
    return response.data.calificaciones;
  };

  const getByUsuario = async usuario_id => {
    const response = await client.query({
      query: gql`     
          query getCalificacionesUsuario {
            calificaciones(where: {usuario_id: {_eq: ${usuario_id}}}) {
              id
              calificacion
              comentario
              comercio {
                nombre
              }
              usuario {
                nombre
                apellido
              }
            }
          }
        `,
    });
    return response.data.calificaciones;
  };

  const countByComercioYCalificacion = async (comercio_id, calificacion) => {
    const response = await client.query({
      query: gql`     
          query getCountByComercioYCalificacion {
            calificaciones_aggregate(where: {comercio_id: {_eq: ${comercio_id}}, calificacion: {_eq: ${calificacion}} }) {
              aggregate {
                count
              }
            }
          }
        `,
    });
    return response.data.calificaciones_aggregate.aggregate.count;
  };

  const insert = async (comercio_id, usuario_id, calificacion, comentario) => {
    const response = await client.mutate({
      mutation: gql`
        mutation InsertCalificacion {
            insert_calificaciones(objects: {comentario: "${comentario}",
              calificacion: "${calificacion}", comercio_id: ${comercio_id}, usuario_id: ${usuario_id}}) {
              affected_rows
              returning {
                calificacion
                comentario
                id
                usuario {
                  nombre
                  apellido
                }
                comercio {
                  nombre
                }
              }
            }
          }
        `,
    });
    return response.data.insert_calificaciones;
  };

  const update = async (calificacion_id, calificacion, comentario) => {
    const response = await client.mutate({
      mutation: gql`
        mutation updateCalificacion {
          update_calificaciones(where: {id: {_eq: ${calificacion_id}}}, 
            _set: {calificacion: "${calificacion}", comentario: "${comentario}"}) {
            affected_rows
            returning {
              calificacion
              comentario
              id
              usuario {
                nombre
                apellido
              }
            }
          }
        }
      `,
    });
    return response.data.update_calificaciones;
  };

  const drop = async calificacion_id => {
    const response = await eliminarCalificacion({
      variables: { calificacion_id },
      update(cache) {
        cache.modify({
          fields: {
            calificaciones(existingCalificacionesRefs, { readField }) {
              return existingCalificacionesRefs.filter(
                calificacionRef => calificacion_id !== readField(calificacion_id, calificacionRef),
                );
              },
            },
          });
        },
      });
    console.log("Respuesta: " + response);
    return response;
  };

  return [
    {
      getAll,
      getByUsuario,
      getByComercio,
      countByComercioYCalificacion,
      insert,
      update,
      drop,
      getByID
    },
  ];
}
