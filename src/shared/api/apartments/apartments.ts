import {ApartmentModelType, IApartment} from "@/shared/api/apartments/model";
import axios from "@/shared/api/core/axios";


interface IParamsGetApartments {
    limit: number
    page: number
}

export const getApartments = async (config:IParamsGetApartments):Promise<ApartmentModelType> => {
    try {
        const {limit,page} = config
        const listApartments = await axios.get<IApartment[]>('/apartment')
        const paginatedApartments:IApartment[] = listApartments.data.slice((page - 1) * limit, page * limit)
        return { apartments:paginatedApartments, total:listApartments.data.length }
    }catch (e) {
        return { apartments:[], total:0}
    }
}