export interface IImage {
    filename: string
    id: number
}
export interface IApartment {
    id: number
    title: string
    currency: string
    price:number
    categoryId: number
    employeeId: number
    address:string
    images:Array<IImage>
}