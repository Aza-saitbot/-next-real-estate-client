import {IApartment} from "@/shared/api/apartments-api/model";

export type ApartmentsPageProps = {
    apartments: Array<IApartment>
    total: number
    currentPage:number
    perPage:number
}