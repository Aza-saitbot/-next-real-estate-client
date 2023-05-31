import axios from "@/shared/api/core/axios";
import {GetMeResponse} from "@/shared/api/user/dto/get-me.dto";

export const getMe = async ():Promise<GetMeResponse> => (await axios.get<GetMeResponse>('/users/me')).data
