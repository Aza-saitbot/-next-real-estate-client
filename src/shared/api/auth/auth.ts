import {LoginFormDTO, LoginResponseDTO} from "@/shared/api/auth/dto/auth-dto";
import axiosInstance from "@/shared/api/core/axiosInstance";



export const login = async (dto:LoginFormDTO):Promise<LoginResponseDTO> => {
return (await axiosInstance.post('/auth/registration',dto)).data
}