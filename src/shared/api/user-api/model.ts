export interface IRole {
    id: number
    value:string
    description: string
}

export type IUser = {
    id: number
    email: string
    roles: Array<string>
} | null

export type CreateUserType = {
    email: string;
    password: string;
}

export type ReturnTokenType = {
    token: string;
}