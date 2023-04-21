import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {IUser} from "@/shared/api/models";


export type UserModelType = {
    user: IUser | null
}
const initialState: UserModelType = {
    user: null
}

 const userModel = createSlice({
    name: 'user',
     initialState,
    reducers: {
        setUserData: (state:UserModelType, action: PayloadAction<IUser>) => {
            state.user = action.payload
        },
    },
    extraReducers: (builder) =>
        builder.addCase(HYDRATE as any, (state:UserModelType, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        }),
});

export const { setUserData } = userModel.actions;
export const userReducer = userModel.reducer;