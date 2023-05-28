import {IApartment} from "@/shared/api/apartments/model";
import axios from "@/shared/api/core/axios";
import {IParamsGetApartments, ResponseGetApartments} from "@/shared/api/apartments/dto/apartment-dto";
import {setApartments} from "@/entities/apartment/model";




export const getApartments = async (props:IParamsGetApartments):Promise<ResponseGetApartments> => {
    try {
        const {limit,page,ctx} = props
        const listApartments = await axios.get<IApartment[]>('/apartment')
        ctx?.store.dispatch(setApartments({apartments:listApartments.data,total:listApartments.data.length}))
        const paginatedApartments:IApartment[] = listApartments.data.slice((page - 1) * limit, page * limit)
        return { apartments:paginatedApartments, total:listApartments.data.length }
    }catch (e) {
        return { apartments:[], total:0}
    }
}