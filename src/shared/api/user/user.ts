import {CreateUserType, ReturnTokenType} from "@/shared/api/user/model";
import axios from "@/shared/api/core/axios";

export const createUser = async (requestOptions: CreateUserType): Promise<ReturnTokenType> =>
    (await axios.post<ReturnTokenType>('/auth/registration',requestOptions)).data

