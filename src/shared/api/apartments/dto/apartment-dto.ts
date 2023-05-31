import {IApartment} from "@/shared/api/apartments/model";
import {GetStaticPropsContextType} from "../../../../../pages";

export type ResponseGetApartments = {
    apartments:IApartment[]
    total:number
}

export type IParamsGetApartments = {
    ctx?:GetStaticPropsContextType
    limit:number
    page:number
}
export type IParamsGetOneApartment = {
    id:string
}