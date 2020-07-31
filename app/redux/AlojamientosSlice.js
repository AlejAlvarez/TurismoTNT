import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const LOAD_ALOJAMIENTOS = 'alojamientos/loadAlojamientos';

export const loadAlojamientos = createAsyncThunk(
  LOAD_ALOJAMIENTOS,
  async () => {
    const response = await global.storage.load({
      key: 'alojamientos',
      autoSync: true,
      syncInBackground: true
    }).then(data => {
      return data;
    }).catch(err => {
      console.warn(err.message);
    });

    return(response);
  },
);

const alojamientosSlice = createSlice({
  name: 'alojamientos',
  initialState: {
    data: [],
    isLoading: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    // you can mutate state directly, since it is using immer behind the scenes
    [loadAlojamientos.pending]: state => {
      console.log("Cargando...");
      state.data = [];
      state.isLoading = true;
      state.error = false;
    },
    [loadAlojamientos.fulfilled]: (state, action) => {
      console.log("Completado...");
      state.data = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    [loadAlojamientos.rejected]: state => {
      console.log("Rechazado...");
      state.data = [];
      state.isLoading = false;
      state.error = true;
    },
  },
});

const selectors = {
  getAll: state => state.alojamientos.data, // Object.values(state.alojamientos.data),
  filterByNombre: (state, nombre) => state.alojamientos.data.filter( alojamiento => alojamiento.nombre.toLowerCase().includes(nombre.toLowerCase())),
  getOne: (state, id) => state.alojamientos.data.find(alojamiento => alojamiento.id == id),
  // filterByAttributes: (state, atributos) => {
  //   let alojamientos = state.alojamientos.data;


  // },
  isError: state => state.alojamientos.error,
  isLoading: state => state.alojamientos.isLoading,
};

export const {success, failure, startLoading} = alojamientosSlice.actions;
export const {getAll, getOne, filterByNombre, isError, isLoading} = selectors;

export default alojamientosSlice.reducer;