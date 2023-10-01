import axios from "axios";

export default {
    findAll: async function (take: number, skip: number) {
        return await axios.get(`${import.meta.env.VITE_SERVER_HOST_API}receipts?take=${take}&skip=${skip}`);
      },
      findById: async function (id: string) {
        return await axios.get(`${import.meta.env.VITE_SERVER_HOST_API}receipts/${id}`);
      },
}
