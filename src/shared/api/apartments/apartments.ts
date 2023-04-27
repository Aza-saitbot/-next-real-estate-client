import {ApartmentModelType, IApartment} from "@/shared/api/apartments/model";
import axiosInstance from "@/shared/api/core/axiosInstance";


interface IParamsGetApartments {
    limit: number
    page: number
}

export const getApartments = async (config:IParamsGetApartments):Promise<ApartmentModelType> => {
    try {
        const {limit,page} = config
        const listApartments = await axiosInstance.get<IApartment[]>('/apartment')
        const paginatedApartments:IApartment[] = listApartments.data.slice((page - 1) * limit, page * limit)
        return { apartments:paginatedApartments, total:listApartments.data.length }
    }catch (e) {
        return { apartments:[], total:0}
    }
}