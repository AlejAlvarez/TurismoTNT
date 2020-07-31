import {createSlice} from '@reduxjs/toolkit';

const filtrosSlice = createSlice({
    name: 'filtros',
    initialState: {
        filtrosAlojamientos: {
            localidades: [],
            categorias: [],
            clasificaciones: [],
        },
        filtrosGastronomicos: {
            localidades: [],
            especialidades: [],
            actividades: [],            
        }
    },
    reducers: {
        agregarFiltroLocalidadAlojamientos: (state, action) => {
            state.filtrosAlojamientos.localidades.push(action.payload);
        },
        agregarFiltroCategoriaAlojamientos: (state, action) => {
            state.filtrosAlojamientos.categorias.push(action.payload);
        },
        agregarFiltroClasificacionesAlojamientos: (state, action) => {
            state.filtrosAlojamientos.clasificaciones.push(action.payload);
        },
        agregarFiltroLocalidadGastronomicos: (state, action) => {
            state.filtrosGastronomicos.localidades.push(action.payload);
        },
        agregarFiltroEspecialidadesGastronomicos: (state, action) => {
            state.filtrosGastronomicos.especialidades.push(action.payload);
        },
        agregarFiltroActividadesGastronomicos: (state, action) => {
            state.filtrosGastronomicos.actividades.push(action.payload);
        },
        quitarFiltroLocalidadAlojamientos: (state, action) => {
            state.filtrosAlojamientos.localidades.splice(state.filtrosAlojamientos.localidades.indexOf(action.payload), 1);
        },
        quitarFiltroCategoriaAlojamientos: (state, action) => {
            state.filtrosAlojamientos.categorias.splice(state.filtrosAlojamientos.categorias.indexOf(action.payload), 1);
        },
        quitarFiltroClasificacionesAlojamientos: (state, action) => {
            state.filtrosAlojamientos.clasificaciones.splice(state.filtrosAlojamientos.clasificaciones.indexOf(action.payload), 1);
        },
        quitarFiltroLocalidadGastronomicos: (state, action) => {
            state.filtrosGastronomicos.localidades.splice(state.filtrosGastronomicos.localidades.indexOf(action.payload), 1);
        },
        quitarFiltroEspecialidadesGastronomicos: (state, action) => {
            state.filtrosGastronomicos.especialidades.splice(state.filtrosGastronomicos.especialidades.indexOf(action.payload), 1);
        },
        quitarFiltroActividadesGastronomicos: (state, action) => {
            state.filtrosGastronomicos.actividades.splice(state.filtrosGastronomicos.actividades.indexOf(action.payload), 1);
        },
    },
});

const selectors = {
    getFiltrosAlojamientos: state => state.filtrosAlojamientos,
    getFiltrosGastronomicos: state => state.filtrosGastronomicos,    
};

export const {getFiltrosAlojamientos, getFiltrosGastronomicos} = selectors;

export default filtrosSlice.reducer;