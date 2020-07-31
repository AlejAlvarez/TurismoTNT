import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const LOAD_GASTRONOMICOS = 'gastronomicos/loadGastronomicos';

export const loadGastronomicos = createAsyncThunk(
  LOAD_GASTRONOMICOS,
  async () => {
    const response = await global.storage.load({
      key: 'gastronomicos',
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

const gastronomicosSlice = createSlice({
  name: 'gastronomicos',
  initialState: {
    data: [],
    isLoading: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    // you can mutate state directly, since it is using immer behind the scenes
    [loadGastronomicos.pending]: state => {
      console.log("Cargando...");
      state.data = [];
      state.isLoading = true;
      state.error = false;
    },
    [loadGastronomicos.fulfilled]: (state, action) => {
      console.log("Completado...");
      state.data = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    [loadGastronomicos.rejected]: state => {
      console.log("Rechazado...");
      state.data = [];
      state.isLoading = false;
      state.error = true;
    },
  },
});

const selectors = {
  getAll: state => state.gastronomicos.data, // Object.values(state.gastronomicos.data),
  filterByNombre: (state, nombre) => state.gastronomicos.data.filter( gastronomico => gastronomico.nombre.toLowerCase().includes(nombre.toLowerCase())),
  getOne: (state, id) => state.gastronomicos.data.find(gastronomico => gastronomico.id == id),
  // filterByAttributes: (state, atributos) => {
  //   let gastronomicos = state.gastronomicos.data;


  // },
  isError: state => state.gastronomicos.error,
  isLoading: state => state.gastronomicos.isLoading,
};

export const {success, failure, startLoading} = gastronomicosSlice.actions;
export const {getAll, getOne, filterByNombre, isError, isLoading} = selectors;

export default gastronomicosSlice.reducer;