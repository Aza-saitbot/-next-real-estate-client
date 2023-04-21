import {AxiosInstance} from "axios";
import {IUser} from "@/shared/api/models";


export const UserApi = (instance: AxiosInstance) => {
    return {
        // getMe: async (): Promise<IUser> => {
        //     const { data } = await instance.get('/auth/me');
        //     return data;
        // },
        getUserInfo: async (id: number): Promise<IUser> => {
            const { data } = await instance.get('/users/' + id);
            return data;
        },
    };
};
