import {AuthUserDTO, LoginFormDTO, AuthResponseDTO, RegisterFormDTO} from "@/shared/api/auth/dto/auth-dto";
import axios from "@/shared/api/core/axios";
import {destroyCookie} from "nookies";

export const toggle = async (dto:AuthUserDTO ):Promise<AuthResponseDTO> => {
    const {url,...payload} = dto
    return (await axios.post(`/auth/${url}`,payload)).data
}

export const logout = () => {
    destroyCookie(null,'_token',{path:'/'})
}