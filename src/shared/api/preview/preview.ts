import {CreatePreviewDTO} from "@/shared/api/preview/dto/create-preview";
import axios from "../core/axios";

export const createPreview = async (dto:FormData):Promise<Array<string>> =>
  (await axios.post<Array<string>>('/files/preview', dto)).data