import * as api from "@/shared/api";
import {setAllCategories, setAllEmployees} from "@/entities/apartment/model";
import {GetServerSidePropsType} from "@/shared/types/types";

export const getCategoriesEmployees = async (ctx:GetServerSidePropsType) => {
    try {
        const employees = await api.employee.getEmployees()
        const categories = await api.category.getCategories()
        ctx.store.dispatch(setAllEmployees(employees))
        ctx.store.dispatch(setAllCategories(categories))
    }catch (e) {}
}