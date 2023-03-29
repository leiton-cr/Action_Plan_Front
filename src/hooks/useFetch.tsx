const useFetch = () => {
 
    const getData = async (url: string) => {
      const data = await fetch(url).then((data) => data.json());
      return data;
    };
  
    const deleteData = async (url: string) => {
      const config = {
        method: "delete",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      };
  
      return await fetch(url, config).then((data) => data.json());
    };
  
    const postData = async (url: string, payload: any) => {
      const config = {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(payload),
      };
      
      return await fetch(url, config).then((data) => data.json());
    };
  
    const putData = async (url: string, payload: any) => {
      const config = {
        method: "put",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(payload),
      };
      return await fetch(url, config).then((data) => data.json());
    };
  
    return { getData, postData, putData, deleteData };
  };
  
  export default useFetch;
  