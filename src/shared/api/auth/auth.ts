import {AuthUserDTO, LoginFormDTO, LoginResponseDTO, RegisterFormDTO} from "@/shared/api/auth/dto/auth-dto";
import axios from "@/shared/api/core/axios";
import {destroyCookie} from "nookies";

export const registration = async (dto:RegisterFormDTO):Promise<LoginResponseDTO> => {
return (await axios.post('/auth/registration',dto)).data
}

export const login = async (dto:LoginFormDTO):Promise<LoginResponseDTO> => {
    return (await axios.post('/auth/login',dto)).data
}

export const toggle = async (dto:AuthUserDTO ):Promise<LoginResponseDTO> => {
    const {url,...payload} = dto
    return (await axios.post(`/auth/${url}`,payload)).data
}

export const logout = () => {
    destroyCookie(null,'_token',{path:'/'})
}