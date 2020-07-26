import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {keyBy} from 'lodash';

const FETCH_ALOJAMIENTOS = 'alojamientos/fetchAlojamientos';
const ALOJAMIENTOS_URL = 'http://10.0.2.2:3000/alojamientos?select=id,nombre,domicilio,lat,lng,foto,clasificacion:clasificaciones(id,nombre),categoria:categorias(id,estrellas,valor),localidad:localidades(id,nombre)';

export const fetchAlojamientos = createAsyncThunk(
  FETCH_ALOJAMIENTOS,
  async () => {
    const response = await axios.get(ALOJAMIENTOS_URL);
    return response.data;
  },
);

const alojamientosSlice = createSlice({
  name: 'alojamientos',
  initialState: {
    data: {},
    isFetching: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    // you can mutate state directly, since it is using immer behind the scenes
    [fetchAlojamientos.pending]: state => {
      state.data = [];
      state.isFetching = true;
      state.error = false;
    },
    [fetchAlojamientos.fulfilled]: (state, action) => {
      state.data = keyBy(action.payload, 'id');
      state.isFetching = false;
      state.error = false;
    },
    [fetchAlojamientos.rejected]: state => {
      state.data = [];
      state.isFetching = false;
      state.error = true;
    },
  },
});

const selectors = {
  getAll: state => Object.values(state.alojamientos.data), // Object.values(state.alojamientos.data),
  getOne: (state, id) => state.alojamientos.data[id],
  getByName: (state, nombre) => Object.values(state.alojamientos.data).filter( alojamiento => alojamiento.nombre.toLowerCase().includes(nombre.toLowerCase())),
  isError: state => state.alojamientos.error,
  isFetching: state => state.alojamientos.isFetching,
};

export const {success, failure, startFetching} = alojamientosSlice.actions;
export const {getAll, getOne, getByName, isError, isFetching} = selectors;

export default alojamientosSlice.reducer;