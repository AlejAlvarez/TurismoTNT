import { useState, useEffect } from 'react';

export default function GastronomicosService(){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
  
        try {
          const localData = await global.storage.load({key: 'gastronomicos'});
          setData(localData);
        } catch (error) {
          console.warn(error);
          setIsError(true);
        }
        setIsLoading(false);
      };
  
      fetchData();
    }, []);
  
    return [{data, isLoading, isError}];
};