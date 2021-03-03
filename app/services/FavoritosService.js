import AsyncStorage from '@react-native-community/async-storage';

export default function AlojamientosFavService() {
  const key = 'alojamientosFav';

  const agregarFavorito = async item => {
    let nuevoFav = item;
    nuevoFav.recuerdos = [];
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      let localData;
      if (jsonValue !== null) {
        console.log("Ya habían cosas cargadas antes");
        localData = JSON.parse(jsonValue);
        localData = [...localData, nuevoFav];
      }
      else{
        console.log("jsonValue es Null");
        localData = [nuevoFav];
      };
      let localDataJson = JSON.stringify(localData);
      await AsyncStorage.setItem(key, localDataJson);
      console.log("Se agregó el favorito");
      console.log("Valor de localData: ");
      console.log(localData);
    } catch (error) {
      console.warn(error);
    }
  };

  const eliminarFavorito = async item => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue !== null) {
        console.log("Ya habían cosas cargadas antes");
        let localData = JSON.parse(jsonValue);
        let i = localData.findIndex(favorito => favorito.id == item.id);

        if (i !== -1){
            localData = localData
                .slice(0, i)
                .concat(localData.slice(i + 1, localData.length));
            
            let localDataJson = JSON.stringify(localData);
            await AsyncStorage.setItem(key, localDataJson);
            console.log("Se eliminó el favorito");
            console.log("Estado de la store");
            console.log(localData);
        }
      }
      else{
        console.log("jsonValue es Null");
        console.log("No se encontró el favorito");
      };
    } catch (error) {
      console.warn(error);
    };
  };

  const esFavorito = async item => {
    try{
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue !== null){
            let localData = JSON.parse(jsonValue);
            return localData.findIndex(favorito => favorito.id == item.id) > -1;
        }
        return false;
    } catch (error){
        console.warn(error);
    }
  };
  
  const getFavoritos = async () =>{
    try{
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue !== null){
            let localData = JSON.parse(jsonValue);
            return localData;
        }
        return [];
    } catch (error){
        console.warn(error);
    }
  };

  const getRecuerdos = async item =>{
    try{
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue !== null){
            let localData = JSON.parse(jsonValue);
            let favorito = localData.find( favorito => favorito.id == item.id );
            if (favorito !== null){
                return favorito.recuerdos;
            }
        }else{
            console.warn("No se encontró el favorito");
        }
    }catch(e){
        console.warn(e);
    };      
  }

  const agregarRecuerdo = async (item, source) => {
    try{
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue !== null){
            let localData = JSON.parse(jsonValue);
            let favorito = localData.find( favorito => favorito.id == item.id );
            if (favorito !== null){
                favorito.recuerdos.push(source.uri);
                await AsyncStorage.setItem(key, JSON.stringify(localData));
                console.log("Se agregó el recuerdo");
                console.log("El favorito quedó: ", favorito);
            }
        }else{
            console.warn("No se encontró el favorito");
        }
    }catch(e){
        console.warn(e);
    };
  };

  const eliminarRecuerdo = async (item, source) => {
    try{
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue !== null){
            let localData = JSON.parse(jsonValue);
            let favorito = localData.find( favorito => favorito.id === item.id );
            if (favorito !== null){
                let recuerdos = favorito.recuerdos;
                let i = recuerdos.findIndex(recuerdo => recuerdo === source.uri);

                if(i !== -1){
                    recuerdos = recuerdos
                        .slice(0, i)
                        .concat(recuerdos.slice(i + 1, recuerdos.length));
                    favorito.recuerdos = recuerdos;

                    await AsyncStorage.setItem(key, JSON.stringify(localData));
                    console.log("Se elimino el recuerdo");
                    console.log("El favorito quedó: ", favorito);
                }
                else{
                    console.log("No se encontró el recuerdo");
                };
            }
            else{
                console.log("No se encontró el favorito");
            }
        }
    }catch(e){
        console.warn(e);
    }
  };

  return [
    {
      eliminarFavorito,
      agregarFavorito,
      esFavorito,
      getFavoritos,
      getRecuerdos,
      agregarRecuerdo,
      eliminarRecuerdo,
    },
  ];
}
