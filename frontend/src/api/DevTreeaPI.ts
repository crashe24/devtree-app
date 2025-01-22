import { isAxiosError } from "axios";
import api from "../config/axios";

export async function getUser() {
    try {
        const { data } = await api.get(`/user`);
        console.log(data)
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          //console.log("error", error.response.data.error);
          throw new Error(error.response.data.error)
        }
      }
}