import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { client } from '@graphql/client';
import {
  ALOJAMIENTOS_QUERY,
  GASTRONOMICOS_QUERY,
  LOCALIDADES_QUERY,
  CLASIFICACIONES_QUERY,
  CATEGORIAS_QUERY,
  ESPECIALIDADES_QUERY,
  ACTIVIDADES_QUERY
} from '@graphql/queries';

/*
const syncComercios = async () =>{
  const response = await client.query({
    query: COMERCIOS_QUERY
  });
  global.storage.save({
    key: 'alojamiento',
    data: response.data.alojamiento,
    expires: 1000 * 60 * 60 * 24, // 1 day (1000 * 3600 * 24 milliseconds).
  });
  return response.data.alojamiento;  
}
*/

const syncAlojamientos = async () => {
  const response = await client.query({
    query: ALOJAMIENTOS_QUERY
  });
  global.storage.save({
    key: 'alojamientos',
    data: response.data.alojamientos,
    expires: 1000 * 60 * 60 * 24, // 1 day (1000 * 3600 * 24 milliseconds).
  });
  return response.data.alojamientos;
};

const syncLocalidades = async () => {
  const response = await client.query({
    query: LOCALIDADES_QUERY
  });
  global.storage.save({
    key: 'localidades',
    data: response.data.localidades,
    expires: 1000 * 60 * 60 * 24, // 1 day (1000 * 3600 * 24 milliseconds).
  });
  return response.data.localidades;
};

const syncClasificaciones = async () => {
  const response = await client.query({
    query: CLASIFICACIONES_QUERY
  });
  global.storage.save({
    key: 'clasificaciones',
    data: response.data.clasificaciones,
    expires: 1000 * 60 * 60 * 24, // 1 day (1000 * 3600 * 24 milliseconds).
  });
  return response.data.clasificaciones;
};

const syncCategorias = async () => {
  const response = await client.query({
    query: CATEGORIAS_QUERY
  });
  global.storage.save({
    key: 'categorias',
    data: response.data.categorias,
    expires: 1000 * 60 * 60 * 24, // 1 day (1000 * 3600 * 24 milliseconds).
  });
  return response.data.categorias;
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
  return response.data.gastronomicos;
};

const syncEspecialidades = async () => {
  const response = await client.query({
    query: ESPECIALIDADES_QUERY
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
    query: ACTIVIDADES_QUERY
  });
  global.storage.save({
    key: 'actividades',
    data: response.data.actividades,
    expires: 1000 * 60 * 60 * 24, // 1 day (1000 * 3600 * 24 milliseconds).
  });
  return response.data.actividades;
};

const syncUsuarios = async () => {
  const response = await client.query({
    query: USUARIOS_QUERY
  });
  global.storage.save({
    key: 'usuarios',
    data: response.data.usuarios,
    expires: 1000 * 60 * 60 * 24, // 1 day (1000 * 3600 * 24 milliseconds).
  });
  return response.data.usuarios;
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
      //comercios: syncComercios,
      alojamientos: syncAlojamientos,
      localidades: syncLocalidades,
      clasificaciones: syncClasificaciones,
      categorias: syncCategorias,
      gastronomicos: syncGastronomicos,
      especialidades: syncEspecialidades,
      actividades: syncActividades,
      usuarios: syncUsuarios,
    },
  });
};

export {initStorage};