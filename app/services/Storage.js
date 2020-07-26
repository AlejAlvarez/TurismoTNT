import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import DEFAULT_IP from '@resources/IPConfig';

const ALOJAMIENTOS_URL = `http://${DEFAULT_IP}:3000/alojamientos?select=id,nombre,domicilio,lat,lng,foto,clasificacion:clasificaciones(id,nombre),categoria:categorias(id,estrellas,valor),localidad:localidades(id,nombre)`;

const GASTRONOMICOS_QUERY = gql `
query MyQuery {
  gastronomicos {
    domicilio
    foto
    id
    lat
    lng
    localidade {
      id
      nombre
    }
    nombre
    actividad_gastronomicos {
      actividade {
        id
        nombre
      }
    }
    especialidad_gastronomicos {
      especialidade {
        id
        nombre
      }
    }
  }
}
`

const client = new ApolloClient({
  uri: `http://${DEFAULT_IP}:8080/v1/graphql`,
});

// AlojamientosService.js
// export function syncAlojamientos
const syncAlojamientos = async () => {
  const response = await axios.get(ALOJAMIENTOS_URL);
  global.storage.save({
    key: 'alojamientos',
    data: response.data,
    expires: 1000 * 60 * 60 * 24, // 1 day (1000 * 3600 * 24 milliseconds).
  });
  return response.data;
};

const syncLocalidades = async () => {
  const response = await axios.get(`http://${DEFAULT_IP}:3000/localidades`);
  global.storage.save({
    key: 'localidades',
    data: response.data,
    expires: 1000 * 60 * 60 * 24, // 1 day (1000 * 3600 * 24 milliseconds).
  });
  return response.data;
};

const syncClasificaciones = async () => {
  const response = await axios.get(`http://${DEFAULT_IP}:3000/clasificaciones`);
  global.storage.save({
    key: 'clasificaciones',
    data: response.data,
    expires: 1000 * 60 * 60 * 24, // 1 day (1000 * 3600 * 24 milliseconds).
  });
  return response.data;
};

const syncCategorias = async () => {
  const response = await axios.get(`http://${DEFAULT_IP}:3000/categorias`);
  global.storage.save({
    key: 'categorias',
    data: response.data,
    expires: 1000 * 60 * 60 * 24, // 1 day (1000 * 3600 * 24 milliseconds).
  });
  return response.data;
};

const syncGastronomicos = async () => {
  const response = await client.query({
    query: GASTRONOMICOS_QUERY
  });
  global.storage.save({
    key: 'gastronomicos',
    data: response.data.gastronomicos,
    expires: 1000 * 60 * 60 * 24, // 1 day (1000 * 3600 * 24 milliseconds).
  });
  console.log(response.data.gastronomicos);
  return response.data.gastronomicos;
};

const syncEspecialidades = async () => {
  const response = await client.query({
    query: gql `
      query MyQuery {
        especialidades {
          id
          nombre
        }
      }`
  });
  global.storage.save({
    key: 'especialidades',
    data: response.data.especialidades,
    expires: 1000 * 60 * 60 * 24, // 1 day (1000 * 3600 * 24 milliseconds).
  });
  return response.data.especialidades;
};

const syncActividades = async () => {
  const response = await client.query({
    query: gql `
      query MyQuery {
        actividades {
          id
          nombre
        }
      }`
  });
  global.storage.save({
    key: 'actividades',
    data: response.data.actividades,
    expires: 1000 * 60 * 60 * 24, // 1 day (1000 * 3600 * 24 milliseconds).
  });
  return response.data.actividades;
};

const initStorage = () => {
  global.storage = new Storage({
    // maximum capacity, default 1000 key-ids
    size: 1000,

    // Use AsyncStorage for RN apps, or window.localStorage for web apps.
    // If storageBackend is not set, data will be lost after reload.
    storageBackend: AsyncStorage, // for web: window.localStorage

    // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: 1000 * 3600 * 24,

    // cache data in the memory. default is true.
    enableCache: true,

    // if data was not found in storage or expired data was found,
    // the corresponding sync method will be invoked returning
    // the latest data.
    sync: {
      alojamientos: syncAlojamientos,
      localidades: syncLocalidades,
      clasificaciones: syncClasificaciones,
      categorias: syncCategorias,
      gastronomicos: syncGastronomicos,
      especialidades: syncEspecialidades,
      actividades: syncActividades,
    },
  });
};

export {initStorage};