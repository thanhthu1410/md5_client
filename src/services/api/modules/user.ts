import axios from "axios"

export default {
    googleLogin: async (data: any) => {
        console.log("data",data);
        
        return await axios.post(
            import.meta.env.VITE_SERVER_HOST_API + "users/google-login",
            data,
        )
    },
    register: async (newUser: any)=>{
        return await axios.post(import.meta.env.VITE_SERVER_HOST_API + "users",newUser)
        .then(res => res)
        .catch(err => err)
    },
    login: async (data: any)=>{
        return await axios.post(import.meta.env.VITE_SERVER_HOST_API + "authen/login",data)
        .then(res => res)
        .catch(err => err)
    },
     authencation: async () => {
         return await axios.get(import.meta.env.VITE_SERVER_HOST_API + "authen")
     },
     resetpassword:async (data: any) => {
        return await axios.post(import.meta.env.VITE_SERVER_HOST_API + "users/reset-password", data)
     },
     changepassword:async (data: any) => {
        return await axios.post(import.meta.env.VITE_SERVER_HOST_API + "users/change-password", data)
     },
     updateAvatar:async (newAvatar: any) => {
        return await axios.post(import.meta.env.VITE_SERVER_HOST_API + "users/updateAvatar", newAvatar, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },)
     },
     updateProfile:async (newInfor: any) => {
        return await axios.post(import.meta.env.VITE_SERVER_HOST_API + "users/updateProfile", newInfor)
     },
     resendEmail: async () => {
        return await axios.get(import.meta.env.VITE_SERVER_HOST_API + "users/resend-email")
    },

}

