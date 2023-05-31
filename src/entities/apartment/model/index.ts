import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IApartment} from "@/shared/api/models";
import {IEmployee} from "@/shared/api/employee/model";
import {ICategory} from "@/shared/api/category/model";
import {RootState} from "@/app/store/types";
import {HYDRATE} from "next-redux-wrapper";
import {IParamsGetOneApartment, ResponseGetApartments} from "@/shared/api/apartments/dto/apartment-dto";
import * as api from "@/shared/api";


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

export const getOneApartment = createAsyncThunk<IApartment, string, { rejectValue: number; }>(
    'apartment/getOneApartment', async (id, { rejectWithValue }) => {
        try {
            return await api.apartments.getOneApartmentAPI(id)
        } catch (e:any) {
            return rejectWithValue(e.response.data.error_code)
        }
    }
);

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