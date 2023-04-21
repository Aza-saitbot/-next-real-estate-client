import {AxiosInstance} from "axios";
import {IUser} from "@/shared/api/user-api/model";
import {ApartmentModelType} from "@/entities/apartment/model/apartmentReducer";
import {IApartment} from "@/shared/api/apartments-api/model";


interface IParamsGetApartments {
    limit: number
    page: number
}

export const ApartmentApi = (instance: AxiosInstance) => {
    return {
        getApartments: async (config:IParamsGetApartments):Promise<ApartmentModelType> => {
            try {
                const {limit,page} = config
                const { data } = await instance.get<IApartment[]>('/apartment');
                console.log('data',data)
                const paginatedApartments:IApartment[] = data.slice((page - 1) * limit, page * limit)
                return { apartments:paginatedApartments, total:data.length } 
            }catch (e) {
                return { apartments:[], total:0}
            }
        },
        getOneApartment: async (id: number): Promise<IApartment> => {
            const { data } = await instance.get('/apartment/' + id);
            return data;
        },
    };
};