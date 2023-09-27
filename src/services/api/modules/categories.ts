import axios from "axios"

export default{
    create: async (newData: any)=>{
        return await axios.post(import.meta.env.VITE_SERVER_HOST_API + "categories",newData,
        {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
    },
    findMany: async () => {
        return await axios.get(import.meta.env.VITE_SERVER_HOST_API + "categories")
    },
}