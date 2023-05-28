import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IApartment} from "@/shared/api/models";
import {IEmployee} from "@/shared/api/employee/model";
import {ICategory} from "@/shared/api/category/model";
import {RootState} from "@/app/store/types";
import {HYDRATE} from "next-redux-wrapper";
import {ResponseGetApartments} from "@/shared/api/apartments/dto/apartment-dto";


export type ApartmentModelType = {
    apartments:IApartment[]
    total:number
    employees: IEmployee[]
    categories:ICategory[]
}
const initialState: ApartmentModelType = {
    apartments:[],
    total:0,
    employees:[],
    categories:[]
}

const apartmentModel = createSlice({
    name: 'apartment',
    initialState,
    reducers: {
        setApartments: (state, action: PayloadAction<ResponseGetApartments>) => {
            state.apartments = action.payload.apartments
            state.total = action.payload.total
        },
        setAllEmployees: (state, action: PayloadAction<IEmployee[]>) => {
            state.employees = action.payload
        },
        addEmployee: (state, action: PayloadAction<IEmployee>) => {
            state.employees.push(action.payload)
        },
        setAllCategories: (state, action: PayloadAction<ICategory[]>) => {
            state.categories = action.payload
        },
        addCategory: (state, action: PayloadAction<ICategory>) => {
            state.categories.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(HYDRATE as any, (state, action: PayloadAction<RootState>) => {
                state.employees = action.payload.apartment.employees
                state.categories = action.payload.apartment.categories
                state.apartments = action.payload.apartment.apartments
                state.total = action.payload.apartment.total
            })
    }
});


export const {setAllEmployees,addEmployee,setAllCategories,addCategory,setApartments} = apartmentModel.actions;
export const apartmentReducer = apartmentModel.reducer;