import { IUserWeb } from "@/app/api/users/user";
import axios from "axios";

export const registerUser = async (body: IUserWeb | any) => {
  const { data } = await axios.post('/api/users', body)
  return data
}