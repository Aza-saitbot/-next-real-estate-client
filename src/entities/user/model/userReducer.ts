import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {IUser} from "@/shared/api/models";
import {RootState} from "@/app/store/types";


export type UserModelType = {
    user: IUser
}
const initialState: UserModelType = {
    user: null
}

const userModel = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(HYDRATE as any, (state, action: PayloadAction<RootState>) => {
                state.user = action.payload.user.user
            })

    }
});


export const {setUserData} = userModel.actions;
export const userReducer = userModel.reducer;