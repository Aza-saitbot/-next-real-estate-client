export type LoginFormDTO = {
    email: string
    password: string
}

export type RegisterFormDTO = {
    email: string
    password: string
    fullName: string
}

export type AuthUserDTO = {
    url: 'login' | 'registration'
    email: string
    password: string
    fullName?: string
}

export type LoginResponseDTO = {
    token: string
}