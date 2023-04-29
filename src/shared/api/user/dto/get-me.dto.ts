export interface IRole {
    value:string
}
export type GetMeResponse = {
    id: number
    email: string
    fullName: string
    roles: Array<IRole>
}