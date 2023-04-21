import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {IApartment} from "@/shared/api/models";


export type ApartmentModelType = {
    apartments: IApartment[]
    total:number
}
const initialState: ApartmentModelType = {
    apartments: [],
    total: 0
}

export const apartmentModel = createSlice({
    name: 'apartment',
    initialState,
    reducers: {
        setApartments: (state, action: PayloadAction<ApartmentModelType>) => {
            console.log('action.payload',action.payload)
            state.apartments = action.payload.apartments
            state.total = action.payload.total
        },
    },
    extraReducers: (builder) =>
        builder.addCase(HYDRATE as any, (state, action: PayloadAction<ApartmentModelType>) => {
            console.log('action.payload',action.payload)
            state.apartments = action.payload.apartments
            state.total = action.payload.total
        }),
});

export const apartmentReducer = apartmentModel.reducer;