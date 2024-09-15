
export const fetchData = async (api:string)=>{
    const response = await fetch(
        api
      );
      return response
}