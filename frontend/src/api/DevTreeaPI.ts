// VITE_API_URL=http://localhost:4000/api/
//  zod para validar
import { isAxiosError } from "axios";
import api from "../config/axios";
import { ProfileForm, RegisterForm, UserHandle, UserType } from "../types";

export async function getUser() {
    try {
      // tiene un interceptor dentro de axios.ts
      const { data } = await api.get<UserType>(`/user`);
       return data 
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          throw new Error(error.response.data.error)
        }
      }
}

// para el perfil 
export async function updateProfile(formData: ProfileForm) {
   
  try {
    // tiene un interceptor dentro de axios.ts
    const { data } = await api.patch<string>(`/user`, formData);
     return data 
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        console.log("error", error.response.data.error);
        throw new Error(error.response.data.error)
      }
    }
}

export async function login( formData: {email: string, password: string}) {
  try {
    const { data } = await api.post(`/auth/login`, formData);
    return data  
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log("error", error.response.data.error);
      throw new Error(error.response.data.error)
    }
  }
}

export async function uploadImage (file: File) {
  const formData = new FormData()
  formData.append('file',file)
  try {
   // const {data: {image}}: { data: {image:string}} = await api.post('/user/image',formData)
   const {data} = await api.post('/user/image',formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log("error", error.response.data.error);
      throw new Error(error.response.data.error)
    }
  }
}

export async function getUserByHandle( handle: string) {
  try {
    const {data} = await api.get<UserHandle>(`/${handle}`)
    return data 
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log("error", error.response.data.error);
      throw new Error(error.response.data.error)
    }
  }
}

export async function searchByHandle( handle: string) {
  try {
    const {data} = await api.post<string>(`/search`, {handle})
    return data 
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log("error", error.response.data.error);
      throw new Error(error.response.data.error)
    }
  }
}

export async function registerUser(formData: RegisterForm) {
  try {
    const { data } = await api.post(`/auth/register`, formData);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log("error", error.response.data.error);
      throw new Error(error.response.data.error)
    }
  }
}