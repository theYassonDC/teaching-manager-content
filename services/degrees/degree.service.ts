import { IDegree } from "@/app/api/degrees/create/degree";
import axios from "axios";
import config_services from "../config";

export const createDegree = async (body: IDegree) => {
  const { data } = await axios.post(`${config_services.hostUrl}/api/degrees/create`, body)
  return data
}

export const getDegrees = async () => {
  const { data } = await axios.get(`${config_services.hostUrl}/api/degrees/all`)
  return data
}

export const getDegree = async (param: string) => {
  const { data } = await axios.get(`${config_services.hostUrl}/api/degrees/get/` + param)
  return data
}

export const deleteDegree = async (param: string) => {
  const { data } = await axios.delete(`${config_services.hostUrl}/api/degrees/delete/` + param)
  return data
}