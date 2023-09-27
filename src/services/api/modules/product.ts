import axios from "axios"

export default {
  create: async (newData: any) => {
    return await axios.post(import.meta.env.VITE_SERVER_HOST_API + "products", newData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
  createOption: async (newData: any) => {
    return await axios.post(import.meta.env.VITE_SERVER_HOST_API + "product-options", newData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
  findMany: async () => {
    return await axios.get(import.meta.env.VITE_SERVER_HOST_API + "products")
  },
  findByCategoryId: async (categoryId: string) => {
    return await axios.get(import.meta.env.VITE_SERVER_HOST_API + "products/listProduct/" + categoryId)
  },
  findProductById: async (id: string) => {
    return await axios.get(import.meta.env.VITE_SERVER_HOST_API + "products/" + id)
  },
  search: async (keysearch: string) => {
    return await axios.get(import.meta.env.VITE_SERVER_HOST_API + `products?search=${keysearch}`)
  },
}