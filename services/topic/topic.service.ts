import axios from "axios";
import config_services from "../config";
import { ITopics } from "@/app/api/topic/create/topic";

export const createTopic = async (body: ITopics) => {
  const { data } = await axios.post(`${config_services.hostUrl}/api/topic/create`, body)
  return data
}

export const getTopic = async (degreeId: string) => {
  const { data } = await axios.get(`${config_services.hostUrl}/api/topic/` + degreeId)
  return data
}