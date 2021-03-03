import { gql } from '@apollo/client';
import client from '@graphql/client';

export default function MensajesService() {

  const getMessages = async () => {
    const response = await client.query({
      query: gql `
        query MyQuery {
          mensajes(where: {timestamp: {_lte: "now() - interval '1 day'"}}) {
            id
            mensaje
            timestamp
            usuario {
              id
              apellido
              nombre
            }
          }
        }
      `,
    });
    return response.data.mensajes;    
  }

}