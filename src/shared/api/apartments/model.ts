export interface IImage {
    filename: string
    id: number
}
export interface IApartment {
    id: number
    title: string
    currency: string
    categoryId: number
    employeeId: number

    price: number
    provinces: string
    county: string
    district: string
    lat: string
    lng: string
    description: string
    totalRooms: string
    totalAre: number
    totalFloors: number
    locationFloor: number
    heatingType: string
    images:Array<IImage>
}

export type SchemaApartmentFormType = Omit<IApartment,'id' | 'images'> & {images:File[]}


// interface IApartment {
//     id: number
//     title: string
//     currency: string
//     price: number
//     provinces: string
//     county: string
//     district: string
//     lat: string
//     lng: string
//     description: string
//     totalRooms: string
//     totalAre: number
//     totalFloors: number
//     locationFloor: number
//     heatingType: string
//     categoryId: number
//     employeeId: number
//     images:Array<IImage>
// }