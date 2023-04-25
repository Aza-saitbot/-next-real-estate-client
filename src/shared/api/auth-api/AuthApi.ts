import {AxiosInstance} from "axios";
import jwt from 'jsonwebtoken';
import {IUser} from "@/shared/api/models";
import {CreateUserType, ReturnTokenType} from "@/shared/api/auth-api/model";


export const AuthApi = (instance: AxiosInstance) => {
    return {
        login: async (body: CreateUserType): Promise<IUser> => {
            const { data:{token} } = await instance.post<ReturnTokenType>('/auth/login',body);
            const decodedToken = jwt.decode(token);
            return {} as IUser;
        },
        registration: async (body: CreateUserType): Promise<IUser> => {
            const { data:{token} } = await instance.post<ReturnTokenType>('/auth/registration',body);
            return {} as IUser;
        },
    };
};
