// VITE_API_URL=http://localhost:4000/api/
//  zod para validar
import { isAxiosError } from "axios";
import api from "../config/axios";
import { ProfileForm, UserType } from "../types";

export async function getUser() {
   
    try {
      // tiene un interceptor dentro de axios.ts
      const { data } = await api.get<UserType>(`/user`);
        console.log(data)
       return data 
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          //console.log("error", error.response.data.error);
          throw new Error(error.response.data.error)
        }
      }
}

// para el perfil 
export async function updateUser(formData: ProfileForm) {
   
  try {
    // tiene un interceptor dentro de axios.ts
    const { data } = await api.patch<String>(`/user`, formData);
      console.log(data)
     return data 
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        console.log("error", error.response.data.error);
        throw new Error(error.response.data.error)
      }
    }
}