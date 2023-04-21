export interface IRole {
    id: number
    value:string
    description: string
}

export interface IUser {
    id: number
    email:string
    password:string
    ban: boolean
    banReason: null | string
    roles: IRole[],
    posts: string [],
    basket: null,
    ratings: []
}