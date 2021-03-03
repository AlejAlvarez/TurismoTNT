import { gql } from '@apollo/client';


const ALOJAMIENTOS_QUERY = gql `
query AlojamientosQuery {
  alojamientos {
    id
    comercio {
      id
      nombre
      domicilio
      foto
      lat
      lng
      localidad {
        id
        nombre
      }
    }
    categoria {
      id
      estrellas
      valor
    }
    clasificacion {
      id
      nombre
    }
  }
}
`;

const GASTRONOMICOS_QUERY = gql `
query GastronomicosQuery {
  gastronomicos {
    id
    comercio {
      id
      nombre
      domicilio
      foto
      lat
      lng
      localidad {
        id
        nombre
      }
    }
    especialidades_gastronomico {
      especialidad {
        id
        nombre
      }
    }
    actividades_gastronomico {
      actividad {
        id
        nombre
      }
    }
  }
}
`;

const LOCALIDADES_QUERY = gql `
query LocalidadesQuery {
  localidades {
    nombre
    id
  }
}
`;

const CLASIFICACIONES_QUERY = gql `
query ClasificacionesQuery {
  clasificaciones {
    nombre
    id
  }
}
`;

const CATEGORIAS_QUERY = gql `
query CategoriasQuery {
  categorias {
    estrellas
    id
    valor
  }
}
`;

const ESPECIALIDADES_QUERY = gql `
query EspecialidadesQuery {
  especialidades {
    id
    nombre
  }
}
`;

const ACTIVIDADES_QUERY = gql `
query ActividadesQuery {
  actividades {
    id
    nombre
  }
}
`;

const CALIFICACIONES_QUERY = gql`
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

export {
  ALOJAMIENTOS_QUERY,
  GASTRONOMICOS_QUERY,
  LOCALIDADES_QUERY,
  CLASIFICACIONES_QUERY,
  CATEGORIAS_QUERY,
  ESPECIALIDADES_QUERY,
  ACTIVIDADES_QUERY,
  CALIFICACIONES_QUERY
}