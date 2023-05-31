import {IApartment} from "@/shared/api/apartments/model";
import axios from "@/shared/api/core/axios";
import {
    IParamsGetApartments,
    IParamsGetOneApartment,
    ResponseGetApartments
} from "@/shared/api/apartments/dto/apartment-dto";
import {setApartments} from "@/entities/apartment/model";




export const getApartments = async (requestOptions:IParamsGetApartments):Promise<ResponseGetApartments> => {
    try {
        const {limit,page,ctx} = requestOptions
        const listApartments = await axios.get<IApartment[]>('/apartment')
        ctx?.store.dispatch(setApartments({apartments:listApartments.data,total:listApartments.data.length}))
        const paginatedApartments:IApartment[] = listApartments.data.slice((page - 1) * limit, page * limit)
        return { apartments:paginatedApartments, total:listApartments.data.length }
    }catch (e) {
        return { apartments:[], total:0}
    }
}

export const getOneApartmentAPI = async (id:string):Promise<IApartment> =>
    (await axios.get<IApartment>(`/apartment/${id}`)).data