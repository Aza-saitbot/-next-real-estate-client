import {IApartment} from "@/shared/api/apartments/model";
import axios from "@/shared/api/core/axios";
import {
    IParamsGetApartments,
    ResponseGetApartments
} from "@/shared/api/apartments/dto/apartment-dto";
import {setApartments, uploadImages} from "@/entities/apartment/model";

export const getAllApartmentsAPI = async (): Promise<IApartment[]> =>
    (await axios.get<IApartment[]>('/apartment')).data

export const getApartments = async (requestOptions: IParamsGetApartments): Promise<ResponseGetApartments> => {
    try {
        const listApartments = await getAllApartmentsAPI()
        const {limit, page, ctx} = requestOptions
        ctx?.store.dispatch(setApartments({apartments: listApartments, total: listApartments.length}))
        const paginatedApartments: IApartment[] = listApartments.slice((page - 1) * limit, page * limit)
        return {apartments: paginatedApartments, total: listApartments.length}
    } catch (e) {
        return {apartments: [], total: 0}
    }
}

export const createApartmentAPI = async (requestOptions: FormData): Promise<IApartment> =>
    (await axios.post<IApartment>('apartment', requestOptions)).data

export const getOneApartmentAPI = async (id: string): Promise<IApartment> =>
    (await axios.get<IApartment>(`/apartment/${id}`)).data

export const uploadImagesAPI = async (images:FormData): Promise<Array<string>> =>
    (await axios.post<Array<string>>('upload/images',images)).data