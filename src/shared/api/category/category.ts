import axios from "@/shared/api/core/axios";
import {CreateCategoryDto} from "@/shared/api/category/dto/create-category.dto";
import {ICategory} from "@/shared/api/category/model";

export const createCategoryAPI = async (dto:CreateCategoryDto):Promise<ICategory> => {
    return (await axios.post('/employee',dto)).data
}

export const getCategories = async ():Promise<ICategory[]> => {
    return (await axios.get('/category')).data
}