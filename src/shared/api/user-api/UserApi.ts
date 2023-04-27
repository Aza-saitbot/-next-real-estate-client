import {AxiosInstance, AxiosResponse} from "axios";
import {CreateUserType, IUser, ReturnTokenType} from "@/shared/api/user-api/model";
import {getDecodedAccessToken} from "@/shared/api/user-api/lib";



export const UserApi = (instance: AxiosInstance) => {
    return {
        getUser: async (requestOptions: CreateUserType): Promise<AxiosResponse<ReturnTokenType>> => {
          return await instance.post<ReturnTokenType>('/auth/login',requestOptions);
        },
        createUser: async (requestOptions: CreateUserType): Promise<AxiosResponse<ReturnTokenType>> =>
            await instance.post<ReturnTokenType>('/auth/registration',requestOptions)
    };
};

