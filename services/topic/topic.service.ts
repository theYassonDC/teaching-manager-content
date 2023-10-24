import axios from "axios";
import config_services from "../config";
import { ITopics } from "@/app/api/topic/topic";

export const createTopic = async (body: ITopics) => {
  const { data } = await axios.post(`${config_services.hostUrl}/api/topic`, body)
  return data
}

export const getTopic = async (degreeId: string) => {
  const { data } = await axios.get(`${config_services.hostUrl}/api/topic/` + degreeId)
  return data
}

export const getTopicId = async (id: string) => {
  const { data } = await axios.get(`${config_services.hostUrl}/api/topic/get/` + id)
  return data
}

export const deleteTopic = async (id: string) => {
  const { data } = await axios.delete(`${config_services.hostUrl}/api/topic/delete/`+ id)
  return data
}