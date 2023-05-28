import {IEmployee} from "@/shared/api/employee/model";
import axios from "@/shared/api/core/axios";
import {CreateEmployeeDto} from "@/shared/api/employee/dto/create-employee.dto";

export const createEmployee = async (dto:CreateEmployeeDto):Promise<IEmployee> => {
    return (await axios.post('/employee',dto)).data
}

export const getEmployees = async ():Promise<IEmployee[]> => {
    return (await axios.get('/employee')).data
}


