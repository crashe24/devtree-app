import { isAxiosError } from "axios";
import api from "../config/axios";

export async function getUser() {
    try {
        const { data } = await api.post(`/auth/login`, formData);
        localStorage.setItem("AUTH_TOKEN", data);
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          console.log("error", error.response.data.error);
        }
      }
}